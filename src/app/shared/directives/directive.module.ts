import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorDirective } from './paginator.directive';

@NgModule({
  declarations: [
    PaginatorDirective
  ],
  exports: [
    PaginatorDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectiveModule {
}
