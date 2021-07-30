import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { User } from './../../interfaces/user';
import { EditComponent } from '../../modals/edit/edit.component';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    userName: any;
    user: any;
    avatar: string;

    hide:boolean = false;

    constructor(
        private modal: ModalController,
        private storage: NativeStorage,
        private platform: Platform,
        private router: Router
        ) { }

  

    async ngOnInit() {
        if (this.platform.is("desktop")) {
            this.user = JSON.parse(await localStorage.getItem('user'));
        } else {
            this.user = JSON.parse(await this.storage.getItem('user'));
        }
        this.userName = this.user.user_name
        this.avatar = this.user.avatar
    }

    ngIfCtrl(){
        this.hide = !this.hide;
    }

    async edit() {
        const modal = await this.modal.create({
        component: EditComponent
        });
        return await modal.present();
    }

  
    async logout(){

        if (this.platform.is("desktop")) {
            await localStorage.removeItem('user');
            await localStorage.removeItem('token');
        } else {
            await this.storage.remove('user')
            await this.storage.remove('token')
        }

        this.router.navigate(['/login'])
    }
}
