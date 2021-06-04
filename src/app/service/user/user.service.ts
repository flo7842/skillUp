import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = "http://localhost:3000/api";
  user: any;
  token: string;

  constructor(private http: HttpClient) { }

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

      this.token = await localStorage.getItem("token")
      
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
