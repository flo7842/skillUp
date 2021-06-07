import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { User } from './../../interfaces/user';
import { EditComponent } from '../../modals/edit/edit.component';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userName: any;

  constructor(
    private modal: ModalController,
    private camera: Camera,
    private storage: NativeStorage,
    private platform: Platform
    ) { }

  

  async ngOnInit() {
    if (this.platform.is("desktop")) {
      this.userName = JSON.parse(await localStorage.getItem('user')).user_name;
    
    } else {
      this.userName = JSON.parse(await this.storage.getItem('user')).user_name;
    }
    
    
  }

  async edit() {
    const modal = await this.modal.create({
      component: EditComponent
    });
    return await modal.present();
  }

  async uploadPicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      // Handle error
     });

  }
  

}
