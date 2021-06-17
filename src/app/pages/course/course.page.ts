import { Component, OnInit } from '@angular/core';
import { Course } from '../../interfaces/course';
import { CourseService } from '../../service/course/course.service';
import { CartService } from '../../service/cart/cart.service';
import { ModalController, Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { CartPage } from '../cart/cart.page';

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
    private storage: NativeStorage,
    private modalCtrl: ModalController
    ) { }

  async ngOnInit() {
    this.courses = await this.course.getData();
  }

  async openCart(){
    const modal = await this.modalCtrl.create({
      component: CartPage,
      cssClass: 'cart-modal'
    })
    modal.present();
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
  


}
