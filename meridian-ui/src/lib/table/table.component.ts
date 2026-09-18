import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { MrIcon } from '@meridian/ui/icon';
import { TableAlign, TableColumn, TableSize, TableSortDirection, TableSortEvent } from './table.enums';
import {
  tableBodyRowVariants,
  tableCellVariants,
  tableHeaderCellVariants,
  tableHeaderRowVariants,
  tableVariants,
  tableWrapperVariants,
} from './table.variants';

// A generic default comparator good enough for the primitive column values (string/number/Date)
// a data table actually renders — `<`/`>` already do the right thing for all three.
function defaultCompare(a: unknown, b: unknown): number {
  if (a === b) {
    return 0;
  }
  return (a as never) < (b as never) ? -1 : 1;
}

@Component({
  selector: 'mr-table',
  imports: [MrIcon],
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MrTable<T = unknown> {
  private readonly _columns = signal<TableColumn<T>[]>([]);

  @Input({ required: true })
  set columns(value: TableColumn<T>[]) {
    this._columns.set(value);
  }

  get columns(): TableColumn<T>[] {
    return this._columns();
  }

  private readonly _rows = signal<T[]>([]);

  @Input()
  set rows(value: T[]) {
    this._rows.set(value);
  }

  get rows(): T[] {
    return this._rows();
  }

  @Input() emptyMessage = 'No data available';

  private readonly _size = signal<`${TableSize}`>(TableSize.Md);

  @Input()
  set size(value: `${TableSize}`) {
    this._size.set(value);
  }

  get size(): `${TableSize}` {
    return this._size();
  }

  @Output() readonly sortChange = new EventEmitter<TableSortEvent<T>>();

  private readonly _sortKey = signal<keyof T | undefined>(undefined);
  private readonly _sortDirection = signal<TableSortDirection>('asc');

  protected readonly wrapperClass = computed(() => tableWrapperVariants());
  protected readonly tableClass = computed(() => tableVariants());
  protected readonly headerRowClass = computed(() => tableHeaderRowVariants());
  protected readonly bodyRowClass = computed(() => tableBodyRowVariants());
  protected readonly emptyCellClass = computed(() => tableCellVariants({ size: this._size(), align: 'center' }));

  protected readonly sortedRows = computed(() => {
    const key = this._sortKey();
    if (key === undefined) {
      return this._rows();
    }

    const direction = this._sortDirection();
    const factor = direction === 'asc' ? 1 : -1;
    return [...this._rows()].sort((a, b) => defaultCompare(a[key], b[key]) * factor);
  });

  protected headerCellClass(column: TableColumn<T>): string {
    return tableHeaderCellVariants({
      size: this._size(),
      align: this.resolveAlign(column),
      sortable: !!column.sortable,
    });
  }

  protected cellClass(column: TableColumn<T>): string {
    return tableCellVariants({ size: this._size(), align: this.resolveAlign(column) });
  }

  protected sortDirectionFor(column: TableColumn<T>): TableSortDirection | null {
    return this._sortKey() === column.key ? this._sortDirection() : null;
  }

  protected ariaSortFor(column: TableColumn<T>): 'ascending' | 'descending' | 'none' {
    const direction = this.sortDirectionFor(column);
    if (direction === 'asc') {
      return 'ascending';
    }
    if (direction === 'desc') {
      return 'descending';
    }
    return 'none';
  }

  protected toggleSort(column: TableColumn<T>): void {
    if (!column.sortable) {
      return;
    }

    const direction: TableSortDirection =
      this._sortKey() === column.key && this._sortDirection() === 'asc' ? 'desc' : 'asc';

    this._sortKey.set(column.key);
    this._sortDirection.set(direction);
    this.sortChange.emit({ key: column.key, direction });
  }

  private resolveAlign(column: TableColumn<T>): TableAlign {
    return column.align ?? 'left';
  }
}
