import * as i0 from '@angular/core';
import { inject, ViewContainerRef, signal, EventEmitter, computed, effect, Input, Output, ViewChild, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i1 from '@angular/cdk/a11y';
import { A11yModule } from '@angular/cdk/a11y';
import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { tv } from 'tailwind-variants';

var ModalSize;
(function (ModalSize) {
    ModalSize["Sm"] = "sm";
    ModalSize["Md"] = "md";
    ModalSize["Lg"] = "lg";
    ModalSize["Xl"] = "xl";
})(ModalSize || (ModalSize = {}));

const modalPanelVariants = tv({
    base: 'w-full rounded-lg bg-white p-lg shadow-2xl outline-none',
    variants: {
        size: {
            sm: 'max-w-sm',
            md: 'max-w-md',
            lg: 'max-w-lg',
            xl: 'max-w-xl',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

class MrModal {
    overlay = inject(Overlay);
    viewContainerRef = inject(ViewContainerRef);
    modalTemplate;
    _open = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_open" }] : /* istanbul ignore next */ []));
    set open(value) {
        this._open.set(value);
    }
    get open() {
        return this._open();
    }
    openChange = new EventEmitter();
    /** Allows disabling backdrop-click-to-close for "must choose an option" modals. */
    dismissible = true;
    _size = signal(ModalSize.Md, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_size" }] : /* istanbul ignore next */ []));
    set size(value) {
        this._size.set(value);
    }
    get size() {
        return this._size();
    }
    panelClass = computed(() => modalPanelVariants({ size: this._size() }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "panelClass" }] : /* istanbul ignore next */ []));
    overlayRef;
    previouslyFocusedElement;
    // Guards against a real crash: a consumer that conditionally instantiates `<mr-modal>` itself
    // (e.g. an `@if` wrapping it) with `[open]` already `true` on creation causes this constructor
    // effect's first flush to fire before Angular has resolved `@ViewChild('modalTemplate')` on the
    // brand-new instance, so `attach()` would otherwise run with an undefined template ref. `attach()`
    // no-ops until `ngAfterViewInit` flips this, which then performs the (now-safe) initial attach
    // itself if `open` was already true — no crash regardless of how a consumer mounts this component.
    viewReady = false;
    constructor() {
        effect(() => {
            if (this._open()) {
                this.attach();
            }
            else {
                this.detach();
            }
        });
    }
    ngAfterViewInit() {
        this.viewReady = true;
        if (this._open()) {
            this.attach();
        }
    }
    ngOnDestroy() {
        this.detach();
    }
    close() {
        this._open.set(false);
        this.openChange.emit(false);
    }
    attach() {
        if (this.overlayRef || !this.viewReady) {
            return;
        }
        // Captured here (rather than in ngOnInit) so it's always the element that was focused
        // right before *this particular* open, not just whatever had focus when the component
        // was constructed.
        this.previouslyFocusedElement = document.activeElement;
        this.overlayRef = this.overlay.create({
            positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-dark-backdrop',
        });
        this.overlayRef.backdropClick().subscribe(() => {
            if (this.dismissible) {
                this.close();
            }
        });
        this.overlayRef.attach(new TemplatePortal(this.modalTemplate, this.viewContainerRef));
    }
    detach() {
        if (!this.overlayRef) {
            return;
        }
        this.overlayRef.dispose();
        this.overlayRef = undefined;
        this.previouslyFocusedElement?.focus();
        this.previouslyFocusedElement = undefined;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrModal, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.1.6", type: MrModal, isStandalone: true, selector: "mr-modal", inputs: { open: "open", dismissible: "dismissible", size: "size" }, outputs: { openChange: "openChange" }, viewQueries: [{ propertyName: "modalTemplate", first: true, predicate: ["modalTemplate"], descendants: true }], ngImport: i0, template: "<ng-template #modalTemplate>\n  <div\n    role=\"dialog\"\n    aria-modal=\"true\"\n    tabindex=\"-1\"\n    cdkTrapFocus\n    cdkTrapFocusAutoCapture\n    [class]=\"panelClass()\"\n    (keydown.escape)=\"close()\"\n  >\n    <ng-content></ng-content>\n  </div>\n</ng-template>\n", dependencies: [{ kind: "ngmodule", type: A11yModule }, { kind: "directive", type: i1.CdkTrapFocus, selector: "[cdkTrapFocus]", inputs: ["cdkTrapFocus", "cdkTrapFocusAutoCapture"], exportAs: ["cdkTrapFocus"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrModal, decorators: [{
            type: Component,
            args: [{ selector: 'mr-modal', imports: [A11yModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template #modalTemplate>\n  <div\n    role=\"dialog\"\n    aria-modal=\"true\"\n    tabindex=\"-1\"\n    cdkTrapFocus\n    cdkTrapFocusAutoCapture\n    [class]=\"panelClass()\"\n    (keydown.escape)=\"close()\"\n  >\n    <ng-content></ng-content>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: () => [], propDecorators: { modalTemplate: [{
                type: ViewChild,
                args: ['modalTemplate']
            }], open: [{
                type: Input
            }], openChange: [{
                type: Output
            }], dismissible: [{
                type: Input
            }], size: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { ModalSize, MrModal, modalPanelVariants };
//# sourceMappingURL=meridian-ui-modal.mjs.map
