import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import { lucideChevronDown, lucideChevronUp } from '@ng-icons/lucide';
import { MrTable } from './table.component';
import { TableColumn, TableSize, TableSortEvent } from './table.enums';

interface Person {
  name: string;
  age: number;
  active: boolean;
}

@Component({
  imports: [MrTable],
  template: `
    <mr-table
      [columns]="columns"
      [rows]="rows"
      [size]="size"
      [emptyMessage]="emptyMessage"
      (sortChange)="lastSortEvent = $event"
    ></mr-table>
  `,
})
class TableHost {
  @Input() columns: TableColumn<Person>[] = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'age', header: 'Age', sortable: true, align: 'right' },
    { key: 'active', header: 'Active' },
  ];
  @Input() rows: Person[] = [
    { name: 'Charlie', age: 25, active: true },
    { name: 'Alice', age: 30, active: false },
    { name: 'Bob', age: 20, active: true },
  ];
  @Input() size: `${TableSize}` = TableSize.Md;
  emptyMessage = 'No data available';
  lastSortEvent: TableSortEvent<Person> | undefined;
}

describe('MrTable', () => {
  let fixture: ComponentFixture<TableHost>;

  const headerCells = (): HTMLTableCellElement[] => Array.from(fixture.nativeElement.querySelectorAll('th'));
  const bodyRows = (): HTMLTableRowElement[] => Array.from(fixture.nativeElement.querySelectorAll('tbody tr'));
  const firstColumnValues = (): string[] =>
    bodyRows().map((row) => row.querySelector('td')!.textContent?.trim() ?? '');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableHost],
      providers: [provideIcons({ chevronDown: lucideChevronDown, chevronUp: lucideChevronUp })],
    }).compileComponents();

    fixture = TestBed.createComponent(TableHost);
  });

  it('creates', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders one header cell per column, in order', () => {
    fixture.detectChanges();
    expect(headerCells().map((th) => th.textContent?.trim())).toEqual(['Name', 'Age', 'Active']);
  });

  it('renders rows in their original order when unsorted', () => {
    fixture.detectChanges();
    expect(firstColumnValues()).toEqual(['Charlie', 'Alice', 'Bob']);
  });

  it('shows the empty message spanning every column when there are no rows', () => {
    fixture.componentRef.setInput('rows', []);
    fixture.detectChanges();

    const emptyCell = fixture.nativeElement.querySelector('tbody td');
    expect(bodyRows().length).toBe(1);
    expect(emptyCell.textContent?.trim()).toBe('No data available');
    expect(emptyCell.getAttribute('colspan')).toBe('3');
  });

  it('sorts ascending on the first click of a sortable column, then descending on the second', () => {
    fixture.detectChanges();

    headerCells()[0].click();
    fixture.detectChanges();
    expect(firstColumnValues()).toEqual(['Alice', 'Bob', 'Charlie']);
    expect(headerCells()[0].getAttribute('aria-sort')).toBe('ascending');
    expect(fixture.componentInstance.lastSortEvent).toEqual({ key: 'name', direction: 'asc' });

    headerCells()[0].click();
    fixture.detectChanges();
    expect(firstColumnValues()).toEqual(['Charlie', 'Bob', 'Alice']);
    expect(headerCells()[0].getAttribute('aria-sort')).toBe('descending');
    expect(fixture.componentInstance.lastSortEvent).toEqual({ key: 'name', direction: 'desc' });
  });

  it('resets to ascending when switching the sort to a different sortable column', () => {
    fixture.detectChanges();

    headerCells()[0].click();
    headerCells()[0].click();
    fixture.detectChanges();
    expect(headerCells()[0].getAttribute('aria-sort')).toBe('descending');

    headerCells()[1].click();
    fixture.detectChanges();
    expect(headerCells()[0].getAttribute('aria-sort')).toBe('none');
    expect(headerCells()[1].getAttribute('aria-sort')).toBe('ascending');
    expect(fixture.componentInstance.lastSortEvent).toEqual({ key: 'age', direction: 'asc' });
  });

  it('does not sort and has no aria-sort on a non-sortable column', () => {
    fixture.detectChanges();

    headerCells()[2].click();
    fixture.detectChanges();

    expect(firstColumnValues()).toEqual(['Charlie', 'Alice', 'Bob']);
    expect(headerCells()[2].getAttribute('aria-sort')).toBeNull();
    expect(fixture.componentInstance.lastSortEvent).toBeUndefined();
  });

  it('reflects a different size as classes on header cells', () => {
    fixture.componentRef.setInput('size', TableSize.Lg);
    fixture.detectChanges();
    expect(headerCells()[0].className).toContain('text-base');
  });
});
