import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {


    email: string = "";

    constructor(
        private auth: AuthService, 
        private modal: ModalController,
        private toast: ToastController
        ) { }

    ngOnInit() {}

    close() {
        this.modal.dismiss({
            'dismissed': true
        });
    }

    /**
     * Method for reset password with email
     */
    async resetPass(){
    
        await this.auth.resetPassword(this.email).then(async(user: any) => {
            const toast = await this.toast.create({
                message: "L'email à bien été envoyé !",
                color: "success",
                duration: 1000,
            });
            toast.present();
        }).catch(async(err) => {

            const toast = await this.toast.create({
                message: "L'email n'a pas été envoyé, veuillez recommencer !",
                color: "danger",
                duration: 1000,
            });

            toast.present();
        })
    }
}
