import { Component } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AuthenticityComponent } from './authenticity/authenticity.component';
import { AboutComponent } from './about/about.component';
import { RouterOutlet } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [NavbarComponent,FooterComponent, HomeComponent, AuthenticityComponent, AboutComponent, RouterOutlet]
})
export class AppComponent {
  title = 'GOTEM';
}