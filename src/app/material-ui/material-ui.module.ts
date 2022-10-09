import { NgModule } from '@angular/core';

// graphics
import { MatIconModule}  from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule}  from '@angular/material/card';

// common
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

const common = [
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatMenuModule,
];

const graphics = [
  MatTooltipModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
];

const MATERIAL_UI_COMPONENTS = [
  ...common,
  ...graphics,
];

@NgModule({
  imports: [ ...MATERIAL_UI_COMPONENTS ],
  exports: [ ...MATERIAL_UI_COMPONENTS ],
})
export class MaterialUiModule { }
