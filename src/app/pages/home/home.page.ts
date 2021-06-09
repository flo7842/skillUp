import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';

import { UserService } from '../../service/user/user.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { User } from '../../interfaces/user';
import { CourseService } from '../../service/course/course.service';
import { CommandService } from '../../service/command/command.service';
import { BehaviorSubject } from 'rxjs';
import { CartPage } from '../cart/cart.page';
import { Course } from 'src/app/interfaces/course';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  user: any = [];
  userRole: any = [];
  bestCourses: any;
  commandLine: any = [];
  invoice: any = [];
  isAdmin: boolean = false;
  userId: number;
  recentCourses: any;

  cartItemCount: BehaviorSubject<number>;

  sliderConfig = {
    spaceBetween: 0,
    centeredSlides: true,
    slidesPerView: 1.6
  }

  constructor(
    private userService: UserService,
    private courseService: CourseService,
    private commandLineService: CommandService,
    private storage: NativeStorage,
    private platform: Platform,
    private modalCtrl: ModalController
    ) {}

  async ngOnInit(){

   
    this.recentCourses = await this.courseService.getRecentCourse();
    this.bestCourses = await this.courseService.getBestCourse();
    this.commandLine = await this.commandLineService.getDataByCommand(1);
    
    if (this.platform.is("desktop")) {
      
      this.user = JSON.parse(localStorage.getItem('user'))
    }else{
      this.user = this.storage.getItem('user')
    }
    this.userId = this.user.id
    
    // this.userRole = await this.userService.getUserByRole(this.userId);
    // if(this.userRole !== undefined && this.userRole.name == "admin"){
    //     this.isAdmin = true;
    // }

    
    
  }



  async openCart(){
    const modal = await this.modalCtrl.create({
      component: CartPage,
      cssClass: 'cart-modal'
    })
    modal.present();
  }

}
