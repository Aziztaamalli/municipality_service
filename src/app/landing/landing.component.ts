import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ChatbotComponent } from '../chatbot/chatbot.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavbarComponent,ChatbotComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
