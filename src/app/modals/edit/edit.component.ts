import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { User } from '../../interfaces/user';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { UserService } from '../../service/user/user.service';
import { UpdatePasswordComponent } from '../update-password/update-password.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {


  
  userStorage: any;


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

  constructor(
    private modal: ModalController, 
    private platform: Platform, 
    private storage: NativeStorage,
    private userEdit: UserService,
    private toast: ToastController,
    private userService: UserService
    ) 
    { }

    async getUserStorage(){

      
    }

  async ngOnInit() {
  

      if (this.platform.is("desktop")) {

        this.user = await JSON.parse(localStorage.getItem('user'));
        
      } else {
        this.user =  JSON.parse(await this.storage.getItem('user'));
      }
     
  }

  close() {
    this.modal.dismiss({
        'dismissed': true
    });
  }

  



  ngIfCtrl(){
    this.hide = !this.hide;
  }
    

  

  async editProfile(){
    this.userEdit.edit(this.user.id, this.user).then(async(user: any) => {
      
      
      if (this.platform.is("desktop")) {
        await localStorage.removeItem('user')
        await localStorage.setItem('user', JSON.stringify(user.data))
      
      
      } else {
        await this.storage.remove('user')
        await this.storage.setItem('user', JSON.stringify(user.data))
      }
      // console.log(user.data)
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


  // async resetPassword() {
  //   const modal = await this.modal.create({
  //     component: UpdatePasswordComponent
  //   });
  //   return await modal.present();
  // }

  async updatePass(){

    let oldPassword = await this.oldPass
    let newPassword = await this.newPass

   
    
    await this.userService.updatePassword(5, this.oldPass, this.newPass).then(async(user: any) => {
  

      console.log(this.oldPass)
      console.log(this.newPass)

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
