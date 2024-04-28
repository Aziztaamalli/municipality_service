import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string="http://localhost/projet_mini_web/postUser.php";
  addUser(u:User){
    return this.http.post(this.url,u);
  }
  getInfo(){
    return this.http.get(this.url);
  }

  constructor(public http:HttpClient) { }
}
