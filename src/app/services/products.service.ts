import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';
import { initializeApp } from "firebase/app";
import { DatabaseReference, get, getDatabase, ref as dbRef } from "firebase/database";
import { FirebaseStorage, getDownloadURL, getStorage, ref } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  storage: FirebaseStorage;
  productsListRef: DatabaseReference;

  constructor(private http: HttpClient) {

    // TODO: Replace the following with your app's Firebase project configuration
    // See: https://firebase.google.com/docs/web/learn-more#config-object
    const firebaseConfig = {
      // ...
      databaseURL: environment.databaseUrl,
      storageBucket: environment.storageBucket,
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // Initialize Cloud Storage and get a reference to the service
    this.storage = getStorage(app);
    this.productsListRef = dbRef(getDatabase(app), 'products');
  }

  getProducts(): Promise<Product[]> {
    return get(this.productsListRef).then((data: any) => data.toJSON())
      .then((products: any) => { 
        let items: Product[] = [];
        for (let key in products) {
          getDownloadURL(ref(this.storage, `images/${products[key].image}`))
            .then(url => products[key].image = url);
          items = [ products[key], ...items ];
        }
        return items;
      }
    );
  }

  getProduct(id: number): Promise<Product> {
    return get(this.productsListRef).then((data: any) => data.toJSON())
      .then((products: any) => { 
        let item: Product = products[id - 1];
        getDownloadURL(ref(this.storage, `images/${item.image}`))
          .then(url => item.image = url);
        return item;
      }
    );
  }    
}
