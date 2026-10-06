import * as _angular_core from '@angular/core';
import { EventEmitter } from '@angular/core';
import * as tailwind_variants from 'tailwind-variants';

declare enum PaginationSize {
    Xs = "xs",
    Sm = "sm",
    Md = "md",
    Lg = "lg",
    Xl = "xl"
}

type PageItem = number | 'ellipsis';
declare class MrPagination {
    private readonly _page;
    set page(value: number);
    get page(): number;
    readonly pageChange: EventEmitter<number>;
    private readonly _totalPages;
    set totalPages(value: number);
    get totalPages(): number;
    private readonly _size;
    set size(value: `${PaginationSize}`);
    get size(): `${PaginationSize}`;
    protected readonly navClass: _angular_core.Signal<string>;
    protected readonly ellipsisClass: _angular_core.Signal<string>;
    protected readonly pageItems: _angular_core.Signal<PageItem[]>;
    protected readonly isFirstPage: _angular_core.Signal<boolean>;
    protected readonly isLastPage: _angular_core.Signal<boolean>;
    protected pageButtonClass(item: number): string;
    protected navButtonClass(): string;
    protected goTo(target: number): void;
    protected prev(): void;
    protected next(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MrPagination, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<MrPagination, "mr-pagination", never, { "page": { "alias": "page"; "required": false; }; "totalPages": { "alias": "totalPages"; "required": true; }; "size": { "alias": "size"; "required": false; }; }, { "pageChange": "pageChange"; }, never, never, true, never>;
}

declare const paginationNavVariants: tailwind_variants.TVReturnType<{} | {} | {}, undefined, "inline-flex items-center gap-2xs", {} | {}, undefined, tailwind_variants.TVReturnTypeLike<unknown, undefined>>;
declare const paginationButtonVariants: tailwind_variants.TVReturnType<{
    size: {
        xs: "h-7 w-7 text-xs";
        sm: "h-8 w-8 text-sm";
        md: "h-9 w-9 text-base";
        lg: "h-10 w-10 text-md";
        xl: "h-12 w-12 text-lg";
    };
    active: {
        true: "border-transparent bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-600";
        false: "";
    };
}, undefined, "inline-flex select-none items-center justify-center whitespace-nowrap rounded-md border border-transparent font-sans font-medium text-neutral-600 transition-colors duration-150 hover:bg-neutral-50 active:bg-neutral-100 focus-visible:outline focus-visible:outline-md focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:pointer-events-none disabled:opacity-40", {
    size: {
        xs: "h-7 w-7 text-xs";
        sm: "h-8 w-8 text-sm";
        md: "h-9 w-9 text-base";
        lg: "h-10 w-10 text-md";
        xl: "h-12 w-12 text-lg";
    };
    active: {
        true: "border-transparent bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-600";
        false: "";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    size: {
        xs: "h-7 w-7 text-xs";
        sm: "h-8 w-8 text-sm";
        md: "h-9 w-9 text-base";
        lg: "h-10 w-10 text-md";
        xl: "h-12 w-12 text-lg";
    };
    active: {
        true: "border-transparent bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-600";
        false: "";
    };
}, undefined>>;
declare const paginationEllipsisVariants: tailwind_variants.TVReturnType<{
    size: {
        xs: "h-7 w-7";
        sm: "h-8 w-8";
        md: "h-9 w-9";
        lg: "h-10 w-10";
        xl: "h-12 w-12";
    };
}, undefined, "inline-flex select-none items-center justify-center text-neutral-400", {
    size: {
        xs: "h-7 w-7";
        sm: "h-8 w-8";
        md: "h-9 w-9";
        lg: "h-10 w-10";
        xl: "h-12 w-12";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    size: {
        xs: "h-7 w-7";
        sm: "h-8 w-8";
        md: "h-9 w-9";
        lg: "h-10 w-10";
        xl: "h-12 w-12";
    };
}, undefined>>;

export { MrPagination, PaginationSize, paginationButtonVariants, paginationEllipsisVariants, paginationNavVariants };
