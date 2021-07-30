import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { BehaviorSubject } from 'rxjs';

import { CourseService } from '../../service/course/course.service';
import { CartService } from 'src/app/service/cart/cart.service';

import { CartPage } from '../cart/cart.page';

import { CourseComponent } from 'src/app/components/course/course.component';


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
    recentCoursesCat: any = [];
    bestCoursesCat: any = [];
    categories: any = [];
  
    courseDetails: any = []; 
    dateTimeCourse: any = [];

    cartItemCount: BehaviorSubject<number>;

    sliderConfig = {
        spaceBetween: 0,
        centeredSlides: false,
        slidesPerView: 1.8
    }

    constructor(
        private courseService: CourseService,
        private cartService: CartService,
        private storage: NativeStorage,
        private platform: Platform,
        private modalCtrl: ModalController,
        public loadingCtrl: LoadingController,

        ) {}

    async ngOnInit(){

    
        this.autoLoader();
        this.cartItemCount = this.cartService.getCartItemCount();
    
        this.recentCourses = await this.courseService.getRecentCourse();
        this.bestCourses = await this.courseService.getBestCourse();

        this.categories = await this.courseService.getCategoryByIdCourses(1);

        /**
         * Allow push recent course by category
         */
        for(let recent of this.recentCourses){
            this.recentCoursesCat.push({
                id: recent.id,
                title: recent.title,
                author: recent.author,
                datePublish: recent.datePublish,
                description: recent.description,
                image: recent.image,
                price: recent.price,
                rate: recent.rate,
                categorie: await this.courseService.getCategoryByIdCourses(recent.id)
            })
        }

        /**
         * Allow push best course by category
         */
        for(let best of this.bestCourses){
            this.bestCoursesCat.push({
                id: best.id,
                title: best.title,
                author: best.author,
                datePublish: best.datePublish,
                description: best.description,
                image: best.image,
                price: best.price,
                rate: best.rate,
                categorie: await this.courseService.getCategoryByIdCourses(best.id)
            })
        }
    
    
        this.dismissLoader();
        
        if (this.platform.is("desktop")) {
            this.user = JSON.parse(await localStorage.getItem('user'))
        }else{
            this.user = JSON.parse(await this.storage.getItem('user'))
        }

        this.userId = this.user.id
    }

    dismissLoader() {
        this.loadingCtrl.dismiss().then((response) => {
            console.log('Loader closed!', response);
        }).catch((err) => {
            console.log('Error occured : ', err);
        });
    }

    autoLoader() {
        this.loadingCtrl.create({
            message: 'Chargement...',
        
        }).then((response) => {
            response.present();
            response.onDidDismiss().then((response) => {
                console.log('Loader dismissed', response);
            });
        });
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
        
        // Here i change the format date to FR
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
