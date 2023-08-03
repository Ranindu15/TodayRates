import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from './app-header.component';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MobileAppHeaderComponent } from './mobile-app-header/mobile-app-header.component';
import { MatRightSheetModule } from 'mat-right-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AppHeaderComponent,
    MobileAppHeaderComponent
  ],
  exports: [
    AppHeaderComponent,
    MobileAppHeaderComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatRightSheetModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatSidenavModule
  ]
})
export class AppHeaderModule { }
