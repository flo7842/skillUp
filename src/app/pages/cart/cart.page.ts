import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { Course } from 'src/app/interfaces/course';
import { User } from 'src/app/interfaces/user';
import { CartService } from 'src/app/service/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cart: Course[] = [];
  course: Course[] = [];
  user: User;
  idCourse: number;
  content: Course[] = [];
  infoValidateUser: any[] = [];

  constructor(
    private router: Router,
    private cartService: CartService,
		private modalCtrl: ModalController,
    private storage: NativeStorage,
    private platform: Platform,
    private toast: ToastController
    ) { }
   
  async ngOnInit() {
    this.cart = this.cartService.getCart();

    if (this.platform.is("desktop")) {
      this.course = await JSON.parse(localStorage.getItem('cart'));
      this.user = await JSON.parse(localStorage.getItem('user'));
    } else {
      this.course = JSON.parse(await this.storage.getItem('cart'));
      this.user = JSON.parse(await this.storage.getItem('user'));
    }
    
    
    if(this.course!== null){

      for(let courCart of this.course){
        this.idCourse = await courCart.id;
       
        this.content.push(courCart)
      }
     
    }
   
    this.infoValidateUser.push(this.user.firstname)
    this.infoValidateUser.push(this.user.lastname)
    this.infoValidateUser.push(this.user.street_name)
    this.infoValidateUser.push(this.user.street_number)
    this.infoValidateUser.push(this.user.postal_code)
    this.infoValidateUser.push(this.user.phone_number)

  }

  async decreaseCartItem(product){
    await this.cartService.decreaseProduct(product);
  }

  async increaseCartItem(product){
    await this.cartService.addProduct(product);
  }

  async removeCartItem(product){
    console.log(product)
    await this.cartService.removeProduct(product);
  }

  getTotal(){
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
  }

  close(){
    this.modalCtrl.dismiss();
  }

  async checkout() {
    console.log(this.infoValidateUser)
    for(let i = 0; i < this.infoValidateUser.length - 1; i++){
        if(this.infoValidateUser[i] == null || this.infoValidateUser[i] == ""){
          const toast = await this.toast.create({
            message: "Veuillez compléter les informations dans votre profil utilisateur.",
            color: "warning",
            duration: 1500,
          });
          toast.present();
        
          return
        }
    }
      
      this.close();
  
      let navigationExtras: NavigationExtras = {
        queryParams: {
          special: this.getTotal()
        }
      };
  
      this.router.navigate(['/paypal'], navigationExtras);
      
    
  }





}
