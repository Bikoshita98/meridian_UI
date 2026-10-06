import * as i0 from '@angular/core';
import { signal, computed, Input, ViewChild, ChangeDetectionStrategy, Component, inject, Injector, contentChildren, afterNextRender } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { tv } from 'tailwind-variants';
import { FocusKeyManager } from '@angular/cdk/a11y';
import * as i1 from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';

var DropdownPosition;
(function (DropdownPosition) {
    DropdownPosition["BottomStart"] = "bottom-start";
    DropdownPosition["BottomEnd"] = "bottom-end";
    DropdownPosition["TopStart"] = "top-start";
    DropdownPosition["TopEnd"] = "top-end";
})(DropdownPosition || (DropdownPosition = {}));

const dropdownPanelVariants = tv({
    base: 'min-w-40 rounded-md border border-neutral-200 bg-white p-3xs shadow-lg',
});
const dropdownItemVariants = tv({
    base: 'flex w-full items-center gap-xs rounded-sm px-sm py-xs text-left font-sans text-base text-neutral-700 outline-none transition-colors duration-150 hover:bg-primary-25 focus-visible:bg-primary-25 disabled:cursor-not-allowed disabled:text-neutral-300 disabled:hover:bg-transparent',
});
/** Each position tries its preferred side first, then falls back to flipping vertically if it doesn't fit. */
const DROPDOWN_POSITIONS = {
    [DropdownPosition.BottomStart]: [
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
        { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
    ],
    [DropdownPosition.BottomEnd]: [
        { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 4 },
        { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -4 },
    ],
    [DropdownPosition.TopStart]: [
        { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
    ],
    [DropdownPosition.TopEnd]: [
        { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -4 },
        { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 4 },
    ],
};

/** One item inside an `<mr-dropdown>` panel. Implements `FocusableOption` so `MrDropdown`'s `FocusKeyManager` can move focus onto it. */
class MrDropdownItem {
    buttonRef;
    _disabled = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_disabled" }] : /* istanbul ignore next */ []));
    set disabled(value) {
        this._disabled.set(coerceBooleanProperty(value));
    }
    get disabled() {
        return this._disabled();
    }
    itemClass = computed(() => dropdownItemVariants(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "itemClass" }] : /* istanbul ignore next */ []));
    focus() {
        this.buttonRef.nativeElement.focus();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrDropdownItem, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.1.6", type: MrDropdownItem, isStandalone: true, selector: "mr-dropdown-item", inputs: { disabled: "disabled" }, viewQueries: [{ propertyName: "buttonRef", first: true, predicate: ["button"], descendants: true, static: true }], ngImport: i0, template: "<button #button type=\"button\" role=\"menuitem\" [class]=\"itemClass()\" [disabled]=\"disabled\">\n  <ng-content></ng-content>\n</button>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrDropdownItem, decorators: [{
            type: Component,
            args: [{ selector: 'mr-dropdown-item', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button #button type=\"button\" role=\"menuitem\" [class]=\"itemClass()\" [disabled]=\"disabled\">\n  <ng-content></ng-content>\n</button>\n" }]
        }], propDecorators: { buttonRef: [{
                type: ViewChild,
                args: ['button', { static: true }]
            }], disabled: [{
                type: Input
            }] } });

class MrDropdown {
    injector = inject(Injector);
    _position = signal(DropdownPosition.BottomStart, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_position" }] : /* istanbul ignore next */ []));
    set position(value) {
        this._position.set(value);
    }
    get position() {
        return this._position();
    }
    isOpen = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isOpen" }] : /* istanbul ignore next */ []));
    positions = computed(() => DROPDOWN_POSITIONS[this._position()], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "positions" }] : /* istanbul ignore next */ []));
    panelClass = computed(() => dropdownPanelVariants(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "panelClass" }] : /* istanbul ignore next */ []));
    items = contentChildren(MrDropdownItem, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "items" }] : /* istanbul ignore next */ []));
    // The manager subscribes to `items` (a signal) internally via `injector` — no manual re-wiring
    // needed when the projected item list changes.
    keyManager = new FocusKeyManager(this.items, this.injector)
        .withVerticalOrientation()
        .withWrap()
        .withHomeAndEnd();
    toggle() {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    }
    open() {
        this.isOpen.set(true);
        // The panel's DOM (and its projected items) doesn't exist until this change is rendered —
        // cdkConnectedOverlay's <ng-template> is deferred, same as *ngIf.
        afterNextRender(() => this.keyManager.setFirstItemActive(), { injector: this.injector });
    }
    close() {
        this.isOpen.set(false);
    }
    handleMenuKeydown(event) {
        this.keyManager.onKeydown(event);
    }
    handlePanelClick(event) {
        // Only an actual item's button click should close the menu — not a click on the panel's own padding.
        if (event.target.closest('button')) {
            this.close();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrDropdown, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "22.1.6", type: MrDropdown, isStandalone: true, selector: "mr-dropdown", inputs: { position: "position" }, queries: [{ propertyName: "items", predicate: MrDropdownItem, isSignal: true }], ngImport: i0, template: "<span #origin=\"cdkOverlayOrigin\" cdkOverlayOrigin class=\"inline-flex\" (click)=\"toggle()\">\n  <ng-content></ng-content>\n</span>\n\n<ng-template\n  cdkConnectedOverlay\n  [cdkConnectedOverlayOrigin]=\"origin\"\n  [cdkConnectedOverlayOpen]=\"isOpen()\"\n  [cdkConnectedOverlayPositions]=\"positions()\"\n  [cdkConnectedOverlayHasBackdrop]=\"true\"\n  cdkConnectedOverlayBackdropClass=\"cdk-overlay-transparent-backdrop\"\n  (backdropClick)=\"close()\"\n  (detach)=\"close()\"\n>\n  <div\n    role=\"menu\"\n    [class]=\"panelClass()\"\n    (keydown)=\"handleMenuKeydown($event)\"\n    (keydown.escape)=\"close()\"\n    (click)=\"handlePanelClick($event)\"\n  >\n    <ng-content select=\"mr-dropdown-item\"></ng-content>\n  </div>\n</ng-template>\n", dependencies: [{ kind: "ngmodule", type: OverlayModule }, { kind: "directive", type: i1.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush", "cdkConnectedOverlayDisposeOnNavigation", "cdkConnectedOverlayUsePopover", "cdkConnectedOverlayMatchWidth", "cdkConnectedOverlay"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i1.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrDropdown, decorators: [{
            type: Component,
            args: [{ selector: 'mr-dropdown', imports: [OverlayModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span #origin=\"cdkOverlayOrigin\" cdkOverlayOrigin class=\"inline-flex\" (click)=\"toggle()\">\n  <ng-content></ng-content>\n</span>\n\n<ng-template\n  cdkConnectedOverlay\n  [cdkConnectedOverlayOrigin]=\"origin\"\n  [cdkConnectedOverlayOpen]=\"isOpen()\"\n  [cdkConnectedOverlayPositions]=\"positions()\"\n  [cdkConnectedOverlayHasBackdrop]=\"true\"\n  cdkConnectedOverlayBackdropClass=\"cdk-overlay-transparent-backdrop\"\n  (backdropClick)=\"close()\"\n  (detach)=\"close()\"\n>\n  <div\n    role=\"menu\"\n    [class]=\"panelClass()\"\n    (keydown)=\"handleMenuKeydown($event)\"\n    (keydown.escape)=\"close()\"\n    (click)=\"handlePanelClick($event)\"\n  >\n    <ng-content select=\"mr-dropdown-item\"></ng-content>\n  </div>\n</ng-template>\n" }]
        }], propDecorators: { position: [{
                type: Input
            }], items: [{ type: i0.ContentChildren, args: [i0.forwardRef(() => MrDropdownItem), { isSignal: true }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { DROPDOWN_POSITIONS, DropdownPosition, MrDropdown, MrDropdownItem, dropdownItemVariants, dropdownPanelVariants };
//# sourceMappingURL=meridian-ui-dropdown.mjs.map
