import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Config, Product } from 'src/app/models/product.model';
import { DilogBoxComponent } from '../../dilog-box/dilog-box.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAdmin = false;
  product?: Product;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.data = {};

    // {
    //   id: 100,
    //   title: 'iPhone 14 Pro',
    //   price: 1000,
    //   year: '2022',
    //   image: '',
    //   description: 'iPhone 14 Pro good device...',
    //   configure: {
    //     chip: 'A17',
    //     memory: '256 GB',
    //     SSD: '',
    //   }
    // };

    const dialogRef = this.dialog.open(DilogBoxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      this.product = result;
      this.product!.id = 100;
      this.product!.year = '2022';
      this.product!.configure = {chip: 'A17', memory: '256 GB', SSD: ''};

      console.log(this.product);
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
