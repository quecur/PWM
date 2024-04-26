import { Component } from '@angular/core';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthenticityComponent } from './components/authenticity/authenticity.component';
import { AboutComponent } from './components/about/about.component';
import { RouterOutlet } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [RouterOutlet]
})
export class AppComponent {
  title = 'GOTEM';
}