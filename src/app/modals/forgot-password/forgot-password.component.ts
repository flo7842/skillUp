import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {


  email: string = "";

  constructor(private auth: AuthService) { }

  ngOnInit() {}

  async resetPass(){
    let toto = await this.email;
    console.log(toto)
    await this.auth.resetPassword(this.email).then(async(user: any) => {
      
      console.log(user)
     
        
    }).catch(async(err) => {
   
       
    })

  }

}
