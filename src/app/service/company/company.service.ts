import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company } from '../../interfaces/command';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  url: string = "http://localhost:3000/api";
  token: string;

  constructor(private http: HttpClient) { }

  getData(id: number) {

    
    return new Promise(async (resolve, rejects) => {

      this.token = await localStorage.getItem("token")

      this.http.get(this.url + "/company/"+ id, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).subscribe((data: any) => {

            (!data) ? rejects(data.message): resolve(data);
        });
    });
  }
}
