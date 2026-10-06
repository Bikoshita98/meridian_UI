import * as i0 from '@angular/core';
import { OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { MrIconName } from '@meridian/ui/icon';
import * as tailwind_variants from 'tailwind-variants';

declare enum ToastStatus {
    Info = "info",
    Success = "success",
    Warning = "warning",
    Error = "error"
}
interface ToastOptions {
    status?: `${ToastStatus}`;
    /** Milliseconds before auto-dismissing. `0` (or omitted with a falsy override) means "no auto-dismiss". */
    duration?: number;
}
interface ToastRef {
    id: number;
    message: string;
    status: `${ToastStatus}`;
    duration: number;
}

/**
 * Toasts are triggered imperatively from anywhere in an app (a click handler, an HTTP error
 * interceptor, ...), not placed in a template like every other component — so this is a service,
 * not a component. Mount an `<mr-toast-container>` once (e.g. at the app root) to actually render
 * whatever this service queues up.
 */
declare class MrToastService {
    private readonly _toasts;
    readonly toasts: i0.Signal<ToastRef[]>;
    private nextId;
    /** Returns the new toast's id, so a caller can `dismiss()` it early if it needs to. */
    show(message: string, options?: ToastOptions): number;
    dismiss(id: number): void;
    clear(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MrToastService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<any>;
}

/**
 * Mount exactly one of these (e.g. at the app root) to render whatever `MrToastService` queues
 * up. Built on CDK Overlay's imperative API, same as `modal` — not for a backdrop or connected
 * positioning (a toast needs neither), but so it shares the same overlay stacking layer and
 * reliably renders above a `modal`/`dropdown`/`select` panel rather than under one.
 */
declare class MrToastContainer implements OnInit, OnDestroy {
    private readonly overlay;
    private readonly viewContainerRef;
    protected readonly toastService: MrToastService;
    private readonly containerTemplate;
    protected readonly listClass: string;
    private overlayRef?;
    ngOnInit(): void;
    ngOnDestroy(): void;
    protected dismiss(id: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MrToastContainer, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MrToastContainer, "mr-toast-container", never, {}, {}, never, never, true, never>;
}

declare class MrToast implements OnInit, OnDestroy {
    toast: ToastRef;
    readonly dismissed: EventEmitter<void>;
    protected readonly messageClass: string;
    protected readonly closeButtonClass: string;
    private timeoutId?;
    protected toastClass(): string;
    protected iconClass(): string;
    protected iconName(): MrIconName;
    protected role(): 'alert' | 'status';
    ngOnInit(): void;
    ngOnDestroy(): void;
    protected dismiss(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MrToast, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MrToast, "mr-toast", never, { "toast": { "alias": "toast"; "required": true; }; }, { "dismissed": "dismissed"; }, never, never, true, never>;
}

declare const toastVariants: tailwind_variants.TVReturnType<{
    status: {
        info: "border-info-300";
        success: "border-success-300";
        warning: "border-warning-300";
        error: "border-error-300";
    };
}, undefined, "pointer-events-auto flex w-80 items-start gap-xs rounded-lg border bg-white p-md shadow-lg", {
    status: {
        info: "border-info-300";
        success: "border-success-300";
        warning: "border-warning-300";
        error: "border-error-300";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    status: {
        info: "border-info-300";
        success: "border-success-300";
        warning: "border-warning-300";
        error: "border-error-300";
    };
}, undefined>>;
declare const toastIconVariants: tailwind_variants.TVReturnType<{
    status: {
        info: "text-info-500";
        success: "text-success-500";
        warning: "text-warning-500";
        error: "text-error-500";
    };
}, undefined, "mt-3xs shrink-0", {
    status: {
        info: "text-info-500";
        success: "text-success-500";
        warning: "text-warning-500";
        error: "text-error-500";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    status: {
        info: "text-info-500";
        success: "text-success-500";
        warning: "text-warning-500";
        error: "text-error-500";
    };
}, undefined>>;
declare const toastMessageVariants: tailwind_variants.TVReturnType<{} | {} | {}, undefined, "flex-1 pt-3xs text-sm text-neutral-700", {} | {}, undefined, tailwind_variants.TVReturnTypeLike<unknown, undefined>>;
declare const toastCloseButtonVariants: tailwind_variants.TVReturnType<{} | {} | {}, undefined, "mt-3xs shrink-0 rounded-sm text-neutral-400 transition-colors duration-150 hover:text-neutral-600 focus-visible:outline focus-visible:outline-md focus-visible:outline-offset-2 focus-visible:outline-primary-500", {} | {}, undefined, tailwind_variants.TVReturnTypeLike<unknown, undefined>>;
declare const toastListVariants: tailwind_variants.TVReturnType<{} | {} | {}, undefined, "pointer-events-none flex flex-col gap-sm", {} | {}, undefined, tailwind_variants.TVReturnTypeLike<unknown, undefined>>;

export { MrToast, MrToastContainer, MrToastService, ToastStatus, toastCloseButtonVariants, toastIconVariants, toastListVariants, toastMessageVariants, toastVariants };
export type { ToastOptions, ToastRef };
