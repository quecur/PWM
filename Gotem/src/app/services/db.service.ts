import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { HttpClient } from '@angular/common/http';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';



@Injectable({
  providedIn: 'root'
})
export class DbService {
  public storage: any;
  public auth: any;
  public autenticado: boolean = false;

  constructor(private http: HttpClient) {
    const firebaseConfig = {
      apiKey: "AIzaSyDyr7VEm20JUQVQGtbFj9friPOInqwW1NI",
      authDomain: "gotem-2c6cc.firebaseapp.com",
      projectId: "gotem-2c6cc",
      storageBucket: "gotem-2c6cc.appspot.com",
      messagingSenderId: "1092311663398",
      appId: "1:1092311663398:web:7b68c850cc9d0d738337e7"
    };
    const app = initializeApp(firebaseConfig);
    this.storage = getStorage(app, 'gs://gotem-2c6cc.appspot.com');
    this.auth = getAuth(app);
  }

  getStorageRef(): any {
    return this.storage;
  }

  
  async getDataFromStorage(path: string): Promise<any> {
    try {
      const storageRef = ref(this.storage, path);
      const url = await getDownloadURL(storageRef);
      return this.http.get<any>(url).toPromise();
    } catch (error) {
      console.error("Error obteniendo datos del almacenamiento:", error);
      return null;
    }
  }

  register(email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        console.log("Usuario registrado exitosamente:", userCredential.user);
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          alert("El correo electrónico ya está en uso.");
        }
        console.error("Error durante el registro de usuario:", error.message);
        throw error;
      });
  }

  signIn(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        console.log("Usuario autenticado exitosamente:", userCredential.user);
        this.autenticado = true;
        sessionStorage.setItem('autenticado', 'true');
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          alert("Usuario no encontrado.");
        } else if (error.code === 'auth/invalid-credential') {
          alert("Contraseña incorrecta.");
        } else {
          alert("Error durante la autenticación.");
        }
        throw error;
      });
  }

}