import { Injectable } from '@angular/core';
import { getDatabase, ref, get, child, update} from "firebase/database";
import { Product } from './products.service';
import { Observable, from, map } from 'rxjs';
const database = getDatabase();


@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor() { 
  }

  createFavorite(index: number) {
    const dbRef = ref(database, 'adidas/'+index);
    update(dbRef, {favorite: true}).then(() => {
      console.log("Data updated successfully! --> true");
    });
  }

  deleteFavorite(index: number) {
    const dbRef = ref(database, 'adidas/'+index);
    update(dbRef, {favorite: false}).then(() => {
      console.log("Data updated successfully! --> false");
    });
  }

  readSneakers(): Observable<Product[]> {
    const dbRef = ref(database);
    return from(get(child(dbRef, 'adidas/'))).pipe(
      map(snapshot => {
        const snks: Product[] = [];
        if (snapshot.exists()) {
          snapshot.forEach(childSnapshot => {
            snks.push(childSnapshot.val());
          });
        } else {
          console.log("No data available");
        }
        return snks;
      })
    );
  }
}
