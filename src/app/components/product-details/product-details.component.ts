import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { DilogBoxComponent } from '../dilog-box/dilog-box.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product?: Product;

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog,
    private router: Router, 
    private route: ActivatedRoute
  ) {  }

  ngOnInit(): void {
    this.route.data.subscribe((data: any) => this.product = data.product);
  }

  editProduct(product: Product) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.disableClose = true;
    dialogConfig.data = product;
    const dialogRef = this.dialog.open(DilogBoxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data: Product) => {
      console.log('The dialog was closed');
      this.product = data;
      this.product.image = data.image ? data.image : 'apple.jpeg';
      this.productsService.saveProduct(this.product)
      .then(() => this.router.navigate([`products`]));      
    });
  }

  removeProduct(product: Product) {
    this.productsService.deleteProduct(product)
      .then(() => this.router.navigate(['products']))
  }
}
