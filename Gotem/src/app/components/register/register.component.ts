import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DbService } from '../../services/db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent{


  constructor(private fb: FormBuilder, private db: DbService, private router: Router) {}

  formReg = this.fb.group({
    user: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)]),
    password2: new FormControl('', Validators.required)
  },{
    validators: this.passwordMatchValidator
  });


  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const password2 = control.get('password2');

    return password && password2 && password.value !== password2.value ? { 'passwordMismatch': true } : null;
  }

  onSubmit(){
    const email = this.formReg.value.email;
    const password = this.formReg.value.password;
    if (email && password) {
      const promesa = this.db.register(email, password);
      promesa.then(() => {
        this.router.navigate(['/home']);
      }).catch((error) => {
        this.cleanForm();
      });
    }
  }

  cleanForm(){
    this.formReg.reset();
  }
}
