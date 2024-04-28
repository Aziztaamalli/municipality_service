import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Child } from './shared/child.model';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  url:string="http://localhost/projet_mini_web/post.php";
  constructor(public http:HttpClient) { }
  addChild(c:Child)
  {
      return this.http.post(this.url,c);
  }
  deletechild(){
  }
}
