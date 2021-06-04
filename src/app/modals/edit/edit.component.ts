import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { User } from '../../interfaces/user';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

  userStorage = JSON.parse(localStorage.getItem('user'));

  user: User = 
  { 
    id: undefined,
    email: this.userStorage.email,
    user_password: this.userStorage.user_password,
    user_name: this.userStorage.user_name,
    firstname: this.userStorage.firstname,
    lastname: this.userStorage.lastname,
    avatar: this.userStorage.avatar,
    birth_date: this.userStorage.birth_date,
    phone_number: this.userStorage.phone_number,
    street_name: this.userStorage.street_name,
    street_number: this.userStorage.number,
    batiment: this.userStorage.edifice,
    postal_code: this.userStorage.postal_code,
  }

  token: string;

  constructor(
    private modal: ModalController, 
    private platform: Platform, 
    private storage: NativeStorage,
    private userEdit: UserService,
    private toast: ToastController
    ) 
    { }

  async ngOnInit() {
    
   

    if (this.platform.is("desktop")) {
      this.userStorage = await JSON.parse(localStorage.getItem('user'));
      this.token = await localStorage.getItem("token")
      
    } else {
      this.userStorage = await this.storage.getItem('user');
    }
    
  }

  close() {
    this.modal.dismiss({
        'dismissed': true
    });
  }

  editProfile(){
    this.userEdit.edit(this.userStorage.id, this.user).then(async(user: any) => {
      console.log(user)
      if (this.platform.is("desktop")) {
        await localStorage.removeItem('user')
        await localStorage.setItem('user', JSON.stringify(user.data))
      
      } else {
        await this.storage.remove('user')
        await this.storage.setItem('user', JSON.stringify(user.data))
      }

      const toast = await this.toast.create({
        message: 'Bienvenue ' + user.data.firstname,
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
  

}
