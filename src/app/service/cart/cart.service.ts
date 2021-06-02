import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Course } from '../../interfaces/course';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { CourseService } from '../course/course.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

	url: string = "http://localhost:3000/api";
	private cart = [];
	private cartItemCount = new BehaviorSubject(0);
	course: Course[];

  	constructor(private http: HttpClient, private courseService: CourseService) { }

  	async getProducts(): Promise<Course[]> {
		return this.course = await this.courseService.getData();
		

	}

	getCart(): Course[] {
		return this.cart;
	}

	getCartItemCount(): BehaviorSubject<number> {
		return this.cartItemCount;
	}

	addProduct(product: Course) {
		let added = false;
		product.amount = 1
		console.log(product)
		for (const item of this.cart) {
			// item.amount = 1
			console.log("item")
			if (item.id === product.id) {
				item.amount += 1;
				added = true;
				break;
			}
		}
		if(!added){
			this.cart.push(product); this.cartItemCount.next(this.cartItemCount.value + 1);
			console.log(product)
			
		}else{
			this.cartItemCount.next(this.cartItemCount.value + 1);
			
		}

	}

	// decreaseProduct(product: Cour) {
	// 	for (const [index, item] of this.cart.entries()) {
	// 		if (item.IdCour === product.IdCour) {
	// 			item.amount -= 1;
	// 			if (item.amount === 0) {
	// 				this.cart.splice(index, 1);
	// 				item.amount = 1;
	// 				console.log(item.amount)
	// 			}
	// 		}
	// 	}
	// 	this.cartItemCount.next(this.cartItemCount.value - 1);
	// }

	removeProduct(product: Course) {
		for (const [index, item] of this.cart.entries()) {
			// if (item.IdCour === product.IdCour) {
			// 	this.cartItemCount.next(this.cartItemCount.value - item.amount);
			// 	this.cart.splice(index, 1);
			// 	item.amount = 1
			// }
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
