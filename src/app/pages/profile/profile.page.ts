import { Component, OnInit, NgZone } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { User } from './../../interfaces/user';
import { EditComponent } from '../../modals/edit/edit.component';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Animation, AnimationController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    user: any;
    avatar: string = '';
    user_profile: string = '';
    userUpdateStorageImg: User;
    image: string;
    private zone:NgZone;
    hide:boolean = false;

    constructor(
        private modal: ModalController,
        private storage: NativeStorage,
        private platform: Platform,
        private router: Router,
        private animationCtrl: AnimationController,
        private userService: UserService,
        private camera: Camera,
        zone :NgZone
        ) {
            this.zone=zone;
         }

  

    async ngOnInit() {
        this.animationCtrl.create()
            .addElement(document.getElementById('avatar'))
            .duration(1500)
            .iterations(Infinity)
            .fromTo('transform', 'rotate(90deg)', 'translateX(100px)')
            .fromTo('opacity', '1', '0.2');

        if (this.platform.is("desktop")) {
            this.user = JSON.parse(await localStorage.getItem('user'));
        } else {
            this.user = JSON.parse(await this.storage.getItem('user'));
        }
        
        this.avatar = await this.user.avatar
        this.user_profile = await this.user.user_profile 
        
    }

    

    async addPhoto() {
        const base64 = await this.captureImage();
        this.createUploadTask(base64);

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
            
            this.zone.run(()=>{this.avatar = this.userUpdateStorageImg.avatar});
           
        
        }).catch(async(err) => {
          console.log('Error l\'image n\'a pas été sauvegardé')
          
        })
    }

    async captureImage() {
        const options: CameraOptions = {
            quality: 85,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            targetWidth: 1000,
            targetHeight: 1000,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            correctOrientation: true
        };
        return await this.camera.getPicture(options);
    }
    
    createUploadTask(file: any): void {
        this.image = 'data:image/jpg;base64,' + file;
    }

    ngIfCtrl(){
        this.hide = !this.hide;
    }
    
    async edit() {
        const modal = await this.modal.create({
        component: EditComponent
        });
        modal.onDidDismiss().then(async()=>{
         
            if (this.platform.is("desktop")) {
                this.user = JSON.parse(await localStorage.getItem('user'));
                this.avatar = await this.user.avatar
            } else {
                this.user = JSON.parse(await this.storage.getItem('user'));
                this.avatar = await this.user.avatar
            }
         
        });
          
        
        return await modal.present();
    }


    async saveImage(){
        console.log(this.image)
        console.log(this.user.id)
        
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
