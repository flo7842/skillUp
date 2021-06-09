import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { Course } from 'src/app/interfaces/course';
import { CartService } from 'src/app/service/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cart: Course[] = [];
  course: Course[] = [];

  idCourse: number;
  content: Course[] = [];


  constructor(
    private router: Router,
    private cartService: CartService,
		private modalCtrl: ModalController,
    private storage: NativeStorage,
    private platform: Platform
    ) { }

  async ngOnInit() {
    this.cart = this.cartService.getCart();

    if (this.platform.is("desktop")) {
      this.course = await JSON.parse(localStorage.getItem('cart'));
    } else {
      this.course = JSON.parse(await this.storage.getItem('cart'));
    }


    
    if(this.course!== null){

      for(let courCart of this.course){
        this.idCourse = await courCart.id;
       
        this.content.push(courCart)
      }
     
    }
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
    
    // Ajoute le contenu du panier en base de données
    //await this.addCartToBdd();

    this.close();
    
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: this.getTotal()
      }
    };

    this.router.navigate(['/paypal'], navigationExtras);
  }
}
