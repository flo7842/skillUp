import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  url: string = "https://flodevfullstack.com/api";

  token: string;

  constructor(
    private http: HttpClient,
    private platform: Platform,
    private storage: NativeStorage
    ) { }

    /**
     * 
     * @param id 
     * @returns 
     */
    getCommandFromUser(id:number){
        return new Promise(async (resolve, rejects) => {

            if(this.platform.is("desktop")) {
                this.token = await JSON.parse(localStorage.getItem("token"));
            } else {
                this.token = JSON.parse(await this.storage.getItem("token"));
            }
      
            this.http.get(this.url + "/commands/"+ id, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).subscribe((data: any) => {
                (!data) ? rejects(data.message): resolve(data.data);
            });
        });
    }

    /**
     * 
     * @param id 
     * @returns 
     */
    getDataByCommand(id: number) {
    
        return new Promise(async (resolve, rejects) => {
            if(this.platform.is("desktop")) {
                this.token = await JSON.parse(localStorage.getItem("token"))
            } else {
                this.token = JSON.parse(await this.storage.getItem("token"))
            }
        

            this.http.get(this.url + "/command-line/"+ id, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).subscribe((data: any) => {
                (!data) ? rejects(data.message): resolve(data);
            });
        });
    }
}
