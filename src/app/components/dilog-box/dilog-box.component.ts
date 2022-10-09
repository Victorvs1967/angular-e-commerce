import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-dilog-box',
  templateUrl: './dilog-box.component.html',
  styleUrls: ['./dilog-box.component.scss']
})
export class DilogBoxComponent implements OnInit {

  prodForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<DilogBoxComponent>, @Inject(MAT_DIALOG_DATA) public product: Product) {
    this.prodForm = new FormGroup({
      title: new FormControl(this.product ? this.product.title : '', Validators.required),
      price: new FormControl(this.product ? this.product.price : '', Validators.required),
      year: new FormControl(this.product ? this.product.year : '',),
      image: new FormControl('',),
      description: new FormControl(this.product ? this.product.description : '',),
      chip: new FormControl(this.product ? this.product.configure.chip : '',),
      memory: new FormControl(this.product ? this.product.configure.memory : '',),
      ssd: new FormControl(this.product ? this.product.configure.SSD : '',),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onSubmit() {
    const { title, price, year, image, description, chip, memory, ssd } = this.prodForm.value;
    const id = this.product ? this.product.id : '';

    const configure = {
      chip,
      memory,
      SSD: ssd,
    };

    const product: Product = {
      id,
      title,
      price,
      year,
      image,
      description,
      configure,
    };

    this.dialogRef.close(product);
  }

  ngOnInit(): void {
  }

}