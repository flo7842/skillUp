import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { ForgotPasswordComponent } from '../../modals/forgot-password/forgot-password.component';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  token: string;
  tokenjwt: string = '';
  userAppli: User[]= [];
  user: User;

  isErrorMail: boolean = true;
  isErrorPassword: boolean = true;
  userFirstName: string = '';

  constructor(
    private modal: ModalController,
    private auth: AuthService,
    private router: Router,
    private platform: Platform,
    private toast: ToastController,
    private storage: NativeStorage,
    ) { }

  ngOnInit() {
    
  }

  async ionViewWillEnter(){
      
    if (this.platform.is("desktop")) {
      this.token = await JSON.parse(localStorage.getItem("token"))
      
    } else {
      this.token = JSON.parse(await this.storage.getItem("token"))
    }
     
      console.log(this.token)
      if(this.token !== null){
        this.router.navigate(['/home'])
      }
  }



  checkEmail() {
    const regex = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
    this.isErrorMail = (regex.test(this.email.trim())) ? false : true;
  }
  
  checkPassword() {
    const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g);
    this.isErrorPassword = (regex.test(this.password.trim())) ? false : true;
  }


  async loginForm(){
    
    this.auth.login(this.email, this.password).then(async(user: any) => {
      
      this.userAppli = await user.data
      this.tokenjwt = await user.token
     
   
      
      
      if (this.platform.is("desktop")) {
        await localStorage.setItem('user', JSON.stringify(this.userAppli))
        await localStorage.setItem('token', JSON.stringify(this.tokenjwt))
      } else {
        await this.storage.setItem('user', JSON.stringify(this.userAppli))
        await this.storage.setItem('token', JSON.stringify(this.tokenjwt))

      }

      const toast = await this.toast.create({
        message: 'Bienvenue ' + user.data.firstname,
        color: "success",
        duration: 1000,
      });
      toast.present();

      

      this.router.navigate(['home'])
    }).catch(async(err) => {
      
          
          const toast = await this.toast.create({
            message: "Vous avez mal renseigné le champ email ou password !",
            color: "danger",
            duration: 1000,
          });
          console.log("toto")
          toast.present();
        
        
    })
}


  async forgotPassword() {
    const modal = await this.modal.create({
      component: ForgotPasswordComponent
    });
    return await modal.present();
  }

}
