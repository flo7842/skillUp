import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company } from '../../interfaces/command';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  url: string = "http://localhost:3000/api";

  token: string;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private platform: Platform
  ) { }

  getData(id: number) {

    
    return new Promise(async (resolve, rejects) => {

      if (this.platform.is("desktop")) {
        this.token = await JSON.parse(localStorage.getItem("token"))
      } else {
        this.token = JSON.parse(await this.storage.getItem("token"))
      }
     

      this.http.get(this.url + "/company/"+ id, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).subscribe((data: any) => {

            (!data) ? rejects(data.message): resolve(data);
        });
    });
  }
}
