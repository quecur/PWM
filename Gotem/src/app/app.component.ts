import { Component } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [NavbarComponent]
})
export class AppComponent {
  title = 'Gotem';
}