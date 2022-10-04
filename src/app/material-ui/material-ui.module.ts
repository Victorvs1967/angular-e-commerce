import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule}  from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule}  from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

const MATERIAL_UI_COMPONENTS = [
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatTooltipModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
];

@NgModule({
  imports: [ CommonModule, ...MATERIAL_UI_COMPONENTS ],
  exports: [ ...MATERIAL_UI_COMPONENTS ],
})
export class MaterialUiModule { }
