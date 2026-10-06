import * as _angular_core from '@angular/core';
import { EventEmitter } from '@angular/core';
import * as tailwind_variants from 'tailwind-variants';

declare enum TableSize {
    Sm = "sm",
    Md = "md",
    Lg = "lg"
}
type TableAlign = 'left' | 'center' | 'right';
type TableSortDirection = 'asc' | 'desc';
interface TableColumn<T> {
    key: keyof T;
    header: string;
    sortable?: boolean;
    align?: TableAlign;
}
interface TableSortEvent<T> {
    key: keyof T;
    direction: TableSortDirection;
}

declare class MrTable<T = unknown> {
    private readonly _columns;
    set columns(value: TableColumn<T>[]);
    get columns(): TableColumn<T>[];
    private readonly _rows;
    set rows(value: T[]);
    get rows(): T[];
    emptyMessage: string;
    private readonly _size;
    set size(value: `${TableSize}`);
    get size(): `${TableSize}`;
    readonly sortChange: EventEmitter<TableSortEvent<T>>;
    private readonly _sortKey;
    private readonly _sortDirection;
    protected readonly wrapperClass: _angular_core.Signal<string>;
    protected readonly tableClass: _angular_core.Signal<string>;
    protected readonly headerRowClass: _angular_core.Signal<string>;
    protected readonly bodyRowClass: _angular_core.Signal<string>;
    protected readonly emptyCellClass: _angular_core.Signal<string>;
    protected readonly sortedRows: _angular_core.Signal<T[]>;
    protected headerCellClass(column: TableColumn<T>): string;
    protected cellClass(column: TableColumn<T>): string;
    protected sortDirectionFor(column: TableColumn<T>): TableSortDirection | null;
    protected ariaSortFor(column: TableColumn<T>): 'ascending' | 'descending' | 'none';
    protected toggleSort(column: TableColumn<T>): void;
    private resolveAlign;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MrTable<any>, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<MrTable<any>, "mr-table", never, { "columns": { "alias": "columns"; "required": true; }; "rows": { "alias": "rows"; "required": false; }; "emptyMessage": { "alias": "emptyMessage"; "required": false; }; "size": { "alias": "size"; "required": false; }; }, { "sortChange": "sortChange"; }, never, never, true, never>;
}

declare const tableWrapperVariants: tailwind_variants.TVReturnType<{} | {} | {}, undefined, "w-full overflow-x-auto rounded-lg border border-neutral-200", {} | {}, undefined, tailwind_variants.TVReturnTypeLike<unknown, undefined>>;
declare const tableVariants: tailwind_variants.TVReturnType<{} | {} | {}, undefined, "w-full border-collapse text-left", {} | {}, undefined, tailwind_variants.TVReturnTypeLike<unknown, undefined>>;
declare const tableHeaderRowVariants: tailwind_variants.TVReturnType<{} | {} | {}, undefined, "border-b border-neutral-200 bg-neutral-25", {} | {}, undefined, tailwind_variants.TVReturnTypeLike<unknown, undefined>>;
declare const tableBodyRowVariants: tailwind_variants.TVReturnType<{} | {} | {}, undefined, "border-b border-neutral-100 last:border-b-0 hover:bg-neutral-25", {} | {}, undefined, tailwind_variants.TVReturnTypeLike<unknown, undefined>>;
declare const tableHeaderCellVariants: tailwind_variants.TVReturnType<{
    size: {
        sm: "px-sm py-2xs text-xs";
        md: "px-md py-xs text-sm";
        lg: "px-lg py-sm text-base";
    };
    align: {
        left: "text-left";
        center: "text-center";
        right: "text-right";
    };
    sortable: {
        true: "cursor-pointer select-none hover:text-neutral-700";
        false: "";
    };
}, undefined, "whitespace-nowrap font-sans font-medium text-neutral-500", {
    size: {
        sm: "px-sm py-2xs text-xs";
        md: "px-md py-xs text-sm";
        lg: "px-lg py-sm text-base";
    };
    align: {
        left: "text-left";
        center: "text-center";
        right: "text-right";
    };
    sortable: {
        true: "cursor-pointer select-none hover:text-neutral-700";
        false: "";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    size: {
        sm: "px-sm py-2xs text-xs";
        md: "px-md py-xs text-sm";
        lg: "px-lg py-sm text-base";
    };
    align: {
        left: "text-left";
        center: "text-center";
        right: "text-right";
    };
    sortable: {
        true: "cursor-pointer select-none hover:text-neutral-700";
        false: "";
    };
}, undefined>>;
declare const tableCellVariants: tailwind_variants.TVReturnType<{
    size: {
        sm: "px-sm py-2xs text-xs";
        md: "px-md py-xs text-sm";
        lg: "px-lg py-sm text-base";
    };
    align: {
        left: "text-left";
        center: "text-center";
        right: "text-right";
    };
}, undefined, "whitespace-nowrap font-sans text-neutral-700", {
    size: {
        sm: "px-sm py-2xs text-xs";
        md: "px-md py-xs text-sm";
        lg: "px-lg py-sm text-base";
    };
    align: {
        left: "text-left";
        center: "text-center";
        right: "text-right";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    size: {
        sm: "px-sm py-2xs text-xs";
        md: "px-md py-xs text-sm";
        lg: "px-lg py-sm text-base";
    };
    align: {
        left: "text-left";
        center: "text-center";
        right: "text-right";
    };
}, undefined>>;

export { MrTable, TableSize, tableBodyRowVariants, tableCellVariants, tableHeaderCellVariants, tableHeaderRowVariants, tableVariants, tableWrapperVariants };
export type { TableAlign, TableColumn, TableSortDirection, TableSortEvent };
