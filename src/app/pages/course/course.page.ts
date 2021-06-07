import { Component, OnInit } from '@angular/core';
import { Course } from '../../interfaces/course';
import { CourseService } from '../../service/course/course.service';
import { CartService } from '../../service/cart/cart.service';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-course',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss'],
})
export class CoursePage implements OnInit {

  courses: Course[];
  idCommand: number;

  constructor(
    private course: CourseService, 
    private cartService: CartService,
    private platform: Platform,
    private storage: NativeStorage
    ) { }

  async ngOnInit() {
    this.courses = await this.course.getData();
    console.log(this.courses)
  }


  async addToLocalStorage(product){
    if(product){
      this.cartService.addProduct(product);

      if (this.platform.is("desktop")) {
        localStorage.setItem('cart', JSON.stringify(this.cartService.getCart()))
      
      } else {
        this.storage.setItem('cart', JSON.stringify(this.cartService.getCart()))
      }
      
    }
  }
  async addCartToBdd(){
    let user;
    let cartStorage;

    if (this.platform.is("desktop")) {
      user = await JSON.stringify(this.cartService.getCart())
      
    } else {
      user = this.storage.setItem('cart', JSON.stringify(this.cartService.getCart()))
    }
    
    if (this.platform.is("desktop")) {
      cartStorage = await JSON.parse(localStorage.getItem('cart'));
      
    } else {
      cartStorage = this.storage.setItem('cart', JSON.stringify(this.cartService.getCart()))
    }
    

  
    this.cartService.createCommand(user.id).then(async(command: any) => {
        this.idCommand = command.message.split(/(\d+)/) 
       
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
