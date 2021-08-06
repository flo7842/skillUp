import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    url: string = "http://localhost:3000/api";

    constructor(private http: HttpClient, private toast: ToastController) { }

    /**
     * Method for logging in the user
     * @param email 
     * @param user_password 
     * @returns 
     */
    login(email: string, user_password: string) {

    return new Promise((resolve, rejects) => {
        this.http.post(this.url + '/login', { email: email, user_password: user_password }).subscribe((data: any) => {
            if(data){
                resolve(data);
            }else{
            }    
        },(err) =>{
            if(err){
                rejects(false);
            }
            });
        });
    }

    /**
     * Method for register user
     * @param user 
     * @returns 
     */
    register(user: User) {
      
        return new Promise((resolve, rejects) => {
            this.http.post(this.url + '/register', user).subscribe((data: any) => {
              
                if(!data.message){
                    rejects(false);
                }else{
                    resolve(data);
                }
            });
        });
    }

    /**
     * This method will send an email for update password of user who has it forgot
     * @param email 
     * @returns 
     */
    resetPassword(email: string){
        return new Promise((resolve, rejects) => {
            this.http.post(this.url + '/passwordreset',  { email: email }).subscribe((data: any) => {
                if(!data){
                    rejects(data);
                }else{
                resolve(data);
                }
            }, (err) => {
                rejects(false);
            })
        })
    }
}
