import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { PayPal, PayPalConfiguration, PayPalPayment } from '@ionic-native/paypal/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/service/cart/cart.service';
import { InvoiceService } from 'src/app/service/invoice/invoice.service';

import { CartPage } from '../cart/cart.page';

@Component({
    selector: 'app-paypal',
    templateUrl: './paypal.page.html',
    styleUrls: ['./paypal.page.scss'],
})

export class PaypalPage implements OnInit {

    idCommand: number;
    cartStorage: any;
    cartItemCount: BehaviorSubject<number>;
    data: string = '';

    paymentAmount: string = this.data;
    currency: string = 'EUR';
    currencyIcon: string = '€';

    constructor(
        private payPal: PayPal, 
        private cartPage: CartPage, 
        private route: ActivatedRoute, 
        private router: Router, 
        private modalCtrl: ModalController,
        private storage: NativeStorage,
        private platform: Platform,
        private cartService: CartService,
        private invoiceService: InvoiceService
    ) {
        this.route.queryParams.subscribe(params => {
            if (params && params.special) {
                this.data = params.special;
            }
        });
    }



    async ngOnInit() {
        this.cartItemCount = await this.cartService.getCartItemCount();
    }

    payWithPaypal() {
        if (this.platform.is("desktop")) {
        localStorage.removeItem('cart')
        this.cartItemCount.next(0);
    }else{
        this.storage.remove('cart')
        this.cartItemCount.next(0);
    }

    this.payPal.init({
        PayPalEnvironmentProduction: '',
        PayPalEnvironmentSandbox: 'AQlum1LKgEJ_smmGn0jKMp4zWpxZK604wELTCHwm_dg1t-1Sf1L8Rw1491yUOp-LM9xTbdB9wQs5jGs-'
    }).then(() => {
        this.addCartToBdd();
    
        this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
       
        })
        ).then(() => {
            let payment = new PayPalPayment(this.data, this.currency, 'Description', 'sale');
            this.payPal.renderSinglePaymentUI(payment).then((res) => {
          
         
        },(error) => {
           console.log(error)
         
        });
    }, () => {
       
    });
    }, () => {
     
    });
  }

    async addCartToBdd(){
        let user;
        let userId;

        /**
         * Fetch user from localStorage
         */
        if (this.platform.is("desktop")) {
        userId = JSON.parse(await localStorage.getItem('user')).id
        
        }else{
            userId = JSON.parse(await this.storage.getItem('user')).id
        }

        /**
         * Fetch cart from localStorage
         */
        if (this.platform.is("desktop")) {
            this.cartStorage = await JSON.parse(localStorage.getItem('cart'));
        }else{
            this.cartStorage = JSON.parse(await this.storage.getItem('cart'));
        }
    
  
        this.cartService.createCommand(userId).then(async(command: any) => {
            this.idCommand = command.data.id
        
            for(let cart of this.cartStorage){
            
                this.cartService.addCart(1, command.data.id, cart.id).then(async(commandLine: any) => {

                }).catch(async(err) => {

                })
    
            }

            this.invoiceService.createInvoice("paypal", 1, command.data.id).then(async(invoice: any) => {
                console.log(invoice)
            }).catch(async(err) => {
                console.log(err)
            })


        }).catch(async(err) => {
                
            console.log(err)
                    
        })
    }

}
