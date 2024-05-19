import { Injectable } from '@angular/core';
import { getDatabase, ref, set} from "firebase/database";
const database = getDatabase();


@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor() { 
  }

  createFavorite(snkId: string, name: string, description: string, price: number, image:string, favorite: boolean) {
    set(ref(database, 'adidas/' + snkId), {
      snkId: snkId,
      name: name,
      description: description,
      price: price,
      image: image,
      favorite: favorite
    });
  }

  readFavorite(snkId: string) {
    return ref(database, 'adidas/');
  }

  readSneakers(){
    return ref(database, 'adidas/'); 
  }


  deleteFavorite(snkId: string) {
    set(ref(database, 'favs/' + snkId), null);
  }
}
