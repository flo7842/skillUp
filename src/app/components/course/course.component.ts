import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { CartService } from 'src/app/service/cart/cart.service';
import { CourseService } from 'src/app/service/course/course.service';

import { CartPage } from 'src/app/pages/cart/cart.page';

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
        private modalCtrl: ModalController,
        private platform: Platform,
        private storage: NativeStorage,
        private toast: ToastController,
        private courseService: CourseService,
        private cartService: CartService,
    ) { }

    async ngOnInit() {
        this.cartItemCount = this.cartService.getCartItemCount();
        console.log(this.cartItemCount)
    }

    async openCart(){
        const modal = await this.modalCtrl.create({
            component: CartPage,
            cssClass: 'cart-modal'
        })
        modal.onDidDismiss().then(async()=>{
            
            this.cartItemCount = this.cartService.getCartItemCount();
            
        });
        modal.present();
    }

    close(){
        this.modalCtrl.dismiss();
    }

    /**
     * 
     * @param product 
     */
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
