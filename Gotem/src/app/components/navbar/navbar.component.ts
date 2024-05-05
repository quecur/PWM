import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  menuVisible: boolean = false;
  mostrarNuevoEnlace: boolean = false;
  autenticado: string | undefined;

  constructor() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const autenticadoValue = sessionStorage.getItem('autenticado');
      this.autenticado = autenticadoValue !== null ? autenticadoValue : undefined;
    }
    
  }

  ngOnInit(): void {
    if (this.autenticado === 'true'){
      this.mostrarNuevoEnlace = true;
    }
  }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.removeItem('autenticado');
      window.location.reload();
    }
  }
}
