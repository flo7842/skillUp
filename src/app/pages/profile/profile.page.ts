import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from './../../interfaces/user';
import { EditComponent } from '../../modals/edit/edit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private modal: ModalController) { }

  userName: string;

  ngOnInit() {
    this.userName = JSON.parse(localStorage.getItem('user')).user_name;
    
  }

  async edit() {
    const modal = await this.modal.create({
      component: EditComponent
    });
    return await modal.present();
  }


  

}
