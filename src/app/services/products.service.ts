import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';
import { initializeApp } from "firebase/app";
import { FirebaseStorage, getDownloadURL, getStorage, ref } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  storage: FirebaseStorage;

  constructor(private http: HttpClient) {

    // TODO: Replace the following with your app's Firebase project configuration
    // See: https://firebase.google.com/docs/web/learn-more#config-object
    const firebaseConfig = {
      // ...
      storageBucket: environment.storageBucket,
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // Initialize Cloud Storage and get a reference to the service
    this.storage = getStorage(app);
    
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.apiUrl).pipe(map((data: any) => {
      let products: Product[] = [];
      data.forEach((product: any) => {
        getDownloadURL(ref(this.storage, `images/${product.image}`))
          .then(url => product.image = url);
        products = [ ...products, product ];
      });
      return products;
    }));
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<any>(environment.apiUrl).pipe(map((products: Product[]) => {
      const product: any = products.find(((product: Product) => product.id === id));
      getDownloadURL(ref(this.storage, `images/${product.image}`))
        .then(url => product.image = url);
      return product;
    }));
  }    
}
