import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  favorite: boolean;
}


@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  app: any;
  storage: any;
  auth: any;
  httpClient = inject(HttpClient);

  constructor() {
    this.app = initializeApp(environment.firebase);
    this.storage = getStorage(this.app);
    this.auth = getAuth(this.app);
  }

  async getProducts(): Promise<any> {
    const storageRef = ref(this.storage, 'adidas.json');
    const url = await getDownloadURL(storageRef);
    return firstValueFrom(this.httpClient.get(url));
  }

  async register(email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  async login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async getUser(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.auth.onAuthStateChanged((user: any) => {
        resolve(user);
      });
    });
  }

  async logout(): Promise<any> {
    return this.auth.signOut();
  }
}
