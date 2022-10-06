import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product?: Product;

  constructor(private pruductsService: ProductsService, private route: ActivatedRoute) {  }

  ngOnInit(): void {
    this.route.data.subscribe((data: any) => this.product = data.product);
  }


}
