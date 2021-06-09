import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Course } from '../../interfaces/course';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { CourseService } from '../course/course.service';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

export interface Product {
	id: number;
  name: string;
  price: number;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {



	url: string = "http://localhost:3000/api";
	token: string;
	private cart = [];
	private cartItemCount = new BehaviorSubject(0);
	course: Course[];
	storageCart: any;

  	constructor(
		  private http: HttpClient, 
		  private courseService: CourseService, 
		  private platform: Platform,
		  private storage: NativeStorage
	) { }

  	async getProducts(): Promise<Course[]> {
		return this.course = await this.courseService.getData();
	}

	async getData(): Promise <Course[]>{

		if (this.platform.is("desktop")) {
			this.token = await localStorage.getItem("token")
		  } else {
			this.token = await this.storage.getItem("token")
		  }

		return new Promise((resolve, rejects) => {
		  
		  this.http.request('GET', this.url + "/courses",  { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).subscribe((data: any) => {
			try{
				console.log(data.data)
				let object;
				let cours: Course[] = [];
				object = data.data
			  
				for(const item of object){
				  cours.push({
					id: item.id,
					title: item.title,
					image: item.image,
					author: item.author,
					rate: item.rate,
					description: item.description,
					price: item.price,
					datePublish: item.datePublish
				  })
				  console.log(cours)
				  resolve(cours);
				}
			  }catch(err){
			   
				rejects(false)
			  }
		  })
		})
	
	  }

	getCart(): Course[] {
		return this.cart;
	}

	getCartItemCount(): BehaviorSubject<number> {
		return this.cartItemCount;
	}

	// addProduct(product: Course) {
	// 	let added = false;
	// 	product.amount = 1
	// 	console.log(product)
	// 	for (const item of this.cart) {
	// 		// item.amount = 1
	// 		console.log("item")
	// 		if (item.id === product.id) {
	// 			item.amount += 1;
	// 			added = true;
	// 			break;
	// 		}
	// 	}
	// 	if(!added){
	// 		this.cart.push(product); this.cartItemCount.next(this.cartItemCount.value + 1);
	// 		console.log(product)
			
	// 	}else{
	// 		this.cartItemCount.next(this.cartItemCount.value + 1);
			
	// 	}

	// }

	async addProduct(product: Course) {
		
		product.amount = 1
		
			
		this.cart.push(product); this.cartItemCount.next(this.cartItemCount.value + 1);
		
		if(this.platform.is("desktop")) {
			localStorage.setItem('cartItem',JSON.stringify(this.getCart()))
		}else{
			this.storage.setItem('cartItem', JSON.stringify(this.getCart()))
		}

			
	}

	decreaseProduct(product: Course) {
		for (const [index, item] of this.cart.entries()) {
			if (item.Id === product.id) {
				item.amount -= 1;
				if (item.amount === 0) {
					this.cart.splice(index, 1);
					item.amount = 1;
					console.log(item.amount)
				}
			}
		}
		this.cartItemCount.next(this.cartItemCount.value - 1);
	}

	// removeProduct(product: Course) {
	// 	for (const [index, item] of this.cart.entries()) {
	// 		if (item.id === product.id) {
	// 			this.cartItemCount.next(this.cartItemCount.value - item.amount);
	// 			this.cart.splice(index, 1);
	// 			item.amount = 1
	// 		}
	// 	}
	// }

	async removeProduct(product: Course) {
		if(this.platform.is("desktop")) {
			this.storageCart = await JSON.parse(localStorage.getItem('cart'));
			
		}else{
			this.storageCart = await JSON.parse(await this.storage.getItem('cart'));
		}
		
		const tp = this.storageCart.findIndex(item => {
		
			return item.id == product.id
	    })
		
		for (const [index, item] of this.cart.entries()) {
			if (item.id === product.id) {
				this.cartItemCount.next(this.cartItemCount.value - item.amount);
				this.cart.splice(index, 1);
				
				item.amount = 1
			}
		}

		this.storageCart.splice(tp, 1)

		if(this.platform.is("desktop")) {

			localStorage.setItem('cart', JSON.stringify(this.storageCart))
		}else{
			this.storage.setItem('cart', JSON.stringify(this.storageCart))
		}

	}

	

	createCommand(UserId: number){
		return new Promise((resolve, rejects) => {
				this.http.post(this.url + '/command', { UserId: UserId }).subscribe((data: any) => {
					//(!data.success) ? rejects(false): resolve(data);
					console.log(data)
					if(!data){
					rejects(false)
					}else{
					resolve(data);
					}
					//(!data.success) ? rejects(false): resolve(data);
					
				});
			})
	}

	addCart(quantity: number, CommandId: number, CourseId: number){
		return new Promise((resolve, rejects) => {
			this.http.post(this.url + '/commandline', {  quantity: quantity, CommandId: CommandId, CourseId: CourseId, }).subscribe((data: any) => {
				//(!data.success) ? rejects(false): resolve(data);
				console.log(data)
				if(!data){
				rejects(false)
				}else{
				resolve(data);
				}
				//(!data.success) ? rejects(false): resolve(data);
				
			});
		})
	}

  
}
