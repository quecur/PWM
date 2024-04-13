import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-authenticity',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './authenticity.component.html',
  styleUrl: './authenticity.component.css'
})
export class AuthenticityComponent {

}
