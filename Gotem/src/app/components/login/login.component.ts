import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { DbService } from '../../services/db.service';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 
  constructor(private db: DbService, private fb: FormBuilder, private router: Router) {}

  formReg = this.fb.group({
    email: new FormControl(''),
    password: new FormControl('')
  });

  onSubmit() {
    const email = this.formReg.value.email;
    const password = this.formReg.value.password;
    if (email && password) {
      const promesa = this.db.signIn(email, password);
      promesa.then(() => {
        this.router.navigate(['/home']);
      }).catch((error) => {
        console.error("Error durante el inicio de sesión:", error.message);
        this.cleanForm();
      });
    }
    
  }
  cleanForm() {
    this.formReg.reset();
  }
}
