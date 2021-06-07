import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  url: string = "http://localhost:3000/api";
  token: string;

  constructor(
    private http: HttpClient,
    private platform: Platform,
    private storage: NativeStorage
    ) { }

  getDataByCommand(id: number) {

    
    return new Promise(async (resolve, rejects) => {

      if (this.platform.is("desktop")) {
        this.token = await localStorage.getItem("token")
      } else {
        this.token = await this.storage.getItem("token")
      }
      

      this.http.get(this.url + "/command-line/"+ id, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).subscribe((data: any) => {

            (!data) ? rejects(data.message): resolve(data);
        });
    });
  }
}
