import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() totalItems!: number;
  @Input() itemsPerPage!: number;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  getPagesArray(): number[] {
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    const maxPagesToShow = 3;

    if (totalPages <= maxPagesToShow) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pagesArray: number[] = [];

    if (currentPage <= 1) {
      for (let i = 1; i <= maxPagesToShow; i++) {
        pagesArray.push(i);
      }
    } else if (currentPage >= totalPages) {
      for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
        pagesArray.push(i);
      }
    } else {
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pagesArray.push(i);
      }
    }

    return pagesArray;
  }
}
