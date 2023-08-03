import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { InvalidTokenDialogComponent } from './invalid-token-dialog.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatRightSheetModule } from 'mat-right-sheet';

const materialModules = [
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatRightSheetModule
];

@NgModule({
  declarations: [
    InvalidTokenDialogComponent
  ],
  exports: [
    InvalidTokenDialogComponent,
  ],
  imports: [
    CommonModule,
    ...materialModules
  ]
})
export class InvalidTokenDialogModule { }
