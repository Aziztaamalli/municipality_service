import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { HomepageComponent } from './homepage/homepage.component';
// import { ForgetComponent } from'./forget/forget.component';
// import { FirstOneComponent } from './first-one/first-one.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app1';
}
