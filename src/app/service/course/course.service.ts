import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';

import { Course } from '../../interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

    url: string = "https://flodevfullstack.com/api";
    token: string;
    
    constructor(
        private http: HttpClient,
        private storage: NativeStorage,
        private platform: Platform
    ) { }


    /**
     * Method to recover courses
     * @returns Course
     */
    async getData(): Promise <Course[]>{

        if (this.platform.is("desktop")) {
            this.token = await JSON.parse(localStorage.getItem("token"));
        } else {
            this.token = JSON.parse(await this.storage.getItem("token"));
        }
    
    
        return new Promise((resolve, rejects) => {
            this.http.get(this.url + "/courses", { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).subscribe((data: any) => {
                try{
                    
                    let course: Course[] = [];
                    let object = data.data;

                    for(const item of object){
                        course.push({
                            id: item.id,
                            author: item.author,
                            title: item.title,
                            description: item.description,
                            image: item.image,
                            rate: item.rate,
                            price: item.price,
                            datePublish: item.datePublish,
                        })
                        resolve(course);
                    }
                }catch(err){
                    rejects(false);
                }
            })
        })
    }

    /**
     * 
     * @param id 
     * @returns 
     */
    async getCourseById(id: number){
        if (this.platform.is("desktop")) {
            this.token = await JSON.parse(localStorage.getItem("token"));
        } else {
            this.token = JSON.parse(await this.storage.getItem("token"));
        }
    
    
        return new Promise((resolve, rejects) => {
            this.http.get(this.url + "/course/" + id, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).subscribe((data: any) => {
                if(!data){
                    rejects(false);
                }else{
                    resolve(data.data);
                }
            })
        })
    }

    /**
     * 
     */
    async getCategoryByIdCourses(id: number){
        if (this.platform.is("desktop")) {
            this.token = await JSON.parse(localStorage.getItem("token"));
        } else {
            this.token = JSON.parse(await this.storage.getItem("token"));
        }
    
    
        return new Promise((resolve, rejects) => {
            this.http.get(this.url + "/categorie/" + id, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).subscribe((data: any) => {
                if(!data){
                    rejects(data);
                }else{
                    resolve(data.data);
                }
            })
        })
    }

    /**
     * Method for get all courses with best rate
     * @returns 
     */
    async getBestCourse(){
        if (this.platform.is("desktop")) {
            this.token = await JSON.parse(localStorage.getItem("token"));
        } else {
            this.token = JSON.parse(await this.storage.getItem("token"));
        }
    
    
        return new Promise((resolve, rejects) => {
        this.http.get(this.url + "/best-courses", { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).subscribe((data: any) => {
                if(!data){
                    rejects(data);
                }else{
                    resolve(data.data);
                }
            })
        })
    }

    /**
     * Method for get recent course posted
     * @returns 
     */
    async getRecentCourse(){
        if (this.platform.is("desktop")) {
            this.token = await JSON.parse(localStorage.getItem("token"));
        } else {
            this.token = JSON.parse(await this.storage.getItem("token"));
        }
    
    
        return new Promise((resolve, rejects) => {
            this.http.get(this.url + "/recent-courses", { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).subscribe((data: any) => {
                if(!data){
                    rejects(data);
                }else{
                    resolve(data.data);
                }
            })
        })
    }

    /**
     * Method for get category by name
     * @param category 
     * @returns 
     */
    async getCourseByCategoryName(category: string){
        if (this.platform.is("desktop")) {
            this.token = await JSON.parse(localStorage.getItem("token"));
        } else {
            this.token = JSON.parse(await this.storage.getItem("token"));
        }
    
    
        return new Promise((resolve, rejects) => {
            this.http.get(this.url + "/category-course/" + category, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).subscribe((data: any) => {
                if(!data){
                    rejects(data);
                }else{
                    resolve(data.data);
                }
            })
        })
    }
}
