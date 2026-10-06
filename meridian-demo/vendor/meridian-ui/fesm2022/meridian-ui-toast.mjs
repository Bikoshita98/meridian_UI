import * as i0 from '@angular/core';
import { EventEmitter, Output, Input, ChangeDetectionStrategy, Component, signal, Injectable, inject, ViewContainerRef, ViewChild } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MrIcon } from '@meridian/ui/icon';
import { tv } from 'tailwind-variants';

var ToastStatus;
(function (ToastStatus) {
    ToastStatus["Info"] = "info";
    ToastStatus["Success"] = "success";
    ToastStatus["Warning"] = "warning";
    ToastStatus["Error"] = "error";
})(ToastStatus || (ToastStatus = {}));

const toastVariants = tv({
    base: 'pointer-events-auto flex w-80 items-start gap-xs rounded-lg border bg-white p-md shadow-lg',
    variants: {
        status: {
            info: 'border-info-300',
            success: 'border-success-300',
            warning: 'border-warning-300',
            error: 'border-error-300',
        },
    },
    defaultVariants: {
        status: 'info',
    },
});
const toastIconVariants = tv({
    base: 'mt-3xs shrink-0',
    variants: {
        status: {
            info: 'text-info-500',
            success: 'text-success-500',
            warning: 'text-warning-500',
            error: 'text-error-500',
        },
    },
    defaultVariants: {
        status: 'info',
    },
});
const toastMessageVariants = tv({
    base: 'flex-1 pt-3xs text-sm text-neutral-700',
});
const toastCloseButtonVariants = tv({
    base: 'mt-3xs shrink-0 rounded-sm text-neutral-400 transition-colors duration-150 hover:text-neutral-600 focus-visible:outline focus-visible:outline-md focus-visible:outline-offset-2 focus-visible:outline-primary-500',
});
// The container's own positioning wrapper: click-through everywhere except where an actual toast
// card sits (each card opts back in via `toastVariants`' own `pointer-events-auto`).
const toastListVariants = tv({
    base: 'pointer-events-none flex flex-col gap-sm',
});

const STATUS_ICON = {
    info: 'info',
    success: 'check',
    warning: 'alertTriangle',
    error: 'alertCircle',
};
class MrToast {
    toast;
    dismissed = new EventEmitter();
    messageClass = toastMessageVariants();
    closeButtonClass = toastCloseButtonVariants();
    timeoutId;
    toastClass() {
        return toastVariants({ status: this.toast.status });
    }
    iconClass() {
        return toastIconVariants({ status: this.toast.status });
    }
    iconName() {
        return STATUS_ICON[this.toast.status];
    }
    role() {
        return this.toast.status === ToastStatus.Error ? 'alert' : 'status';
    }
    ngOnInit() {
        if (this.toast.duration > 0) {
            this.timeoutId = setTimeout(() => this.dismissed.emit(), this.toast.duration);
        }
    }
    ngOnDestroy() {
        if (this.timeoutId !== undefined) {
            clearTimeout(this.timeoutId);
        }
    }
    dismiss() {
        this.dismissed.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrToast, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.1.6", type: MrToast, isStandalone: true, selector: "mr-toast", inputs: { toast: "toast" }, outputs: { dismissed: "dismissed" }, ngImport: i0, template: "<div [class]=\"toastClass()\" [attr.role]=\"role()\" [attr.aria-live]=\"role() === 'alert' ? 'assertive' : 'polite'\">\n  <mr-icon [name]=\"iconName()\" size=\"sm\" [class]=\"iconClass()\" />\n  <span [class]=\"messageClass\">{{ toast.message }}</span>\n  <button type=\"button\" [class]=\"closeButtonClass\" aria-label=\"Dismiss\" (click)=\"dismiss()\">\n    <mr-icon name=\"x\" size=\"sm\" />\n  </button>\n</div>\n", dependencies: [{ kind: "component", type: MrIcon, selector: "mr-icon", inputs: ["name", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrToast, decorators: [{
            type: Component,
            args: [{ selector: 'mr-toast', imports: [MrIcon], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [class]=\"toastClass()\" [attr.role]=\"role()\" [attr.aria-live]=\"role() === 'alert' ? 'assertive' : 'polite'\">\n  <mr-icon [name]=\"iconName()\" size=\"sm\" [class]=\"iconClass()\" />\n  <span [class]=\"messageClass\">{{ toast.message }}</span>\n  <button type=\"button\" [class]=\"closeButtonClass\" aria-label=\"Dismiss\" (click)=\"dismiss()\">\n    <mr-icon name=\"x\" size=\"sm\" />\n  </button>\n</div>\n" }]
        }], propDecorators: { toast: [{
                type: Input,
                args: [{ required: true }]
            }], dismissed: [{
                type: Output
            }] } });

const DEFAULT_DURATION_MS = 5000;
/**
 * Toasts are triggered imperatively from anywhere in an app (a click handler, an HTTP error
 * interceptor, ...), not placed in a template like every other component — so this is a service,
 * not a component. Mount an `<mr-toast-container>` once (e.g. at the app root) to actually render
 * whatever this service queues up.
 */
class MrToastService {
    _toasts = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_toasts" }] : /* istanbul ignore next */ []));
    toasts = this._toasts.asReadonly();
    nextId = 0;
    /** Returns the new toast's id, so a caller can `dismiss()` it early if it needs to. */
    show(message, options = {}) {
        const id = this.nextId++;
        this._toasts.update((toasts) => [
            ...toasts,
            {
                id,
                message,
                status: options.status ?? ToastStatus.Info,
                duration: options.duration ?? DEFAULT_DURATION_MS,
            },
        ]);
        return id;
    }
    dismiss(id) {
        this._toasts.update((toasts) => toasts.filter((toast) => toast.id !== id));
    }
    clear() {
        this._toasts.set([]);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrToastService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrToastService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrToastService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

// Matches the `lg` semantic spacing token (16px) — CDK's global position strategy takes a raw CSS
// length, not a Tailwind class, so it can't reference that token by name the way a template can.
const CONTAINER_OFFSET = '16px';
/**
 * Mount exactly one of these (e.g. at the app root) to render whatever `MrToastService` queues
 * up. Built on CDK Overlay's imperative API, same as `modal` — not for a backdrop or connected
 * positioning (a toast needs neither), but so it shares the same overlay stacking layer and
 * reliably renders above a `modal`/`dropdown`/`select` panel rather than under one.
 */
class MrToastContainer {
    overlay = inject(Overlay);
    viewContainerRef = inject(ViewContainerRef);
    toastService = inject(MrToastService);
    containerTemplate;
    listClass = toastListVariants();
    overlayRef;
    ngOnInit() {
        this.overlayRef = this.overlay.create({
            positionStrategy: this.overlay.position().global().top(CONTAINER_OFFSET).right(CONTAINER_OFFSET),
        });
        this.overlayRef.attach(new TemplatePortal(this.containerTemplate, this.viewContainerRef));
    }
    ngOnDestroy() {
        this.overlayRef?.dispose();
        this.overlayRef = undefined;
    }
    dismiss(id) {
        this.toastService.dismiss(id);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrToastContainer, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.6", type: MrToastContainer, isStandalone: true, selector: "mr-toast-container", viewQueries: [{ propertyName: "containerTemplate", first: true, predicate: ["containerTemplate"], descendants: true, static: true }], ngImport: i0, template: "<ng-template #containerTemplate>\n  <div [class]=\"listClass\">\n    @for (toast of toastService.toasts(); track toast.id) {\n      <mr-toast [toast]=\"toast\" (dismissed)=\"dismiss(toast.id)\" />\n    }\n  </div>\n</ng-template>\n", dependencies: [{ kind: "component", type: MrToast, selector: "mr-toast", inputs: ["toast"], outputs: ["dismissed"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrToastContainer, decorators: [{
            type: Component,
            args: [{ selector: 'mr-toast-container', imports: [MrToast], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template #containerTemplate>\n  <div [class]=\"listClass\">\n    @for (toast of toastService.toasts(); track toast.id) {\n      <mr-toast [toast]=\"toast\" (dismissed)=\"dismiss(toast.id)\" />\n    }\n  </div>\n</ng-template>\n" }]
        }], propDecorators: { containerTemplate: [{
                type: ViewChild,
                args: ['containerTemplate', { static: true }]
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { MrToast, MrToastContainer, MrToastService, ToastStatus, toastCloseButtonVariants, toastIconVariants, toastListVariants, toastMessageVariants, toastVariants };
//# sourceMappingURL=meridian-ui-toast.mjs.map
