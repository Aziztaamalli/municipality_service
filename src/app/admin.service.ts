import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url:string ="http://localhost/projet_mini_web/fetch.php"

  constructor(public http:HttpClient) { }
  AllNewBorn(){
    return this.http.get(this.url);
  }
}
