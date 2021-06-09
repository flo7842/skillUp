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


  userStorage: any;

  user: User;
  avatar: string;
  token: string;

  constructor(
    private modal: ModalController, 
    private platform: Platform, 
    private storage: NativeStorage,
    private userEdit: UserService,
    private toast: ToastController
    ) 
    { }

    async getUserStorage(){

      let user;

      if (this.platform.is("desktop")) {

        user = await JSON.parse(localStorage.getItem('user'));
        
      } else {
        user = await this.storage.getItem('user');
      }
      
      this.user = 
        { 
          id: user.id,
          email: user.email,
          user_password: user.user_password,
          user_name: user.user_name,
          firstname: user.firstname,
          lastname: user.lastname,
          avatar: user.avatar,
          birth_date: user.birth_date,
          phone_number: user.phone_number,
          street_name: user.street_name,
          street_number: user.number,
          batiment: user.edifice,
          postal_code: user.postal_code,
        }

      return user;
    }

  async ngOnInit() {
    
   this.getUserStorage()
    
  }

  close() {
    this.modal.dismiss({
        'dismissed': true
    });
  }

  editProfile(){
    this.userEdit.edit(this.user.id, this.user).then(async(user: any) => {
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
