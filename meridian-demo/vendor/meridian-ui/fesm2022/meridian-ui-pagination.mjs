import * as i0 from '@angular/core';
import { signal, EventEmitter, computed, Input, Output, ChangeDetectionStrategy, Component } from '@angular/core';
import { MrIcon } from '@meridian/ui/icon';
import { tv } from 'tailwind-variants';

var PaginationSize;
(function (PaginationSize) {
    PaginationSize["Xs"] = "xs";
    PaginationSize["Sm"] = "sm";
    PaginationSize["Md"] = "md";
    PaginationSize["Lg"] = "lg";
    PaginationSize["Xl"] = "xl";
})(PaginationSize || (PaginationSize = {}));

const paginationNavVariants = tv({
    base: 'inline-flex items-center gap-2xs',
});
// Same fixed square footprint for a page number, prev/next, and the ellipsis placeholder, so a
// row of controls lines up evenly regardless of which kind of item sits in each slot.
const paginationButtonVariants = tv({
    base: 'inline-flex select-none items-center justify-center whitespace-nowrap rounded-md border border-transparent font-sans font-medium text-neutral-600 transition-colors duration-150 hover:bg-neutral-50 active:bg-neutral-100 focus-visible:outline focus-visible:outline-md focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:pointer-events-none disabled:opacity-40',
    variants: {
        size: {
            xs: 'h-7 w-7 text-xs',
            sm: 'h-8 w-8 text-sm',
            md: 'h-9 w-9 text-base',
            lg: 'h-10 w-10 text-md',
            xl: 'h-12 w-12 text-lg',
        },
        active: {
            true: 'border-transparent bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-600',
            false: '',
        },
    },
    defaultVariants: {
        size: 'md',
        active: false,
    },
});
const paginationEllipsisVariants = tv({
    base: 'inline-flex select-none items-center justify-center text-neutral-400',
    variants: {
        size: {
            xs: 'h-7 w-7',
            sm: 'h-8 w-8',
            md: 'h-9 w-9',
            lg: 'h-10 w-10',
            xl: 'h-12 w-12',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

function range(start, end) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
// The standard "windowed" pagination layout: always show the first and last page, a sibling on
// each side of the current page, and collapse whatever's left into a single ellipsis per side.
function buildPageItems(current, total) {
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
class MrPagination {
    _page = signal(1, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_page" }] : /* istanbul ignore next */ []));
    set page(value) {
        this._page.set(value);
    }
    get page() {
        return this._page();
    }
    pageChange = new EventEmitter();
    _totalPages = signal(1, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_totalPages" }] : /* istanbul ignore next */ []));
    set totalPages(value) {
        this._totalPages.set(value);
    }
    get totalPages() {
        return this._totalPages();
    }
    _size = signal(PaginationSize.Md, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_size" }] : /* istanbul ignore next */ []));
    set size(value) {
        this._size.set(value);
    }
    get size() {
        return this._size();
    }
    navClass = computed(() => paginationNavVariants(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "navClass" }] : /* istanbul ignore next */ []));
    ellipsisClass = computed(() => paginationEllipsisVariants({ size: this._size() }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "ellipsisClass" }] : /* istanbul ignore next */ []));
    pageItems = computed(() => buildPageItems(this._page(), this._totalPages()), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "pageItems" }] : /* istanbul ignore next */ []));
    isFirstPage = computed(() => this._page() <= 1, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isFirstPage" }] : /* istanbul ignore next */ []));
    isLastPage = computed(() => this._page() >= this._totalPages(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isLastPage" }] : /* istanbul ignore next */ []));
    pageButtonClass(item) {
        return paginationButtonVariants({ size: this._size(), active: item === this._page() });
    }
    navButtonClass() {
        return paginationButtonVariants({ size: this._size(), active: false });
    }
    goTo(target) {
        if (target < 1 || target > this._totalPages() || target === this._page()) {
            return;
        }
        this._page.set(target);
        this.pageChange.emit(target);
    }
    prev() {
        this.goTo(this._page() - 1);
    }
    next() {
        this.goTo(this._page() + 1);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrPagination, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.6", type: MrPagination, isStandalone: true, selector: "mr-pagination", inputs: { page: "page", totalPages: "totalPages", size: "size" }, outputs: { pageChange: "pageChange" }, ngImport: i0, template: "<nav [class]=\"navClass()\" aria-label=\"Pagination\">\n  <button type=\"button\" [class]=\"navButtonClass()\" [disabled]=\"isFirstPage()\" aria-label=\"Previous page\" (click)=\"prev()\">\n    <mr-icon name=\"chevronLeft\" [size]=\"size\" />\n  </button>\n\n  @for (item of pageItems(); track $index) {\n    @if (item === 'ellipsis') {\n      <span [class]=\"ellipsisClass()\" aria-hidden=\"true\">\n        <mr-icon name=\"moreHorizontal\" [size]=\"size\" />\n      </span>\n    } @else {\n      <button\n        type=\"button\"\n        [class]=\"pageButtonClass(item)\"\n        [attr.aria-current]=\"item === page ? 'page' : null\"\n        [attr.aria-label]=\"'Page ' + item\"\n        (click)=\"goTo(item)\"\n      >\n        {{ item }}\n      </button>\n    }\n  }\n\n  <button type=\"button\" [class]=\"navButtonClass()\" [disabled]=\"isLastPage()\" aria-label=\"Next page\" (click)=\"next()\">\n    <mr-icon name=\"chevronRight\" [size]=\"size\" />\n  </button>\n</nav>\n", dependencies: [{ kind: "component", type: MrIcon, selector: "mr-icon", inputs: ["name", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrPagination, decorators: [{
            type: Component,
            args: [{ selector: 'mr-pagination', imports: [MrIcon], changeDetection: ChangeDetectionStrategy.OnPush, template: "<nav [class]=\"navClass()\" aria-label=\"Pagination\">\n  <button type=\"button\" [class]=\"navButtonClass()\" [disabled]=\"isFirstPage()\" aria-label=\"Previous page\" (click)=\"prev()\">\n    <mr-icon name=\"chevronLeft\" [size]=\"size\" />\n  </button>\n\n  @for (item of pageItems(); track $index) {\n    @if (item === 'ellipsis') {\n      <span [class]=\"ellipsisClass()\" aria-hidden=\"true\">\n        <mr-icon name=\"moreHorizontal\" [size]=\"size\" />\n      </span>\n    } @else {\n      <button\n        type=\"button\"\n        [class]=\"pageButtonClass(item)\"\n        [attr.aria-current]=\"item === page ? 'page' : null\"\n        [attr.aria-label]=\"'Page ' + item\"\n        (click)=\"goTo(item)\"\n      >\n        {{ item }}\n      </button>\n    }\n  }\n\n  <button type=\"button\" [class]=\"navButtonClass()\" [disabled]=\"isLastPage()\" aria-label=\"Next page\" (click)=\"next()\">\n    <mr-icon name=\"chevronRight\" [size]=\"size\" />\n  </button>\n</nav>\n" }]
        }], propDecorators: { page: [{
                type: Input
            }], pageChange: [{
                type: Output
            }], totalPages: [{
                type: Input,
                args: [{ required: true }]
            }], size: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { MrPagination, PaginationSize, paginationButtonVariants, paginationEllipsisVariants, paginationNavVariants };
//# sourceMappingURL=meridian-ui-pagination.mjs.map
