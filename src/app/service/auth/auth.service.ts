import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ​​
  url: string = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }

  login(email: string, user_password: string) {


    return new Promise((resolve, rejects) => {
        this.http.post(this.url + '/login', { email: email, user_password: user_password }).subscribe((data: any) => {
           
           
           if(!data){
            rejects(false)
           }else{
            resolve(data);
           }
          
            
        });
    });
}

register(user: User) {

    
  return new Promise((resolve, rejects) => {
      this.http.post(this.url + '/register', user).subscribe((data: any) => {
          (!data.success) ? rejects(data.message): resolve(data);
      });
  });
}


  resetPassword(email: string){
    return new Promise((resolve, rejects) => {
      this.http.post(this.url + '/passwordreset',  { email: email }).subscribe((data: any) => {
        if(!data){
          
          rejects(data)
        }else{
          console.log(data)
          resolve(data);
        }
       //(!data) ? rejects(data): resolve(data);

      })
    })
  }




}
