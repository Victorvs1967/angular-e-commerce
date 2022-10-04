import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-dilog-box',
  templateUrl: './dilog-box.component.html',
  styleUrls: ['./dilog-box.component.scss']
})
export class DilogBoxComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DilogBoxComponent>, @Inject(MAT_DIALOG_DATA) public product: Product) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onSubmit() {
    console.log(this.product);
  }

  ngOnInit(): void {
  }

}
