import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AuthService } from '../../service/auth/auth.service';

import { User } from '../../interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    isErrorMail: boolean = true;
    isErrorPhone: boolean = true;
    isErrorPassword: boolean = true;

    user: User = 
    { 
        id: undefined,
        email: '',
        user_password: '',
        user_name: '',
        firstname: '',
        lastname: '',
        avatar: "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'",
        birth_date: '',
        phone_number: '',
        street_name: '',
        street_number: undefined,
        batiment: '',
        postal_code: '',
    }

    constructor(
        private router: Router,
        private toast: ToastController,
        private auth: AuthService
        ) { }

    ngOnInit() {
    }

    // All method for test valid input field
    checkEmail() {
        const regex = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
        this.isErrorMail = (regex.test(this.user.email.trim())) ? false : true;
    }
  
    checkPassword() {
        const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g);
        this.isErrorPassword = (regex.test(this.user.user_password.trim())) ? false : true;
    }
  
    checkPhone() {
        const regex = new RegExp(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/g);
        this.isErrorPhone = (regex.test(this.user.phone_number.trim())) ? false : true;
    }



    async register() {
        this.auth.register(this.user).then(async(data: any) => {
      
        const toast = await this.toast.create({
            message: "Inscription réussie !",
            color: "success",
            duration: 1000,
        });
        toast.present();

        this.router.navigate(['/login']);
        
    }).catch(async(err) => {
        const toast = await this.toast.create({
            message: "L'inscription à échoué, veuillez recommencer !",
            color: "danger",
            duration: 1000,
        });
        toast.present();
            console.log(err)
        })
    }
}
