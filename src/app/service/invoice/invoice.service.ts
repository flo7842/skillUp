import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Invoice } from '../../interfaces/invoice';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  url: string = "http://localhost:3000/api";
  token: string;

  constructor(private http: HttpClient) { }

  createInvoice(invoice: Invoice) {

    
    return new Promise(async (resolve, rejects) => {

      this.token = await localStorage.getItem("token")

      this.http.post(this.url + '/invoice', invoice).subscribe((data: any) => {

            (!data) ? rejects(data.message): resolve(data);
        });
    });
  }
}
