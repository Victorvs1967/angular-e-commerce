import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { DilogBoxComponent } from '../../dilog-box/dilog-box.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAdmin = false;
  product?: Product;

  constructor(public productsService: ProductsService, public dialog: MatDialog, private router: Router) { }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(DilogBoxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data: Product) => {
      console.log('The dialog was closed');
      if (data) {
        this.product = data;
        this.product.image = data.image ? data.image : 'apple.jpeg';
        this.productsService.addProduct(this.product)
          .then(() => this.router.navigate([`products/${this.product?.id}`]));              
      }
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.isAdmin = true;
  }

  logout() {
    this.isAdmin = false;
  }

}
