import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Userauth } from './shared/userauth.model';
@Injectable({
  providedIn: 'root'
})
export class UserauthService {
  url:string="http://localhost/projet_mini_web/userauth_jwt.php";
  checkUser(u:Userauth){
    return this.http.post(this.url, u);
  }
  constructor(public http:HttpClient) { }
}
