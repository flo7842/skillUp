import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from '../../interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  url: string = "http://localhost:3000/api";
  token: string;
  constructor(private http: HttpClient) { }

  async getCourse(): Promise <Course[]>{

    
    this.token = await localStorage.getItem("token")
    
    return new Promise((resolve, rejects) => {
      this.http.get(this.url + "/courses", { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).subscribe((data: any) => {
        try{
            
          let course: Course[] = [];

         
          
          let object = data.data
          for(const item of object){
            course.push({
              id: item.id,
              author: item.author,
              title: item.title,
              description: item.description,
              image: item.image,
              rate: item.rate,
              price: item.price,
              tax: item.tax,
              datePublish: item.datePublish,
            })
            
            resolve(course);
          }
        }catch(err){
         
          rejects(false)
        }
      })
    })
  }
}
