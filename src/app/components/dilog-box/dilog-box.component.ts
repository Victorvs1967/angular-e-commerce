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
      title: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      year: new FormControl('',),
      image: new FormControl('',),
      description: new FormControl('',),
      chip: new FormControl('',),
      memory: new FormControl('',),
      ssd: new FormControl('',),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onSubmit() {
    const id = Math.floor(Math.random() * 1000);
    const { title, price, year, image, description, chip, memory, ssd } = this.prodForm.value;

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