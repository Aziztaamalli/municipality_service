import { Component, OnInit } from '@angular/core';
import { Child } from '../shared/child.model';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-first-one',
  standalone: true,
  imports: [CommonModule,FormsModule,NavbarComponent],
  templateUrl: './first-one.component.html',
  styleUrls: ['./first-one.component.scss']
})
export class FirstOneComponent implements OnInit {
  childObj: Child = new Child();
  childrenList: Child[] = [];
  constructor(public data:DataService){}
  ngOnInit(): void {
    //const localData = localStorage.setItem("username","ali");
  }
  public saveInfo() {
    console.log(this.childObj)
    this.data.addChild(this.childObj).subscribe(
   (response)=> console.log(response)
    );
  }
  // ... other methods for edit, update, and delete (unchanged)
}
