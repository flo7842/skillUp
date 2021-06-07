import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Invoice } from '../../interfaces/invoice';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  url: string = "http://localhost:3000/api";
  token: string;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private platform: Platform
  ) { }

  createInvoice(invoice: Invoice) {

    
    return new Promise(async (resolve, rejects) => {

      if (this.platform.is("desktop")) {
        this.token = await localStorage.getItem("token")
      } else {
        this.token = await this.storage.getItem("token")
      }
      

      this.http.post(this.url + '/invoice', invoice).subscribe((data: any) => {

            (!data) ? rejects(data.message): resolve(data);
        });
    });
  }
}
