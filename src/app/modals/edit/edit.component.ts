import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { UserService } from '../../service/user/user.service';

import { User } from '../../interfaces/user';

import { UpdatePasswordComponent } from '../update-password/update-password.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

    userStorage: any;
    userUpdateStorageImg: User;

    user: User = 
    { 
        id: undefined,
        email: '',
        user_password: '',
        user_name: '',
        firstname: '',
        lastname: '',
        avatar: "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'",
        birth_date: undefined,
        phone_number: '',
        street_name: '',
        street_number: undefined,
        batiment: '',
        postal_code: '',
    }

    token: string;

    oldPass: string;
    newPass: string;
    hide:boolean = false;

    image: string;
  
    constructor(
        private modal: ModalController, 
        private platform: Platform, 
        private camera: Camera,
        private storage: NativeStorage,
        private toast: ToastController,
        private userService: UserService
        ) 
    { }

    async ngOnInit() {

        if (this.platform.is("desktop")) {
            this.user = await JSON.parse(localStorage.getItem('user'));
        } else {
            this.user =  JSON.parse(await this.storage.getItem('user'));
        }
    }

    

    async addPhoto() {
        const base64 = await this.captureImage();
        this.createUploadTask(base64);
    }

    async captureImage() {
        const options: CameraOptions = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            targetWidth: 1000,
            targetHeight: 1000,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
        return await this.camera.getPicture(options);
    }
    
    createUploadTask(file: any): void {
        this.image = 'data:image/jpg;base64,' + file;
    }

    close() {
        this.modal.dismiss({
            'dismissed': true
        });
    }

    ngIfCtrl(){
        this.hide = !this.hide;
    }

    /**
     * Method for update profile of user
     */
    async editProfile(){
        this.userService.edit(this.user.id, this.user).then(async(user: any) => {
      
            if (this.platform.is("desktop")) {
                await localStorage.removeItem('user')
                await localStorage.setItem('user', JSON.stringify(user.data));

            } else {
                await this.storage.remove('user')
                await this.storage.setItem('user', JSON.stringify(user.data));
            }
        
            const toast = await this.toast.create({
                message: 'Information modifié',
                color: "success",
                duration: 1000,
            });
            toast.present();

        }).catch(async(err) => {
        
            console.log(err)
            const toast = await this.toast.create({
            message: "Une erreur est survenue, réesayez dans quelques instants",
            color: "danger",
            duration: 1000,
            });
            toast.present();
        })
    }

    async saveImage(){
        console.log(this.image)
        console.log(this.user.id)
        await this.userService.updateImg(this.user.id, this.image).then(async(user: any) => {
            
            this.userUpdateStorageImg = {
                id: this.user.id,
                email: this.user.email,
                user_name: this.user.user_name,
                avatar: this.image,
                user_password: this.user.user_password,
                firstname: this.user.firstname,
                lastname: this.user.lastname,
                birth_date: this.user.birth_date,
                phone_number: this.user.phone_number,
                street_name: this.user.street_name,
                street_number: this.user.street_number,
                postal_code: this.user.postal_code,
                batiment: this.user.batiment
            }

            if (this.platform.is("desktop")) {
                localStorage.removeItem('user')
                localStorage.setItem('user', JSON.stringify(this.userUpdateStorageImg))
            } else {
                this.storage.remove('user')
                this.storage.setItem('user', JSON.stringify(this.userUpdateStorageImg));
               
            }
            
           
        
        }).catch(async(err) => {
          console.log('Error l\'image n\'a pas été sauvegardé')
          
        })
      }



    /**
     * Method for update user password
     */
    async updatePass(){

        let oldPassword = await this.oldPass;
        let newPassword = await this.newPass;
    
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
