import { Component, Input, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {

    oldPass: string = "";
    newPass: string = "";

    constructor(
        private toast: ToastController,
        private userService: UserService
    ) { }

    ngOnInit() {}

    /**
     * Method for update user password
     */
    async updatePass(){

        let oldPassword = await this.oldPass
        let newPassword = await this.newPass

        await this.userService.updatePassword(5, this.oldPass, this.newPass).then(async(user: any) => {

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
