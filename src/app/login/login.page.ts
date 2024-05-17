import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})

export class LoginPage implements OnInit {
  registerForm: FormGroup;
  loginForm: FormGroup;
  isLoginSelected = true;
  isLoggedIn = false;
  user: any;

  constructor(private formBuilder: FormBuilder, private productsService: ProductsService, private router: Router ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.matchValues('password') });
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.registerForm.reset();
    this.productsService.getUser().then((user) => {
      this.isLoggedIn = !!user;
      this.user = user;
    }).catch((error) => {
      console.error('Error getting user:', error);
    });
  }

  selectLogin() {
    this.isLoginSelected = true;
  }

  selectRegister() {
    this.isLoginSelected = false;
  }

  register() {
    const response = this.productsService.register(this.registerForm.value.email, this.registerForm.value.password);
    response.then((result) => {
      alert('You have successfully registered');
    }).catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email already in use');
      }
    });
    this.registerForm.reset();

  }

  matchValues(matchTo: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls['confirmPassword'];
      const passwordControl = formGroup.controls[matchTo];

      if (control.value !== passwordControl.value) {
        control.setErrors({ matching: true });
      } else {
        control.setErrors(null);
      }
    };
  }

  get f() {
    return this.registerForm.controls;
  }

  signIn() {
    const response = this.productsService.login(this.loginForm.value.email, this.loginForm.value.password);
    response.then((result) => {
      alert('You have successfully logged in');
      location.reload();
    }).catch((error) => {
      if (error.code === 'auth/invalid-credential') {
        alert('Wrong password');
      }
    });
  }

  signOut() {
    const response = this.productsService.logout();
    response.then((result) => {
      alert('You have successfully logged out');
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
    location.reload();
  }
}
