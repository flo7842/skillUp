import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Invoice } from '../../interfaces/invoice';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  url: string = "https://flodevfullstack.com/api";

  token: string;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private platform: Platform
  ) { }

  createInvoice(payment_method: string, CompanyId: number, CommandId: number) {

    
    return new Promise(async (resolve, rejects) => {

      if (this.platform.is("desktop")) {
        this.token = await JSON.parse(localStorage.getItem("token"))
      } else {
        this.token = JSON.parse(await this.storage.getItem("token"))
      }
      

      this.http.post(this.url + '/invoice', {payment_method: payment_method, CompanyId: CompanyId, CommandId: CommandId }, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).subscribe((data: any) => {
        
            (!data) ? rejects(data): resolve(data);
        });
    });
  }


  getAllInvoicesByUser(id: number) {
    
    return new Promise(async (resolve, rejects) => {

      if (this.platform.is("desktop")) {
        this.token = await JSON.parse(localStorage.getItem("token"))
      } else {
        this.token = JSON.parse(await this.storage.getItem("token"))
      }
      

      this.http.get(this.url + "/invoice-user/"+ id, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).subscribe((data: any) => {

            //(!data) ? rejects(data.message): resolve(data);
            if(!data){
              rejects(data.message)
            }else{
              resolve(data)
            }
        });
    });
  }
}
