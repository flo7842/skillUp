import { Component, OnInit } from '@angular/core';
import { Course } from '../../interfaces/course';
import { CourseService } from '../../service/course/course.service';
import { CartService } from '../../service/cart/cart.service';
import { ModalController, Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { CartPage } from '../cart/cart.page';
import { CourseComponent } from 'src/app/components/course/course.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-course',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {

  cartItemCount: BehaviorSubject<number>;

  courses: any = [];
  coursesNode: any = []; 
  coursesJs: any = []; 
  coursesSql: any = []; 
  coursesPhp: any = [];
  coursesSymfony: any = [];
  coursesNodeJs: Course[];
  idCommand: number;
  courseDetails: any = []; 

  dateTimeCourse: any = [];

  categories: any = [];


  sliderConfig = {
    spaceBetween: 0,
    centeredSlides: true,
    slidesPerView: 1.3
  }

  constructor(
    private courseService: CourseService, 
    private cartService: CartService,
    private platform: Platform,
    private storage: NativeStorage,
    private modalCtrl: ModalController
    ) { }

  async ngOnInit() {
    this.coursesNode = await this.courseService.getCourseByCategoryName('NodeJS');
    this.coursesJs = await this.courseService.getCourseByCategoryName('JavaScript');
    this.coursesSql = await this.courseService.getCourseByCategoryName('SQL');
    this.coursesPhp = await this.courseService.getCourseByCategoryName('PHP');
    this.coursesSymfony = await this.courseService.getCourseByCategoryName('Symfony');
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  async openCart(){
    const modal = await this.modalCtrl.create({
      component: CartPage,
      cssClass: 'cart-modal'
    })
    modal.present();
  }

  

  async courComponent(id: number){

    this.courseDetails = await this.courseService.getCourseById(id)
    this.categories = await this.courseService.getCategoryByIdCourses(id)
    
    let dateOnly;
    let fr_date;
    let hoursMin;
    this.dateTimeCourse = this.courseDetails.datePublish
    dateOnly = this.dateTimeCourse.substr(0,10)
    fr_date = dateOnly.split("-").reverse().join("-");
    hoursMin = this.dateTimeCourse.substr(11,8)
    this.dateTimeCourse = hoursMin + " le " + fr_date

    const modal = await this.modalCtrl.create({
        component: CourseComponent,
        componentProps: {
            'courseDetails': this.courseDetails,
            'courseCategories': this.categories,
            'createdAt': this.dateTimeCourse
          }
      });
      
      return await modal.present();
  }
  


}
