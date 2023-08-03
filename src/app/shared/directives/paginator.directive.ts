import {
  Directive,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {MatLegacyPaginator as MatPaginator, LegacyPageEvent as PageEvent} from '@angular/material/legacy-paginator';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RouteManager} from '../../core/utils/framework/route-manager.service';
import {of} from 'rxjs';
import {MatLegacyTableDataSource as MatTableDataSource} from '@angular/material/legacy-table';
import {CONST} from '../../core/utils/constant';
import {ConfigLoader} from '../../core/utils/framework/config-loader.service';
import {distinctUntilChanged, skip, switchMap} from 'rxjs/operators';

/**
 * Extends MatPaginators functionalities by providing persistent state through URL params
 *
 * Supports both Client Side pagination and Server Side pagination
 *
 * @pageStateChanged  Event emitted when the paginator changes the page size or page index. (use this over Page event)
 * @pageIndex To programmatically override and handle the Page Index - default: 0
 * @pageSize  To programmatically override and handle the Page Size - default: defaultPageSize(): number
 * @length  Sets the paginator's length (MUST set for Server Side pagination)
 * @pageSizeOptions Sets the Page Size Options - default: defaultPageSizeOptions(): number
 * @dataSource  Sets the paginator to a particular Data Source (MUST set for Client Side pagination)
 * @pageIndexParamString  Set the URL param string for Page Index (MUST set for handling multiple Paginators in a component)
 * @pageSizeParamString Set the URL param string for Page Size (MUST set for handling multiple Paginators in a component)
 * @disablePersistence  Disables persistent features
 */
@Directive({
  selector: '[paginator]'
})
export class PaginatorDirective implements OnInit, OnChanges {
  @Output() pageStateChanged = new EventEmitter<PageEvent>();
  @Input() pageIndex: number;
  @Input() pageSize: number;
  @Input() length: number;
  @Input() pageSizeOptions: number[];
  @Input() dataSource: MatTableDataSource<any>;
  @Input() pageIndexParamString: string
  @Input() pageSizeParamString: string
  @Input() disablePersistence: boolean

  @HostBinding('class.hidden')
  private get isHidden(): boolean {
    return this.paginator.length <= this.paginator.pageSizeOptions[0];
  }

  constructor(private paginator: MatPaginator,
              private route: ActivatedRoute,
              private routeManager: RouteManager,
              private router: Router,
              private configLoader: ConfigLoader) {
  }

  ngOnInit() {
    // Set default values if nullify values are passed for the Input
    this.pageSizeOptions ||= this.defaultPageSizeOptions;
    this.pageIndexParamString ||= CONST.QUERY_PARAMS.PAGE_INDEX;
    this.pageSizeParamString ||= CONST.QUERY_PARAMS.PAGE_SIZE;
    this.disablePersistence ??= false;

    this.paginator.pageSizeOptions = this.pageSizeOptions;
    this.observePageEvent();

    if (this.disablePersistence) {
      this.paginator.pageIndex = 0;
      this.paginator.pageSize = this.defaultPageSize;
    } else {
      this.observeParamChanges();

      const params = this.route.snapshot.queryParamMap;
      if (this.pageIndex == null) setTimeout(() => this.paginator.pageIndex = Number(params.get(this.pageIndexParamString) ?? 0), 0);
      if (this.pageSize == null) this.paginator.pageSize = Number(params.get(this.pageSizeParamString) ?? this.defaultPageSize);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const {dataSource, length, pageSize, pageIndex} = changes;
    const params = new Map<string, number>();

    if (dataSource?.currentValue != null) {
      this.dataSource.paginator = this.paginator;
    }

    if (length?.currentValue != null) {
      this.paginator.length = length.currentValue;
    }

    if (pageIndex?.currentValue != null) {
      if (this.disablePersistence) {
        this.paginator.pageIndex = pageIndex.currentValue;
      } else {
        params.set(this.pageIndexParamString, pageIndex.currentValue);
      }
    }

    if (pageSize?.currentValue != null) {
      if (this.disablePersistence) {
        this.paginator.pageSize = pageSize.currentValue;
      } else {
        params.set(this.pageSizeParamString, pageSize.currentValue);
      }
    }

    if (params.size > 0) {
      this.routeManager.addParamsToUrl(params);
    }
  }

  private get defaultPageSize(): number {
    return this.configLoader.configurations.get(CONST.APP_CONFIG.SYSTEM_CONFIG)?.commons?.paginationPageSize;
  }

  private get defaultPageSizeOptions(): number[] {
    return this.configLoader.configurations.get(CONST.APP_CONFIG.SYSTEM_CONFIG)?.commons?.paginationPageSizeOptions;
  }

  /**
   * Listen for Only Pagination Query Param Changes
   * Skip 1 to Prevent Listening at OnInit
   * @private
   */
  private observeParamChanges() {
    this.route.queryParamMap
      .pipe(
        switchMap((params: ParamMap) => {
          return of({
            pageIndex: params.get(this.pageIndexParamString),
            pageSize: params.get(this.pageSizeParamString)
          });
        }),
        distinctUntilChanged((prev, curr) =>
          prev.pageIndex === curr.pageIndex &&
          prev.pageSize === curr.pageSize
        ),
        skip(1),
      )
      .subscribe((params) => {
        this.paginator.pageIndex = Number(params.pageIndex ?? 0);
        this.paginator.pageSize = Number(params.pageSize ?? this.defaultPageSize);

        this.emitPageState();
      });
  }

  /**
   * Listen for Attached Paginator's PageEvent event
   * Set Props Received to the Query Params
   * @private
   */
  private observePageEvent() {
    this.paginator.page.subscribe((data: PageEvent) => {
      if (this.disablePersistence) {
        this.emitPageState();
        return;
      }

      const params = new Map<string, number>()
        .set(this.pageIndexParamString, data.pageIndex)
        .set(this.pageSizeParamString, data.pageSize);

      this.routeManager.addParamsToUrl(params);
    });
  }

  /**
   * Emit pageStateChanged with Pagination Properties
   * @private
   */
  private emitPageState() {
    const page = new PageEvent();
    // Getting From Query Params Directly because of Timeout 0 Issue
    page.pageIndex = this.paginator.pageIndex;
    page.pageSize = this.paginator.pageSize;

    this.pageStateChanged.emit(page);
  }
}
