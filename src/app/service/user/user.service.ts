import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = "http://localhost:3000/api";
  user: any
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

  
}
