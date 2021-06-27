import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CartPage } from 'src/app/pages/cart/cart.page';
import { CartService } from 'src/app/service/cart/cart.service';
import { CourseService } from 'src/app/service/course/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {

  cartItemCount: BehaviorSubject<number>;

  courseDetails;
  courseCategories;
  createdAt;
  course: any = [];

  constructor(
    private courseService: CourseService,
    private cartService: CartService,
    private modalCtrl: ModalController,
    private platform: Platform,
    private storage: NativeStorage,
    private toast: ToastController
  ) { }

  async ngOnInit() {
    console.log(this.courseCategories.name)
    // 
       
        
    this.cartItemCount = this.cartService.getCartItemCount();
        
        
        
  }



  async openCart(){
    const modal = await this.modalCtrl.create({
      component: CartPage,
      cssClass: 'cart-modal'
    })
    modal.present();
  }

  close(){
    this.modalCtrl.dismiss();
  }


  async addToLocalStorage(product){
    if(product){
      this.cartService.addProduct(product);

      if (this.platform.is("desktop")) {
        localStorage.setItem('cart', JSON.stringify(this.cartService.getCart()))
      
      } else {
        this.storage.setItem('cart', JSON.stringify(this.cartService.getCart()))
      }

      const toast = await this.toast.create({
        message: 'Le cour a bien été Ajouté !',
        color: "success",
        duration: 1000,
      });
      toast.present();

      this.close();
      
    }
  }
}
