import * as i0 from '@angular/core';
import { signal, EventEmitter, computed, Output, Input, ChangeDetectionStrategy, Component } from '@angular/core';
import { MrIcon } from '@meridian/ui/icon';
import { tv } from 'tailwind-variants';

var TableSize;
(function (TableSize) {
    TableSize["Sm"] = "sm";
    TableSize["Md"] = "md";
    TableSize["Lg"] = "lg";
})(TableSize || (TableSize = {}));

const tableWrapperVariants = tv({
    base: 'w-full overflow-x-auto rounded-lg border border-neutral-200',
});
const tableVariants = tv({
    base: 'w-full border-collapse text-left',
});
const tableHeaderRowVariants = tv({
    base: 'border-b border-neutral-200 bg-neutral-25',
});
const tableBodyRowVariants = tv({
    base: 'border-b border-neutral-100 last:border-b-0 hover:bg-neutral-25',
});
const tableHeaderCellVariants = tv({
    base: 'whitespace-nowrap font-sans font-medium text-neutral-500',
    variants: {
        size: {
            sm: 'px-sm py-2xs text-xs',
            md: 'px-md py-xs text-sm',
            lg: 'px-lg py-sm text-base',
        },
        align: {
            left: 'text-left',
            center: 'text-center',
            right: 'text-right',
        },
        sortable: {
            true: 'cursor-pointer select-none hover:text-neutral-700',
            false: '',
        },
    },
    defaultVariants: {
        size: 'md',
        align: 'left',
        sortable: false,
    },
});
const tableCellVariants = tv({
    base: 'whitespace-nowrap font-sans text-neutral-700',
    variants: {
        size: {
            sm: 'px-sm py-2xs text-xs',
            md: 'px-md py-xs text-sm',
            lg: 'px-lg py-sm text-base',
        },
        align: {
            left: 'text-left',
            center: 'text-center',
            right: 'text-right',
        },
    },
    defaultVariants: {
        size: 'md',
        align: 'left',
    },
});

// A generic default comparator good enough for the primitive column values (string/number/Date)
// a data table actually renders — `<`/`>` already do the right thing for all three.
function defaultCompare(a, b) {
    if (a === b) {
        return 0;
    }
    return a < b ? -1 : 1;
}
class MrTable {
    _columns = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_columns" }] : /* istanbul ignore next */ []));
    set columns(value) {
        this._columns.set(value);
    }
    get columns() {
        return this._columns();
    }
    _rows = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_rows" }] : /* istanbul ignore next */ []));
    set rows(value) {
        this._rows.set(value);
    }
    get rows() {
        return this._rows();
    }
    emptyMessage = 'No data available';
    _size = signal(TableSize.Md, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_size" }] : /* istanbul ignore next */ []));
    set size(value) {
        this._size.set(value);
    }
    get size() {
        return this._size();
    }
    sortChange = new EventEmitter();
    _sortKey = signal(undefined, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_sortKey" }] : /* istanbul ignore next */ []));
    _sortDirection = signal('asc', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_sortDirection" }] : /* istanbul ignore next */ []));
    wrapperClass = computed(() => tableWrapperVariants(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "wrapperClass" }] : /* istanbul ignore next */ []));
    tableClass = computed(() => tableVariants(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tableClass" }] : /* istanbul ignore next */ []));
    headerRowClass = computed(() => tableHeaderRowVariants(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "headerRowClass" }] : /* istanbul ignore next */ []));
    bodyRowClass = computed(() => tableBodyRowVariants(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "bodyRowClass" }] : /* istanbul ignore next */ []));
    emptyCellClass = computed(() => tableCellVariants({ size: this._size(), align: 'center' }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "emptyCellClass" }] : /* istanbul ignore next */ []));
    sortedRows = computed(() => {
        const key = this._sortKey();
        if (key === undefined) {
            return this._rows();
        }
        const direction = this._sortDirection();
        const factor = direction === 'asc' ? 1 : -1;
        return [...this._rows()].sort((a, b) => defaultCompare(a[key], b[key]) * factor);
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "sortedRows" }] : /* istanbul ignore next */ []));
    headerCellClass(column) {
        return tableHeaderCellVariants({
            size: this._size(),
            align: this.resolveAlign(column),
            sortable: !!column.sortable,
        });
    }
    cellClass(column) {
        return tableCellVariants({ size: this._size(), align: this.resolveAlign(column) });
    }
    sortDirectionFor(column) {
        return this._sortKey() === column.key ? this._sortDirection() : null;
    }
    ariaSortFor(column) {
        const direction = this.sortDirectionFor(column);
        if (direction === 'asc') {
            return 'ascending';
        }
        if (direction === 'desc') {
            return 'descending';
        }
        return 'none';
    }
    toggleSort(column) {
        if (!column.sortable) {
            return;
        }
        const direction = this._sortKey() === column.key && this._sortDirection() === 'asc' ? 'desc' : 'asc';
        this._sortKey.set(column.key);
        this._sortDirection.set(direction);
        this.sortChange.emit({ key: column.key, direction });
    }
    resolveAlign(column) {
        return column.align ?? 'left';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrTable, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.6", type: MrTable, isStandalone: true, selector: "mr-table", inputs: { columns: "columns", rows: "rows", emptyMessage: "emptyMessage", size: "size" }, outputs: { sortChange: "sortChange" }, ngImport: i0, template: "<div [class]=\"wrapperClass()\">\n  <table [class]=\"tableClass()\">\n    <thead>\n      <tr [class]=\"headerRowClass()\">\n        @for (column of columns; track column.key) {\n          <th\n            scope=\"col\"\n            [class]=\"headerCellClass(column)\"\n            [attr.aria-sort]=\"column.sortable ? ariaSortFor(column) : null\"\n            (click)=\"toggleSort(column)\"\n          >\n            <span class=\"inline-flex items-center gap-3xs\">\n              {{ column.header }}\n              @if (column.sortable) {\n                <mr-icon\n                  [name]=\"sortDirectionFor(column) === 'desc' ? 'chevronDown' : 'chevronUp'\"\n                  size=\"xs\"\n                  [class.opacity-30]=\"sortDirectionFor(column) === null\"\n                />\n              }\n            </span>\n          </th>\n        }\n      </tr>\n    </thead>\n    <tbody>\n      @if (sortedRows().length === 0) {\n        <tr>\n          <td [attr.colspan]=\"columns.length\" [class]=\"emptyCellClass()\">{{ emptyMessage }}</td>\n        </tr>\n      } @else {\n        @for (row of sortedRows(); track $index) {\n          <tr [class]=\"bodyRowClass()\">\n            @for (column of columns; track column.key) {\n              <td [class]=\"cellClass(column)\">{{ row[column.key] }}</td>\n            }\n          </tr>\n        }\n      }\n    </tbody>\n  </table>\n</div>\n", dependencies: [{ kind: "component", type: MrIcon, selector: "mr-icon", inputs: ["name", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrTable, decorators: [{
            type: Component,
            args: [{ selector: 'mr-table', imports: [MrIcon], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [class]=\"wrapperClass()\">\n  <table [class]=\"tableClass()\">\n    <thead>\n      <tr [class]=\"headerRowClass()\">\n        @for (column of columns; track column.key) {\n          <th\n            scope=\"col\"\n            [class]=\"headerCellClass(column)\"\n            [attr.aria-sort]=\"column.sortable ? ariaSortFor(column) : null\"\n            (click)=\"toggleSort(column)\"\n          >\n            <span class=\"inline-flex items-center gap-3xs\">\n              {{ column.header }}\n              @if (column.sortable) {\n                <mr-icon\n                  [name]=\"sortDirectionFor(column) === 'desc' ? 'chevronDown' : 'chevronUp'\"\n                  size=\"xs\"\n                  [class.opacity-30]=\"sortDirectionFor(column) === null\"\n                />\n              }\n            </span>\n          </th>\n        }\n      </tr>\n    </thead>\n    <tbody>\n      @if (sortedRows().length === 0) {\n        <tr>\n          <td [attr.colspan]=\"columns.length\" [class]=\"emptyCellClass()\">{{ emptyMessage }}</td>\n        </tr>\n      } @else {\n        @for (row of sortedRows(); track $index) {\n          <tr [class]=\"bodyRowClass()\">\n            @for (column of columns; track column.key) {\n              <td [class]=\"cellClass(column)\">{{ row[column.key] }}</td>\n            }\n          </tr>\n        }\n      }\n    </tbody>\n  </table>\n</div>\n" }]
        }], propDecorators: { columns: [{
                type: Input,
                args: [{ required: true }]
            }], rows: [{
                type: Input
            }], emptyMessage: [{
                type: Input
            }], size: [{
                type: Input
            }], sortChange: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { MrTable, TableSize, tableBodyRowVariants, tableCellVariants, tableHeaderCellVariants, tableHeaderRowVariants, tableVariants, tableWrapperVariants };
//# sourceMappingURL=meridian-ui-table.mjs.map
