import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './../../interfaces/user';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = "https://flodevfullstack.com/api";

  user: any;
  token: string;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private platform: Platform
  ) { }

  /**
   * Method for find user by role
   * @param id 
   * @returns 
   */
  getUserByRole(id: number) {

    let tabRole = []
    return new Promise((resolve, rejects) => {
        this.http.get(this.url + '/user/'+ id).subscribe((data: any) => {
          if(!data){
            
            rejects(false)
           }else{
            this.user = data.data
            tabRole.push(this.user.Roles);
            let roles = search("admin",tabRole[0])
            
            
            resolve(roles);
           }
        });
    });

    function search(nameKey, myArray){
      for (var i=0; i < myArray.length; i++) {
          if (myArray[i].name == nameKey) {
              return myArray[i];
          }
      }
    }
  }

  /**
   * Method for update user
   * @param id 
   * @param user 
   * @returns 
   */
  edit(id: number, user: User) {
    return new Promise(async(resolve, rejects) => {

      if (this.platform.is("desktop")) {
        this.token = await JSON.parse(localStorage.getItem("token"))
      } else {
        this.token = JSON.parse(await this.storage.getItem("token"))
      }
      
      
      this.http.put(this.url + "/user/"+ id, user, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).subscribe((data: any) => {
          //(!data.success) ? rejects(data.message): resolve(data);
          if(!data){
        rejects(data)
      }else{
        console.log(data)
        resolve(data);
      }
      });
    });
  }

  /**
   * Method for update user password
   * @param id 
   * @param oldpass 
   * @param user_password 
   * @returns 
   */
  async updatePassword(id: number, oldpass: string, user_password: string){
    return new Promise(async(resolve, rejects) => {

      if (this.platform.is("desktop")) {
        this.token = await JSON.parse(localStorage.getItem("token"))
      } else {
        this.token = JSON.parse(await this.storage.getItem("token"))
      }
      
      
      this.http.put(this.url + "/reset-password-modify/"+ id, {oldpass: oldpass, user_password: user_password}, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).subscribe((data: any) => {
          //(!data.success) ? rejects(data.message): resolve(data);
          if(!data){
        rejects(false)
      }else{
        console.log(data)
        resolve(data);
      }
      });
    });
  }

  
}
