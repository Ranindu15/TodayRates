import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveModule } from '../../shared/directives/directive.module';
import { DateFormatter } from '../../core/utils/helpers/date-formatter.service';
import { HttpParams } from '@angular/common/http';
import { FeedbackMenuItemsComponent } from './feedback-menu-items.component';
import { FeedbackMenuItemsRoutingModule } from './feedback-menu-items.routing.module';
import { MAT_RIGHT_SHEET_DATA, MatRightSheet } from 'mat-right-sheet';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { FeedbackServiceHandler } from '../../core/services/service-handlers/feedback-service-handler';
import { RankingCommentsComponent } from './ranking-comments/ranking-comments.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ModalService } from '../../core/utils/ui/modal.service';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';
import { DynamicRenderer } from '../../core/utils/ui/dynamic-renderer.service';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { DocumentGenerateService } from '../../core/services/document-generate.service';
import {
  CustomerFeedbackOrderDetailsComponent
} from '../../shared/components/customer-feedback-order-details/customer-feedback-order-details.component';

const materialModules = [
  MatTableModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatSelectModule,
  MatPaginatorModule,
  MatAutocompleteModule,
  MatSlideToggleModule,
  InfiniteScrollModule,
  MatListModule,
  MatMenuModule
];

@NgModule({
  declarations: [
    FeedbackMenuItemsComponent,
    RankingCommentsComponent,
    CustomerFeedbackOrderDetailsComponent
  ],
  imports: [
    FeedbackMenuItemsRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectiveModule,
    ...materialModules,
  ],
  providers: [
    DateFormatter,
    HttpParams,
    DocumentGenerateService,
    FeedbackServiceHandler,
    ModalService,
    DynamicRenderer,
    MatBottomSheet,
    {provide: MAT_BOTTOM_SHEET_DATA, useValue: {}},
    MatRightSheet,
    {provide: MAT_RIGHT_SHEET_DATA, useValue: {}},
  ],
})
export class FeedbackMenuItemsModule {
}
