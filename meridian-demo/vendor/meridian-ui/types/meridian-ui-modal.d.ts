import * as i0 from '@angular/core';
import { AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';
import * as tailwind_variants from 'tailwind-variants';

declare enum ModalSize {
    Sm = "sm",
    Md = "md",
    Lg = "lg",
    Xl = "xl"
}

declare class MrModal implements AfterViewInit, OnDestroy {
    private readonly overlay;
    private readonly viewContainerRef;
    private readonly modalTemplate;
    private readonly _open;
    set open(value: boolean);
    get open(): boolean;
    readonly openChange: EventEmitter<boolean>;
    /** Allows disabling backdrop-click-to-close for "must choose an option" modals. */
    dismissible: boolean;
    private readonly _size;
    set size(value: `${ModalSize}`);
    get size(): `${ModalSize}`;
    protected readonly panelClass: i0.Signal<string>;
    private overlayRef?;
    private previouslyFocusedElement?;
    private viewReady;
    constructor();
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    protected close(): void;
    private attach;
    private detach;
    static ɵfac: i0.ɵɵFactoryDeclaration<MrModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MrModal, "mr-modal", never, { "open": { "alias": "open"; "required": false; }; "dismissible": { "alias": "dismissible"; "required": false; }; "size": { "alias": "size"; "required": false; }; }, { "openChange": "openChange"; }, never, ["*"], true, never>;
}

declare const modalPanelVariants: tailwind_variants.TVReturnType<{
    size: {
        sm: "max-w-sm";
        md: "max-w-md";
        lg: "max-w-lg";
        xl: "max-w-xl";
    };
}, undefined, "w-full rounded-lg bg-white p-lg shadow-2xl outline-none", {
    size: {
        sm: "max-w-sm";
        md: "max-w-md";
        lg: "max-w-lg";
        xl: "max-w-xl";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    size: {
        sm: "max-w-sm";
        md: "max-w-md";
        lg: "max-w-lg";
        xl: "max-w-xl";
    };
}, undefined>>;

export { ModalSize, MrModal, modalPanelVariants };
