import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { MrIcon } from '@meridian/ui/icon';
import { PaginationSize } from './pagination.enums';
import { paginationButtonVariants, paginationEllipsisVariants, paginationNavVariants } from './pagination.variants';

type PageItem = number | 'ellipsis';

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

// The standard "windowed" pagination layout: always show the first and last page, a sibling on
// each side of the current page, and collapse whatever's left into a single ellipsis per side.
function buildPageItems(current: number, total: number): PageItem[] {
  const siblingCount = 1;
  const windowSize = siblingCount * 2 + 5; // first + last + current + one ellipsis-worth of slack per side

  if (total <= windowSize) {
    return range(1, total);
  }

  const leftSiblingIndex = Math.max(current - siblingCount, 1);
  const rightSiblingIndex = Math.min(current + siblingCount, total);
  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < total - 1;
  const boundaryItemCount = 3 + siblingCount * 2;

  if (!showLeftEllipsis && showRightEllipsis) {
    return [...range(1, boundaryItemCount), 'ellipsis', total];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    return [1, 'ellipsis', ...range(total - boundaryItemCount + 1, total)];
  }

  return [1, 'ellipsis', ...range(leftSiblingIndex, rightSiblingIndex), 'ellipsis', total];
}

@Component({
  selector: 'mr-pagination',
  imports: [MrIcon],
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MrPagination {
  private readonly _page = signal(1);

  @Input()
  set page(value: number) {
    this._page.set(value);
  }

  get page(): number {
    return this._page();
  }

  @Output() readonly pageChange = new EventEmitter<number>();

  private readonly _totalPages = signal(1);

  @Input({ required: true })
  set totalPages(value: number) {
    this._totalPages.set(value);
  }

  get totalPages(): number {
    return this._totalPages();
  }

  private readonly _size = signal<`${PaginationSize}`>(PaginationSize.Md);

  @Input()
  set size(value: `${PaginationSize}`) {
    this._size.set(value);
  }

  get size(): `${PaginationSize}` {
    return this._size();
  }

  protected readonly navClass = computed(() => paginationNavVariants());
  protected readonly ellipsisClass = computed(() => paginationEllipsisVariants({ size: this._size() }));
  protected readonly pageItems = computed(() => buildPageItems(this._page(), this._totalPages()));
  protected readonly isFirstPage = computed(() => this._page() <= 1);
  protected readonly isLastPage = computed(() => this._page() >= this._totalPages());

  protected pageButtonClass(item: number): string {
    return paginationButtonVariants({ size: this._size(), active: item === this._page() });
  }

  protected navButtonClass(): string {
    return paginationButtonVariants({ size: this._size(), active: false });
  }

  protected goTo(target: number): void {
    if (target < 1 || target > this._totalPages() || target === this._page()) {
      return;
    }
    this._page.set(target);
    this.pageChange.emit(target);
  }

  protected prev(): void {
    this.goTo(this._page() - 1);
  }

  protected next(): void {
    this.goTo(this._page() + 1);
  }
}
