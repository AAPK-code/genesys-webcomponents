import {
  Component,
  ComponentInterface,
  Event,
  EventEmitter,
  h,
  JSX,
  Prop,
  State
} from '@stencil/core';

import { GuxItemsPerPage } from './gux-pagination-items-per-page/gux-pagination-items-per-page';

export type GuxPaginationLayout = 'small' | 'full';
export type GuxPaginationState = {
  currentPage: number;
  itemsPerPage: number;
};

@Component({
  styleUrl: 'gux-pagination.less',
  tag: 'gux-pagination'
})
export class GuxPagination implements ComponentInterface {
  /**
   * The currently select page. Changes are watched by the component.
   */
  @Prop({ mutable: true })
  currentPage: number = 1;

  /**
   * The total number of items in the data set. Used to calculate total page count
   */
  @Prop()
  totalItems: number = 0;

  /**
   * The max number of items on a page. Used to calculate total page count
   */
  @Prop({ mutable: true })
  itemsPerPage: GuxItemsPerPage = 25;

  /**
   * The pagination component can have different layouts to suit the available space
   */
  @Prop()
  layout: GuxPaginationLayout = 'full';

  /**
   * The total number of pages needed for the the data set.
   */
  @State()
  private totalPages: number;

  @Event()
  private guxpaginationchange: EventEmitter<GuxPaginationState>;

  private setPage(page: number): void {
    if (page < 1) {
      this.setPage(1);
      return;
    }

    const totalPages = this.calculatTotalPages();
    if (page > totalPages) {
      this.setPage(totalPages);
      return;
    }

    this.currentPage = page;
    this.guxpaginationchange.emit({
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage
    });
  }

  private calculatTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  private handleInternalitemsperpagechange(event: CustomEvent): void {
    this.itemsPerPage = event.detail;
    this.setPage(1);
  }

  private handleInternalcurrentpagechange(event: CustomEvent): void {
    this.setPage(event.detail);
  }

  componentWillRender(): void {
    this.totalPages = this.calculatTotalPages();
    this.currentPage = Math.min(this.currentPage, this.totalPages);
  }

  render(): JSX.Element {
    return (
      <div class={`gux-pagination-container ${this.layout}`}>
        <div class="gux-pagination-container-left">
          <gux-pagination-item-counts
            total-items={this.totalItems}
            current-page={this.currentPage}
            items-per-page={this.itemsPerPage}
          />
          <gux-pagination-items-per-page
            items-per-page={this.itemsPerPage}
            on-internalitemsperpagechange={this.handleInternalitemsperpagechange.bind(
              this
            )}
          ></gux-pagination-items-per-page>
        </div>
        <div>
          <gux-pagination-buttons
            layout={this.layout}
            current-page={this.currentPage}
            total-pages={this.totalPages}
            on-internalcurrentpagechange={this.handleInternalcurrentpagechange.bind(
              this
            )}
          />
        </div>
      </div>
    );
  }
}
