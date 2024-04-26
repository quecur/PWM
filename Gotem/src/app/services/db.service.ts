import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DbService {
  public storage: any;

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
}