import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AdminService } from '../admin.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NavbarComponent,NgFor],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  constructor(public adminn: AdminService) {}
  AllNewBorns:any=[];
  displayDoc(){
    const token = localStorage.getItem('token');
    console.log(token);
    if(!token){
      alert("Vous devez vous connecter pour accéder à cette page");
      return;
    }else{
      this.adminn.AllNewBorn().subscribe(data => console.log(data));
      this.adminn.AllNewBorn().subscribe(
        (res)=>this.AllNewBorns=res
      );
    }
  }
  refuseDoc(){}
  acceptDoc(){}
  ngOnInit()
  {

  }
}
