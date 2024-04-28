import { Component ,  OnInit } from '@angular/core';
import { Child } from '../shared/new.model';
import { FormsModule } from '@angular/forms';
import { PreRegisterService } from '../pre-register.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-hospital-staff',
  standalone: true,
  imports: [FormsModule, NavbarComponent],
  templateUrl: './hospital-staff.component.html',
  styleUrl: './hospital-staff.component.css'
})
export class HospitalStaffComponent implements OnInit {
  childObj1: Child = new Child();
  constructor(public pre:PreRegisterService){}
  ngOnInit(): void {
    //const localData = localStorage.setItem("username","ali");
  }
  saveInfo(){
    this.pre.add(this.childObj1).subscribe(
      (data:any) => {
        console.log(data);
        if(!data.success){
          alert(data.message);
        }
        else{
          alert(data.message);
        }
      }
    )
  }
}
