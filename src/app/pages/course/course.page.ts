import { Component, OnInit } from '@angular/core';
import { Course } from '../../interfaces/course';
import { CourseService } from '../../service/course/course.service';
import { CartService } from '../../service/cart/cart.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss'],
})
export class CoursePage implements OnInit {

  courses: Course[];
  idCommand: number;

  constructor(private course: CourseService, private cartService: CartService) { }

  async ngOnInit() {
    this.courses = await this.course.getCourse();
    console.log(this.courses)
  }


  async addToLocalStorage(product){
    if(product){
      this.cartService.addProduct(product);
      localStorage.setItem('cart', JSON.stringify(this.cartService.getCart()))
    }
  }
  async addCartToBdd(){
    
    const user = await JSON.parse(localStorage.getItem('user'));
    const cartStorage = await JSON.parse(localStorage.getItem('cart'));

  
    this.cartService.createCommand(user.id, 19).then(async(command: any) => {
        this.idCommand = command.message.split(/(\d+)/) 
       console.log(command)
        for(let cart of cartStorage){
         
          this.cartService.addCart(1, command.data.id, cart.id).then(async(user: any) => {
             
         //   //console.log(user)
           
          }).catch(async(err) => {
           
            console.log(err)
             
          })
   
       }
    }).catch(async(err) => {
      
      console.log(err)
        
    })
    

  }


}
