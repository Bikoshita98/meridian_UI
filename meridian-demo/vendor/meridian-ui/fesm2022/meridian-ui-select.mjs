import * as i0 from '@angular/core';
import { signal, computed, forwardRef, Input, ViewChild, ChangeDetectionStrategy, Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i1 from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import { MrIcon } from '@meridian/ui/icon';
import { MrLabel } from '@meridian/ui/label';
import { tv } from 'tailwind-variants';

var SelectSize;
(function (SelectSize) {
    SelectSize["Xs"] = "xs";
    SelectSize["Sm"] = "sm";
    SelectSize["Md"] = "md";
    SelectSize["Lg"] = "lg";
    SelectSize["Xl"] = "xl";
})(SelectSize || (SelectSize = {}));
var SelectStatus;
(function (SelectStatus) {
    SelectStatus["Default"] = "default";
    SelectStatus["Error"] = "error";
    SelectStatus["Success"] = "success";
    SelectStatus["Warning"] = "warning";
})(SelectStatus || (SelectStatus = {}));

const selectTriggerVariants = tv({
    base: 'flex w-full items-center justify-between gap-xs rounded-md border bg-white font-sans text-left text-neutral-900 shadow-xs outline-none transition-colors duration-150 disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-neutral-50 disabled:text-neutral-400',
    variants: {
        size: {
            xs: 'h-7 px-sm text-xs',
            sm: 'h-8 px-sm text-sm',
            md: 'h-9 px-md text-base',
            lg: 'h-10 px-lg text-md',
            xl: 'h-12 px-xl text-lg',
        },
        status: {
            default: 'border-neutral-300',
            error: 'border-error-500',
            success: 'border-success-500',
            warning: 'border-warning-500',
        },
        open: {
            true: 'ring-2',
            false: '',
        },
    },
    compoundVariants: [
        { status: SelectStatus.Default, open: true, class: 'border-primary-500 ring-primary-100' },
        { status: SelectStatus.Error, open: true, class: 'ring-error-100' },
        { status: SelectStatus.Success, open: true, class: 'ring-success-100' },
        { status: SelectStatus.Warning, open: true, class: 'ring-warning-100' },
    ],
    defaultVariants: {
        size: SelectSize.Md,
        status: SelectStatus.Default,
        open: false,
    },
});
const selectValueVariants = tv({
    base: 'flex-1 truncate',
    variants: {
        empty: {
            true: 'text-neutral-400',
            false: 'text-neutral-900',
        },
    },
    defaultVariants: {
        empty: false,
    },
});
const selectPanelVariants = tv({
    base: 'max-h-64 overflow-auto rounded-md border border-neutral-200 bg-white py-2xs shadow-lg',
});
const selectOptionVariants = tv({
    base: 'cursor-pointer px-md py-xs text-base text-neutral-700 transition-colors duration-150',
    variants: {
        selected: {
            true: 'bg-primary-50 text-primary-600',
            false: 'hover:bg-primary-25',
        },
        disabled: {
            true: 'pointer-events-none opacity-40',
            false: '',
        },
    },
    defaultVariants: {
        selected: false,
        disabled: false,
    },
});
const selectHelperVariants = tv({
    base: 'label-3',
    variants: {
        status: {
            default: 'text-neutral-500',
            error: 'text-error-600',
            success: 'text-success-600',
            warning: 'text-warning-600',
        },
    },
    defaultVariants: {
        status: SelectStatus.Default,
    },
});

let nextSelectId = 0;
class MrSelect {
    triggerId = `mr-select-${nextSelectId++}`;
    helperId = `${this.triggerId}-helper`;
    triggerRef;
    label;
    placeholder = 'Select an option';
    helperText;
    options = [];
    _size = signal(SelectSize.Md, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_size" }] : /* istanbul ignore next */ []));
    set size(value) {
        this._size.set(value);
    }
    get size() {
        return this._size();
    }
    _status = signal(SelectStatus.Default, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_status" }] : /* istanbul ignore next */ []));
    set status(value) {
        this._status.set(value);
    }
    get status() {
        return this._status();
    }
    _disabled = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_disabled" }] : /* istanbul ignore next */ []));
    set disabled(value) {
        this._disabled.set(coerceBooleanProperty(value));
    }
    get disabled() {
        return this._disabled();
    }
    _required = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_required" }] : /* istanbul ignore next */ []));
    set required(value) {
        this._required.set(coerceBooleanProperty(value));
    }
    get required() {
        return this._required();
    }
    isOpen = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isOpen" }] : /* istanbul ignore next */ []));
    // 0 until first opened — cdkConnectedOverlay only renders the panel while `isOpen()` is true,
    // and `toggle()` sets the real width before flipping that flag, so this initial value never shows.
    triggerWidth = signal(0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "triggerWidth" }] : /* istanbul ignore next */ []));
    value = signal(undefined, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    selectedOption = computed(() => this.options.find((option) => option.value === this.value()), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "selectedOption" }] : /* istanbul ignore next */ []));
    triggerClass = computed(() => selectTriggerVariants({ size: this._size(), status: this._status(), open: this.isOpen() }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "triggerClass" }] : /* istanbul ignore next */ []));
    valueClass = computed(() => selectValueVariants({ empty: !this.selectedOption() }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "valueClass" }] : /* istanbul ignore next */ []));
    panelClass = computed(() => selectPanelVariants(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "panelClass" }] : /* istanbul ignore next */ []));
    helperClass = computed(() => selectHelperVariants({ status: this._status() }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "helperClass" }] : /* istanbul ignore next */ []));
    onChange = () => { };
    onTouched = () => { };
    writeValue(value) {
        this.value.set(value);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this._disabled.set(isDisabled);
    }
    optionClass(option) {
        return selectOptionVariants({ selected: option.value === this.value(), disabled: !!option.disabled });
    }
    toggle() {
        if (this.disabled) {
            return;
        }
        if (!this.isOpen()) {
            this.triggerWidth.set(this.triggerRef.nativeElement.offsetWidth);
        }
        this.isOpen.update((open) => !open);
    }
    close() {
        if (this.isOpen()) {
            this.isOpen.set(false);
            this.onTouched();
        }
    }
    selectOption(option) {
        if (option.disabled) {
            return;
        }
        this.value.set(option.value);
        this.onChange(option.value);
        this.close();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrSelect, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.6", type: MrSelect, isStandalone: true, selector: "mr-select", inputs: { label: "label", placeholder: "placeholder", helperText: "helperText", options: "options", size: "size", status: "status", disabled: "disabled", required: "required" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => MrSelect),
                multi: true,
            },
        ], viewQueries: [{ propertyName: "triggerRef", first: true, predicate: ["trigger"], descendants: true, static: true }], ngImport: i0, template: "<div class=\"flex flex-col gap-2xs\">\n  @if (label) {\n    <mr-label [for]=\"triggerId\" [required]=\"required\" [disabled]=\"disabled\">{{ label }}</mr-label>\n  }\n\n  <button\n    #trigger\n    #origin=\"cdkOverlayOrigin\"\n    cdkOverlayOrigin\n    type=\"button\"\n    [id]=\"triggerId\"\n    [class]=\"triggerClass()\"\n    [disabled]=\"disabled\"\n    [attr.aria-haspopup]=\"'listbox'\"\n    [attr.aria-expanded]=\"isOpen()\"\n    [attr.aria-describedby]=\"helperText ? helperId : null\"\n    (click)=\"toggle()\"\n    (keydown.escape)=\"close()\"\n  >\n    <span [class]=\"valueClass()\">{{ selectedOption()?.label ?? placeholder }}</span>\n    <mr-icon name=\"chevronDown\" size=\"sm\" class=\"shrink-0\" [class.rotate-180]=\"isOpen()\" />\n  </button>\n\n  <ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayOrigin]=\"origin\"\n    [cdkConnectedOverlayOpen]=\"isOpen()\"\n    [cdkConnectedOverlayWidth]=\"triggerWidth()\"\n    [cdkConnectedOverlayHasBackdrop]=\"true\"\n    cdkConnectedOverlayBackdropClass=\"cdk-overlay-transparent-backdrop\"\n    (backdropClick)=\"close()\"\n    (detach)=\"close()\"\n  >\n    <ul [class]=\"panelClass()\" role=\"listbox\">\n      @for (option of options; track option.value) {\n        <li\n          role=\"option\"\n          [class]=\"optionClass(option)\"\n          [attr.aria-selected]=\"option.value === value()\"\n          [attr.aria-disabled]=\"option.disabled ? 'true' : null\"\n          (click)=\"selectOption(option)\"\n        >\n          {{ option.label }}\n        </li>\n      }\n    </ul>\n  </ng-template>\n\n  @if (helperText) {\n    <span [id]=\"helperId\" [class]=\"helperClass()\">{{ helperText }}</span>\n  }\n</div>\n", dependencies: [{ kind: "ngmodule", type: OverlayModule }, { kind: "directive", type: i1.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush", "cdkConnectedOverlayDisposeOnNavigation", "cdkConnectedOverlayUsePopover", "cdkConnectedOverlayMatchWidth", "cdkConnectedOverlay"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i1.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }, { kind: "component", type: MrIcon, selector: "mr-icon", inputs: ["name", "size"] }, { kind: "component", type: MrLabel, selector: "mr-label", inputs: ["for", "size", "required", "disabled"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrSelect, decorators: [{
            type: Component,
            args: [{ selector: 'mr-select', imports: [OverlayModule, MrIcon, MrLabel], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => MrSelect),
                            multi: true,
                        },
                    ], template: "<div class=\"flex flex-col gap-2xs\">\n  @if (label) {\n    <mr-label [for]=\"triggerId\" [required]=\"required\" [disabled]=\"disabled\">{{ label }}</mr-label>\n  }\n\n  <button\n    #trigger\n    #origin=\"cdkOverlayOrigin\"\n    cdkOverlayOrigin\n    type=\"button\"\n    [id]=\"triggerId\"\n    [class]=\"triggerClass()\"\n    [disabled]=\"disabled\"\n    [attr.aria-haspopup]=\"'listbox'\"\n    [attr.aria-expanded]=\"isOpen()\"\n    [attr.aria-describedby]=\"helperText ? helperId : null\"\n    (click)=\"toggle()\"\n    (keydown.escape)=\"close()\"\n  >\n    <span [class]=\"valueClass()\">{{ selectedOption()?.label ?? placeholder }}</span>\n    <mr-icon name=\"chevronDown\" size=\"sm\" class=\"shrink-0\" [class.rotate-180]=\"isOpen()\" />\n  </button>\n\n  <ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayOrigin]=\"origin\"\n    [cdkConnectedOverlayOpen]=\"isOpen()\"\n    [cdkConnectedOverlayWidth]=\"triggerWidth()\"\n    [cdkConnectedOverlayHasBackdrop]=\"true\"\n    cdkConnectedOverlayBackdropClass=\"cdk-overlay-transparent-backdrop\"\n    (backdropClick)=\"close()\"\n    (detach)=\"close()\"\n  >\n    <ul [class]=\"panelClass()\" role=\"listbox\">\n      @for (option of options; track option.value) {\n        <li\n          role=\"option\"\n          [class]=\"optionClass(option)\"\n          [attr.aria-selected]=\"option.value === value()\"\n          [attr.aria-disabled]=\"option.disabled ? 'true' : null\"\n          (click)=\"selectOption(option)\"\n        >\n          {{ option.label }}\n        </li>\n      }\n    </ul>\n  </ng-template>\n\n  @if (helperText) {\n    <span [id]=\"helperId\" [class]=\"helperClass()\">{{ helperText }}</span>\n  }\n</div>\n" }]
        }], propDecorators: { triggerRef: [{
                type: ViewChild,
                args: ['trigger', { static: true }]
            }], label: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], helperText: [{
                type: Input
            }], options: [{
                type: Input
            }], size: [{
                type: Input
            }], status: [{
                type: Input
            }], disabled: [{
                type: Input
            }], required: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { MrSelect, SelectSize, SelectStatus, selectHelperVariants, selectOptionVariants, selectPanelVariants, selectTriggerVariants, selectValueVariants };
//# sourceMappingURL=meridian-ui-select.mjs.map
