import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Child } from './shared/new.model';

@Injectable({
  providedIn: 'root'
})
export class PreRegisterService {
  url:string="http://localhost/projet_mini_web/generateqrcode1.php";

  constructor(public http:HttpClient) { }
  add(c:Child){
    return this.http.post(this.url,c);
  }
}
