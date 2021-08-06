import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { Course } from '../../interfaces/course';

import { CourseService } from '../course/course.service';

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

	url: string = "https://flodevfullstack.com/api";
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

    /**
     * 
     * @returns Product of service
     */
  	async getProducts(): Promise<Course[]> {
		return this.course = await this.courseService.getData();
	}

	/**
	 * 
	 * @returns Course
	 */
	async getData(): Promise <Course[]>{

		if(this.platform.is("desktop")) {
			this.token = await JSON.parse(localStorage.getItem("token"));
		}else{
			this.token = JSON.parse(await this.storage.getItem("token"));
		}

		return new Promise((resolve, rejects) => {
		  
		    this.http.request('GET', this.url + "/courses",  { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).subscribe((data: any) => {
			    try{
				
                    let object;
                    let cours: Course[] = [];
                    object = data.data;
                
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
                        });
				        resolve(cours);
				    }
			    }catch(err){
				    rejects(false);
			    }
		    })
		})
	
	}

	getCart(): Course[] {
		return this.cart;
	}

	deleteCart(){
		return this.cart = []
	}

	getCartItemCount(): BehaviorSubject<number> {
		return this.cartItemCount;
	}

	/**
	 * Method for add product to localStorage
	 * @param product 
	 */
	async addProduct(product: Course) {
		
		product.amount = 1;
			
		this.cart.push(product); 
		this.cartItemCount.next(this.cartItemCount.value + 1);
		
		if(this.platform.is("desktop")) {
			localStorage.setItem('cart',JSON.stringify(this.getCart()));
		}else{
			this.storage.setItem('cart', JSON.stringify(this.getCart()));
		}
	}


	/**
	 * Method for decrease quantity of product
	 * @param product 
	 */
	decreaseProduct(product: Course) {
		for (const [index, item] of this.cart.entries()) {
			if (item.Id === product.id) {
				item.amount -= 1;
				if (item.amount === 0) {
					this.cart.splice(index, 1);
					item.amount = 1;
				}
			}
		}
		this.cartItemCount.next(this.cartItemCount.value - 1);
	}

	
    /**
     * Method for remove product
     * @param product 
     */
	async removeProduct(product: Course) {
		if(this.platform.is("desktop")) {
			this.storageCart = await JSON.parse(localStorage.getItem('cart'));
		}else{
			this.storageCart = await JSON.parse(await this.storage.getItem('cart'));
		}
		
		const findProduct = this.storageCart.findIndex(item => {
		
			return item.id == product.id;
	    })
		
		for (const [index, item] of this.cart.entries()) {
			if (item.id === product.id) {
				this.cartItemCount.next(this.cartItemCount.value - item.amount);
				this.cart.splice(index, 1);
				
				item.amount = 1;
			}
		}

		this.storageCart.splice(findProduct, 1);

		if(this.platform.is("desktop")) {

			localStorage.setItem('cart', JSON.stringify(this.storageCart));
		}else{
			this.storage.setItem('cart', JSON.stringify(this.storageCart));
		}

	}

	
    /**
     * Method for create command
     * @param UserId 
     * @returns 
     */
	async createCommand(UserId: number){
		if (this.platform.is("desktop")) {
			this.token = await JSON.parse(localStorage.getItem("token"));
		} else {
			this.token = JSON.parse(await this.storage.getItem("token"));
		}
		return new Promise((resolve, rejects) => {
            this.http.post(this.url + '/command', { UserId: UserId }, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).subscribe((data: any) => {
                if(!data){
                    rejects(false);
                }else{
                    resolve(data);
                }
            });
        })
	}

    /**
     * Method for add course to cart
     * @param quantity 
     * @param CommandId 
     * @param CourseId 
     * @returns 
     */
	addCart(quantity: number, CommandId: number, CourseId: number){
		return new Promise((resolve, rejects) => {
			this.http.post(this.url + '/commandline', {  quantity: quantity, CommandId: CommandId, CourseId: CourseId }).subscribe((data: any) => {
				if(!data){
				    rejects(false);
				}else{
				    resolve(data);
				}
			});
		})
	}
  
}
