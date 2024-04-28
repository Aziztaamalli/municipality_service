import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { User } from '../shared/user.model';
import { UserService } from '../user.service';
import { Userauth } from '../shared/userauth.model';
import { UserauthService } from '../userauth.service';
import { OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule,FormsModule,NavbarComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})

export class HomepageComponent implements OnInit {
  ngOnInit(): void {
  }
  Message: string = '';
  successMessage: string = ''; // Property to hold success message
  userObj : User = new User();
  userauthObj: Userauth=new Userauth();
  r:string="";
  userList : User[] = [];
  constructor(private user:UserService , public userau:UserauthService,private router:Router) {}
  signUp() {
    const container = document.getElementById('container');
    if (container && container.classList) {
      container.classList.add("right-panel-active");
    }
  }
  signIn() {
    const container = document.getElementById('container');
    if (container && container.classList) {
      container.classList.remove("right-panel-active");
    }
  }
  signInn() {
    this.userau.checkUser(this.userauthObj).subscribe(
      (data: any) => {
        console.log(data);
        this.r = data.userData.role;
        if (!data.success) {
          alert(data.message);
        } else {
          // Save user information to local storage
          localStorage.setItem('userData', JSON.stringify(data.userData));
          localStorage.setItem('token', data.token);
          // console.log('Stored token:', localStorage.getItem('token'));
          if (this.r == 'citizen') {
            this.router.navigate(['/odkhol']);
          } else if(this.r == 'admin') {
            this.router.navigate(['/odkhollAdmin']);
          }
          else{
            this.router.navigate(['/staff'])
          }
        }
      }
    );
  }
  // signInn(){
  //   this.userau.checkUser(this.userauthObj).subscribe(
  //     (data:any)=>{
  //       console.log(data);
  //       this.r=data.userData.role;
  //       if(!data.success){
  //         alert(data.message);
  //       }
  //       else{
  //         if(this.r=="citizen"){
  //           this.router.navigate(['/odkhol']);
  //         }
  //         else{
  //           this.router.navigate(['/odkhollAdmin']);
  //       }
  //       }
  //     }
  //   );
  //    }
     signUpp() {
      this.user.addUser(this.userObj)
       .subscribe((res: any) => {
        console.log(res);
         if (!res.success) {
           alert(res.message);
         } else {
          console.log(res)
           alert(res.message);
           this.signIn();
         }
       });
     }}
