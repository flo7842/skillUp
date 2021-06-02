import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  url: string = "http://localhost:3000/api";
  token: string;

  constructor(private http: HttpClient) { }

  getDataByCommand(id: number) {

    
    return new Promise(async (resolve, rejects) => {

      this.token = await localStorage.getItem("token")

      this.http.get(this.url + "/command-line/"+ id, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).subscribe((data: any) => {

            (!data) ? rejects(data.message): resolve(data);
        });
    });
  }
}
