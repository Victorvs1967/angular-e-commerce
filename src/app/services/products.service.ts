import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { environment } from 'src/environments/environment';
import { Database, DatabaseReference, get, getDatabase, ref as dbRef, set } from "firebase/database";
import { FirebaseStorage, getDownloadURL, getStorage, ref } from "firebase/storage";
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  storage: FirebaseStorage;
  db: Database;
  productsListRef: DatabaseReference;

  constructor() {
    const firebaseConfig = {
      databaseURL: environment.firebase.databaseURL,
      storageBucket: environment.firebase.storageBucket,
    };
    const app = initializeApp(firebaseConfig);
    this.storage = getStorage(app);
    this.db = getDatabase(app);
    this.productsListRef = dbRef(this.db, 'products');
  }

  getProducts(): Promise<Product[]> {
    return get(this.productsListRef).then((data: any) => data.toJSON())
      .then((products: Product[]) => { 
        let items: Product[] = [];
        for (let key in products) {
          if (products[key].image) {
            getDownloadURL(ref(this.storage, `images/${products[key].image}`))
              .then(url => products[key].image = url);
          }
          items = [ products[key], ...items ];
        }
        return items;
      }
    );
  }

  getProduct(id: number): Promise<Product> {
    return get(this.productsListRef).then((data: any) => data.toJSON())
      .then((products: any) => {
        getDownloadURL(ref(this.storage, `images/${products[id].image}`)).then(url => products[id].image = url)
        return products[id];
      },
    ).catch(err => err);
  }
  
  addProduct(product: Product): Promise<void> {
    return set(dbRef(this.db, `products/${product.id}`), product)
      .then(() => console.log(product, 'save successfully...'));
  }
}