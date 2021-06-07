import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './../../interfaces/user';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = "http://localhost:3000/api";
  user: any;
  token: string;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private platform: Platform
  ) { }

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

  edit(id: number, user: User) {
    return new Promise(async(resolve, rejects) => {

      if (this.platform.is("desktop")) {
        this.token = await localStorage.getItem("token")
      } else {
        this.token = await this.storage.getItem("token")
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

  
}
