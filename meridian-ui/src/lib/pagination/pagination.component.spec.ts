import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import { lucideChevronLeft, lucideChevronRight, lucideMoreHorizontal } from '@ng-icons/lucide';
import { MrPagination } from './pagination.component';
import { PaginationSize } from './pagination.enums';

@Component({
  imports: [MrPagination],
  template: `
    <mr-pagination
      [page]="page"
      (pageChange)="page = $event"
      [totalPages]="totalPages"
      [size]="size"
    ></mr-pagination>
  `,
})
class PaginationHost {
  @Input() page = 1;
  totalPages = 5;
  size: `${PaginationSize}` = PaginationSize.Md;
}

describe('MrPagination', () => {
  let fixture: ComponentFixture<PaginationHost>;

  const buttons = (): HTMLButtonElement[] => Array.from(fixture.nativeElement.querySelectorAll('button'));
  const prevButton = (): HTMLButtonElement => buttons()[0];
  const nextButton = (): HTMLButtonElement => buttons()[buttons().length - 1];
  const pageButtons = (): HTMLButtonElement[] => buttons().slice(1, -1);
  const ellipses = (): HTMLElement[] => Array.from(fixture.nativeElement.querySelectorAll('nav > span'));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationHost],
      providers: [
        provideIcons({ chevronLeft: lucideChevronLeft, chevronRight: lucideChevronRight, moreHorizontal: lucideMoreHorizontal }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationHost);
  });

  it('creates', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders every page with no ellipsis when they all fit', () => {
    fixture.detectChanges();
    expect(pageButtons().map((b) => b.textContent?.trim())).toEqual(['1', '2', '3', '4', '5']);
    expect(ellipses().length).toBe(0);
  });

  it('marks the current page with aria-current', () => {
    fixture.componentInstance.page = 3;
    fixture.detectChanges();
    expect(pageButtons()[2].getAttribute('aria-current')).toBe('page');
    expect(pageButtons()[0].getAttribute('aria-current')).toBeNull();
  });

  it('disables the previous button on the first page and the next button on the last page', () => {
    fixture.detectChanges();
    expect(prevButton().disabled).toBe(true);
    expect(nextButton().disabled).toBe(false);

    fixture.componentRef.setInput('page', 5);
    fixture.detectChanges();
    expect(prevButton().disabled).toBe(false);
    expect(nextButton().disabled).toBe(true);
  });

  it('navigates and emits pageChange on next/previous clicks', () => {
    fixture.detectChanges();
    nextButton().click();
    fixture.detectChanges();
    expect(fixture.componentInstance.page).toBe(2);

    prevButton().click();
    fixture.detectChanges();
    expect(fixture.componentInstance.page).toBe(1);
  });

  it('navigates and emits pageChange when a page number is clicked', () => {
    fixture.detectChanges();
    pageButtons()[3].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.page).toBe(4);
  });

  it('collapses a large page count into a windowed layout with ellipses', () => {
    fixture.componentInstance.totalPages = 20;
    fixture.componentInstance.page = 10;
    fixture.detectChanges();

    expect(pageButtons().map((b) => b.textContent?.trim())).toEqual(['1', '9', '10', '11', '20']);
    expect(ellipses().length).toBe(2);
  });

  it('shows only a trailing ellipsis when the current page is near the start', () => {
    fixture.componentInstance.totalPages = 20;
    fixture.componentInstance.page = 1;
    fixture.detectChanges();

    expect(pageButtons().map((b) => b.textContent?.trim())).toEqual(['1', '2', '3', '4', '5', '20']);
    expect(ellipses().length).toBe(1);
  });

  it('reflects a different size as classes on the page buttons', () => {
    fixture.componentInstance.size = PaginationSize.Xl;
    fixture.detectChanges();
    expect(pageButtons()[0].className).toContain('h-12');
  });
});
