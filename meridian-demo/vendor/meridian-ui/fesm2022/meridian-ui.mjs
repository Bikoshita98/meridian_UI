import * as i0 from '@angular/core';
import { signal, computed, Input, ChangeDetectionStrategy, Component, contentChildren, effect, forwardRef, ViewChild, inject, Injector, afterNextRender, ViewContainerRef, EventEmitter, Output, Injectable } from '@angular/core';
import { tv as tv$1, createTV } from 'tailwind-variants';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ICON_SIZE_PX as ICON_SIZE_PX$1, MrIcon as MrIcon$1 } from '@meridian/ui/icon';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i1$1 from '@angular/cdk/a11y';
import { FocusKeyManager, A11yModule } from '@angular/cdk/a11y';
import * as i1 from '@angular/cdk/overlay';
import { OverlayModule, Overlay } from '@angular/cdk/overlay';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSquare, lucideCircle, lucideStar, lucideMoreHorizontal, lucideMinus, lucidePlus, lucideCalendar, lucideLink2, lucideEyeOff, lucideEye, lucideSearch, lucideLoader2, lucideInfo, lucideAlertTriangle, lucideAlertCircle, lucideX, lucideCheck, lucideChevronRight, lucideChevronLeft, lucideChevronUp, lucideChevronDown } from '@ng-icons/lucide';
import { MrLabel as MrLabel$1 } from '@meridian/ui/label';
import { TemplatePortal } from '@angular/cdk/portal';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';

var AvatarSize;
(function (AvatarSize) {
    AvatarSize["Xs"] = "xs";
    AvatarSize["Sm"] = "sm";
    AvatarSize["Md"] = "md";
    AvatarSize["Lg"] = "lg";
    AvatarSize["Xl"] = "xl";
})(AvatarSize || (AvatarSize = {}));
var AvatarShape;
(function (AvatarShape) {
    AvatarShape["Circle"] = "circle";
    AvatarShape["Square"] = "square";
})(AvatarShape || (AvatarShape = {}));

const avatarVariants = tv$1({
    base: 'inline-flex select-none items-center justify-center overflow-hidden bg-neutral-100 font-sans font-medium leading-none text-neutral-600',
    variants: {
        // Same height scale as `button`'s `size` variant, so an avatar sits flush next to a button of
        // the same size in a toolbar/header.
        size: {
            xs: 'h-7 w-7 text-2xs',
            sm: 'h-8 w-8 text-xs',
            md: 'h-9 w-9 text-sm',
            lg: 'h-10 w-10 text-base',
            xl: 'h-12 w-12 text-lg',
        },
        shape: {
            circle: 'rounded-pill',
            square: 'rounded-lg',
        },
    },
    defaultVariants: {
        size: 'md',
        shape: 'circle',
    },
});

function initialsFromName(name) {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join('');
}
class MrAvatar {
    _src = signal(undefined, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_src" }] : /* istanbul ignore next */ []));
    set src(value) {
        this._src.set(value);
        this._imgError.set(false);
    }
    get src() {
        return this._src();
    }
    _alt = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_alt" }] : /* istanbul ignore next */ []));
    set alt(value) {
        this._alt.set(value);
    }
    get alt() {
        return this._alt();
    }
    _name = signal(undefined, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_name" }] : /* istanbul ignore next */ []));
    set name(value) {
        this._name.set(value);
    }
    get name() {
        return this._name();
    }
    _initials = signal(undefined, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_initials" }] : /* istanbul ignore next */ []));
    set initials(value) {
        this._initials.set(value);
    }
    get initials() {
        return this._initials();
    }
    _size = signal(AvatarSize.Md, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_size" }] : /* istanbul ignore next */ []));
    set size(value) {
        this._size.set(value);
    }
    get size() {
        return this._size();
    }
    _shape = signal(AvatarShape.Circle, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_shape" }] : /* istanbul ignore next */ []));
    set shape(value) {
        this._shape.set(value);
    }
    get shape() {
        return this._shape();
    }
    _imgError = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_imgError" }] : /* istanbul ignore next */ []));
    avatarClass = computed(() => avatarVariants({ size: this._size(), shape: this._shape() }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "avatarClass" }] : /* istanbul ignore next */ []));
    resolvedAlt = computed(() => this._alt() || this._name() || '', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "resolvedAlt" }] : /* istanbul ignore next */ []));
    resolvedInitials = computed(() => {
        const explicit = this._initials();
        if (explicit) {
            return explicit;
        }
        const name = this._name();
        return name ? initialsFromName(name) : '';
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "resolvedInitials" }] : /* istanbul ignore next */ []));
    showImage = computed(() => !!this._src() && !this._imgError(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "showImage" }] : /* istanbul ignore next */ []));
    onImageError() {
        this._imgError.set(true);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrAvatar, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.6", type: MrAvatar, isStandalone: true, selector: "mr-avatar", inputs: { src: "src", alt: "alt", name: "name", initials: "initials", size: "size", shape: "shape" }, ngImport: i0, template: "<span\n  [class]=\"avatarClass()\"\n  [attr.role]=\"showImage() ? null : 'img'\"\n  [attr.aria-label]=\"showImage() ? null : resolvedAlt()\"\n>\n  @if (showImage()) {\n    <img class=\"h-full w-full object-cover\" [src]=\"src\" [alt]=\"resolvedAlt()\" (error)=\"onImageError()\" />\n  } @else {\n    <span aria-hidden=\"true\">{{ resolvedInitials() }}</span>\n  }\n</span>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrAvatar, decorators: [{
            type: Component,
            args: [{ selector: 'mr-avatar', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span\n  [class]=\"avatarClass()\"\n  [attr.role]=\"showImage() ? null : 'img'\"\n  [attr.aria-label]=\"showImage() ? null : resolvedAlt()\"\n>\n  @if (showImage()) {\n    <img class=\"h-full w-full object-cover\" [src]=\"src\" [alt]=\"resolvedAlt()\" (error)=\"onImageError()\" />\n  } @else {\n    <span aria-hidden=\"true\">{{ resolvedInitials() }}</span>\n  }\n</span>\n" }]
        }], propDecorators: { src: [{
                type: Input
            }], alt: [{
                type: Input
            }], name: [{
                type: Input
            }], initials: [{
                type: Input
            }], size: [{
                type: Input
            }], shape: [{
                type: Input
            }] } });

var BadgeVariant;
(function (BadgeVariant) {
    BadgeVariant["Filled"] = "filled";
    BadgeVariant["Outline"] = "outline";
})(BadgeVariant || (BadgeVariant = {}));
var BadgeColor;
(function (BadgeColor) {
    BadgeColor["Primary"] = "primary";
    BadgeColor["Secondary"] = "secondary";
    BadgeColor["Neutral"] = "neutral";
    BadgeColor["Success"] = "success";
    BadgeColor["Warning"] = "warning";
    BadgeColor["Error"] = "error";
    BadgeColor["Info"] = "info";
})(BadgeColor || (BadgeColor = {}));

// Every class below is written out literally (never interpolated) so Tailwind's static content
// scan can find it — a template-literal color token like `bg-${color}-500` is invisible to it.
const colorCompoundVariants$1 = [
    { variant: BadgeVariant.Filled, color: BadgeColor.Primary, class: 'border-transparent bg-primary-500 text-white' },
    {
        variant: BadgeVariant.Filled,
        color: BadgeColor.Secondary,
        class: 'border-transparent bg-secondary-500 text-white',
    },
    { variant: BadgeVariant.Filled, color: BadgeColor.Neutral, class: 'border-transparent bg-neutral-500 text-white' },
    { variant: BadgeVariant.Filled, color: BadgeColor.Success, class: 'border-transparent bg-success-500 text-white' },
    { variant: BadgeVariant.Filled, color: BadgeColor.Warning, class: 'border-transparent bg-warning-500 text-white' },
    { variant: BadgeVariant.Filled, color: BadgeColor.Error, class: 'border-transparent bg-error-500 text-white' },
    { variant: BadgeVariant.Filled, color: BadgeColor.Info, class: 'border-transparent bg-info-500 text-white' },
    {
        variant: BadgeVariant.Outline,
        color: BadgeColor.Primary,
        class: 'border-primary-300 bg-primary-25 text-primary-600',
    },
    {
        variant: BadgeVariant.Outline,
        color: BadgeColor.Secondary,
        class: 'border-secondary-300 bg-secondary-25 text-secondary-600',
    },
    {
        variant: BadgeVariant.Outline,
        color: BadgeColor.Neutral,
        class: 'border-neutral-300 bg-neutral-25 text-neutral-600',
    },
    {
        variant: BadgeVariant.Outline,
        color: BadgeColor.Success,
        class: 'border-success-300 bg-success-25 text-success-600',
    },
    {
        variant: BadgeVariant.Outline,
        color: BadgeColor.Warning,
        class: 'border-warning-300 bg-warning-25 text-warning-600',
    },
    { variant: BadgeVariant.Outline, color: BadgeColor.Error, class: 'border-error-300 bg-error-25 text-error-600' },
    { variant: BadgeVariant.Outline, color: BadgeColor.Info, class: 'border-info-300 bg-info-25 text-info-600' },
];
const badgeVariants = tv$1({
    base: 'inline-flex items-center gap-3xs whitespace-nowrap rounded-pill border px-sm py-3xs font-sans text-xs font-medium leading-none',
    variants: {
        // No standalone classes — every color's actual treatment is resolved per `variant` below.
        variant: {
            filled: '',
            outline: '',
        },
        color: {
            primary: '',
            secondary: '',
            neutral: '',
            success: '',
            warning: '',
            error: '',
            info: '',
        },
    },
    compoundVariants: [...colorCompoundVariants$1],
    defaultVariants: {
        variant: BadgeVariant.Filled,
        color: BadgeColor.Neutral,
    },
});

class MrBadge {
    _variant = signal(BadgeVariant.Filled, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_variant" }] : /* istanbul ignore next */ []));
    set variant(value) {
        this._variant.set(value);
    }
    get variant() {
        return this._variant();
    }
    _color = signal(BadgeColor.Neutral, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_color" }] : /* istanbul ignore next */ []));
    set color(value) {
        this._color.set(value);
    }
    get color() {
        return this._color();
    }
    badgeClass = computed(() => badgeVariants({ variant: this._variant(), color: this._color() }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "badgeClass" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrBadge, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.1.6", type: MrBadge, isStandalone: true, selector: "mr-badge", inputs: { variant: "variant", color: "color" }, ngImport: i0, template: "<span [class]=\"badgeClass()\">\n  <ng-content></ng-content>\n</span>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrBadge, decorators: [{
            type: Component,
            args: [{ selector: 'mr-badge', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span [class]=\"badgeClass()\">\n  <ng-content></ng-content>\n</span>\n" }]
        }], propDecorators: { variant: [{
                type: Input
            }], color: [{
                type: Input
            }] } });

var ButtonVariant;
(function (ButtonVariant) {
    ButtonVariant["Filled"] = "filled";
    ButtonVariant["Outline"] = "outline";
    ButtonVariant["Ghost"] = "ghost";
    ButtonVariant["Link"] = "link";
})(ButtonVariant || (ButtonVariant = {}));
var ButtonColor;
(function (ButtonColor) {
    ButtonColor["Primary"] = "primary";
    ButtonColor["Secondary"] = "secondary";
    ButtonColor["Neutral"] = "neutral";
    ButtonColor["Success"] = "success";
    ButtonColor["Warning"] = "warning";
    ButtonColor["Error"] = "error";
    ButtonColor["Info"] = "info";
})(ButtonColor || (ButtonColor = {}));
var ButtonSize;
(function (ButtonSize) {
    ButtonSize["Xs"] = "xs";
    ButtonSize["Sm"] = "sm";
    ButtonSize["Md"] = "md";
    ButtonSize["Lg"] = "lg";
    ButtonSize["Xl"] = "xl";
})(ButtonSize || (ButtonSize = {}));
var ButtonShape;
(function (ButtonShape) {
    ButtonShape["Default"] = "default";
    ButtonShape["Square"] = "square";
})(ButtonShape || (ButtonShape = {}));
var ButtonRadius;
(function (ButtonRadius) {
    ButtonRadius["None"] = "none";
    ButtonRadius["Sm"] = "sm";
    ButtonRadius["Md"] = "md";
    ButtonRadius["Lg"] = "lg";
    ButtonRadius["Pill"] = "pill";
})(ButtonRadius || (ButtonRadius = {}));
var ButtonStatus;
(function (ButtonStatus) {
    ButtonStatus["Default"] = "default";
    ButtonStatus["Loading"] = "loading";
})(ButtonStatus || (ButtonStatus = {}));

// Every class below is written out literally (never interpolated) so Tailwind's static content
// scan can find it — a template-literal color token like `bg-${color}-500` is invisible to it.
const colorCompoundVariants = [
    {
        variant: ButtonVariant.Filled,
        color: ButtonColor.Primary,
        class: 'border-transparent bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-600',
    },
    {
        variant: ButtonVariant.Filled,
        color: ButtonColor.Secondary,
        class: 'border-transparent bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-600',
    },
    {
        variant: ButtonVariant.Filled,
        color: ButtonColor.Neutral,
        class: 'border-transparent bg-neutral-500 text-white hover:bg-neutral-600 active:bg-neutral-600',
    },
    {
        variant: ButtonVariant.Filled,
        color: ButtonColor.Success,
        class: 'border-transparent bg-success-500 text-white hover:bg-success-600 active:bg-success-600',
    },
    {
        variant: ButtonVariant.Filled,
        color: ButtonColor.Warning,
        class: 'border-transparent bg-warning-500 text-white hover:bg-warning-600 active:bg-warning-600',
    },
    {
        variant: ButtonVariant.Filled,
        color: ButtonColor.Error,
        class: 'border-transparent bg-error-500 text-white hover:bg-error-600 active:bg-error-600',
    },
    {
        variant: ButtonVariant.Filled,
        color: ButtonColor.Info,
        class: 'border-transparent bg-info-500 text-white hover:bg-info-600 active:bg-info-600',
    },
    {
        variant: ButtonVariant.Outline,
        color: ButtonColor.Primary,
        class: 'border-primary-300 bg-transparent text-primary-600 hover:bg-primary-25 active:bg-primary-50',
    },
    {
        variant: ButtonVariant.Outline,
        color: ButtonColor.Secondary,
        class: 'border-secondary-300 bg-transparent text-secondary-600 hover:bg-secondary-25 active:bg-secondary-50',
    },
    {
        variant: ButtonVariant.Outline,
        color: ButtonColor.Neutral,
        class: 'border-neutral-300 bg-transparent text-neutral-600 hover:bg-neutral-25 active:bg-neutral-50',
    },
    {
        variant: ButtonVariant.Outline,
        color: ButtonColor.Success,
        class: 'border-success-300 bg-transparent text-success-600 hover:bg-success-25 active:bg-success-50',
    },
    {
        variant: ButtonVariant.Outline,
        color: ButtonColor.Warning,
        class: 'border-warning-300 bg-transparent text-warning-600 hover:bg-warning-25 active:bg-warning-50',
    },
    {
        variant: ButtonVariant.Outline,
        color: ButtonColor.Error,
        class: 'border-error-300 bg-transparent text-error-600 hover:bg-error-25 active:bg-error-50',
    },
    {
        variant: ButtonVariant.Outline,
        color: ButtonColor.Info,
        class: 'border-info-300 bg-transparent text-info-600 hover:bg-info-25 active:bg-info-50',
    },
    {
        variant: ButtonVariant.Ghost,
        color: ButtonColor.Primary,
        class: 'border-transparent bg-transparent text-primary-600 hover:bg-primary-25 active:bg-primary-50',
    },
    {
        variant: ButtonVariant.Ghost,
        color: ButtonColor.Secondary,
        class: 'border-transparent bg-transparent text-secondary-600 hover:bg-secondary-25 active:bg-secondary-50',
    },
    {
        variant: ButtonVariant.Ghost,
        color: ButtonColor.Neutral,
        class: 'border-transparent bg-transparent text-neutral-600 hover:bg-neutral-25 active:bg-neutral-50',
    },
    {
        variant: ButtonVariant.Ghost,
        color: ButtonColor.Success,
        class: 'border-transparent bg-transparent text-success-600 hover:bg-success-25 active:bg-success-50',
    },
    {
        variant: ButtonVariant.Ghost,
        color: ButtonColor.Warning,
        class: 'border-transparent bg-transparent text-warning-600 hover:bg-warning-25 active:bg-warning-50',
    },
    {
        variant: ButtonVariant.Ghost,
        color: ButtonColor.Error,
        class: 'border-transparent bg-transparent text-error-600 hover:bg-error-25 active:bg-error-50',
    },
    {
        variant: ButtonVariant.Ghost,
        color: ButtonColor.Info,
        class: 'border-transparent bg-transparent text-info-600 hover:bg-info-25 active:bg-info-50',
    },
    {
        variant: ButtonVariant.Link,
        color: ButtonColor.Primary,
        class: 'border-transparent bg-transparent text-primary-600 hover:text-primary-500 active:text-primary-600',
    },
    {
        variant: ButtonVariant.Link,
        color: ButtonColor.Secondary,
        class: 'border-transparent bg-transparent text-secondary-600 hover:text-secondary-500 active:text-secondary-600',
    },
    {
        variant: ButtonVariant.Link,
        color: ButtonColor.Neutral,
        class: 'border-transparent bg-transparent text-neutral-600 hover:text-neutral-500 active:text-neutral-600',
    },
    {
        variant: ButtonVariant.Link,
        color: ButtonColor.Success,
        class: 'border-transparent bg-transparent text-success-600 hover:text-success-500 active:text-success-600',
    },
    {
        variant: ButtonVariant.Link,
        color: ButtonColor.Warning,
        class: 'border-transparent bg-transparent text-warning-600 hover:text-warning-500 active:text-warning-600',
    },
    {
        variant: ButtonVariant.Link,
        color: ButtonColor.Error,
        class: 'border-transparent bg-transparent text-error-600 hover:text-error-500 active:text-error-600',
    },
    {
        variant: ButtonVariant.Link,
        color: ButtonColor.Info,
        class: 'border-transparent bg-transparent text-info-600 hover:text-info-500 active:text-info-600',
    },
];
const buttonVariants = tv$1({
    base: 'inline-flex select-none items-center justify-center whitespace-nowrap font-sans font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-md focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:pointer-events-none disabled:opacity-40',
    variants: {
        variant: {
            filled: 'border shadow-xs',
            outline: 'border',
            ghost: 'border',
            link: 'h-auto border-none p-0 shadow-none',
        },
        // No standalone classes — every color's actual treatment is resolved per `variant` below.
        color: {
            primary: '',
            secondary: '',
            neutral: '',
            success: '',
            warning: '',
            error: '',
            info: '',
        },
        size: {
            xs: 'h-7 gap-3xs px-sm text-xs',
            sm: 'h-8 gap-2xs px-sm text-sm',
            md: 'h-9 gap-xs px-md text-base',
            lg: 'h-10 gap-xs px-lg text-md',
            xl: 'h-12 gap-sm px-xl text-lg',
        },
        shape: {
            default: '',
            square: 'aspect-square px-0',
        },
        radius: {
            none: 'rounded-none',
            sm: 'rounded-sm',
            md: 'rounded-md',
            lg: 'rounded-lg',
            pill: 'rounded-pill',
        },
        status: {
            default: '',
            loading: 'cursor-wait',
        },
    },
    compoundVariants: [
        ...colorCompoundVariants,
        // The `link` variant never takes a border, background tint, or rounding — it's plain text.
        { variant: ButtonVariant.Link, class: 'rounded-none bg-transparent hover:bg-transparent active:bg-transparent' },
    ],
    defaultVariants: {
        variant: ButtonVariant.Filled,
        color: ButtonColor.Primary,
        size: ButtonSize.Md,
        shape: ButtonShape.Default,
        radius: ButtonRadius.Md,
        status: ButtonStatus.Default,
    },
});

class MrButton {
    _variant = signal(ButtonVariant.Filled, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_variant" }] : /* istanbul ignore next */ []));
    set variant(value) {
        this._variant.set(value);
    }
    get variant() {
        return this._variant();
    }
    _color = signal(ButtonColor.Primary, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_color" }] : /* istanbul ignore next */ []));
    set color(value) {
        this._color.set(value);
    }
    get color() {
        return this._color();
    }
    _size = signal(ButtonSize.Md, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_size" }] : /* istanbul ignore next */ []));
    set size(value) {
        this._size.set(value);
    }
    get size() {
        return this._size();
    }
    _shape = signal(ButtonShape.Default, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_shape" }] : /* istanbul ignore next */ []));
    set shape(value) {
        this._shape.set(value);
    }
    get shape() {
        return this._shape();
    }
    _radius = signal(ButtonRadius.Md, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_radius" }] : /* istanbul ignore next */ []));
    set radius(value) {
        this._radius.set(value);
    }
    get radius() {
        return this._radius();
    }
    _status = signal(ButtonStatus.Default, /* @ts-ignore */
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
    /** Native `<button>` `type` — defaults to `button` so a button never submits a host form by accident. */
    type = 'button';
    isLoading = computed(() => this._status() === ButtonStatus.Loading, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isLoading" }] : /* istanbul ignore next */ []));
    isDisabled = computed(() => this._disabled() || this.isLoading(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isDisabled" }] : /* istanbul ignore next */ []));
    hostClass = computed(() => buttonVariants({
        variant: this._variant(),
        color: this._color(),
        size: this._size(),
        shape: this._shape(),
        radius: this._radius(),
        status: this._status(),
    }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "hostClass" }] : /* istanbul ignore next */ []));
    spinnerPx = computed(() => `${ICON_SIZE_PX$1[this._size()]}px`, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "spinnerPx" }] : /* istanbul ignore next */ []));
    projectedIcons = contentChildren(MrIcon$1, { ...(ngDevMode ? { debugName: "projectedIcons" } : /* istanbul ignore next */ {}), descendants: true });
    constructor() {
        // A projected `<mr-icon>` doesn't know the button's size — push it down so callers never have
        // to keep an icon's `size` input in sync with the button's own `size` by hand.
        effect(() => {
            const size = this._size();
            for (const icon of this.projectedIcons()) {
                icon.size = size;
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrButton, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.6", type: MrButton, isStandalone: true, selector: "mr-button", inputs: { variant: "variant", color: "color", size: "size", shape: "shape", radius: "radius", status: "status", disabled: "disabled", type: "type" }, queries: [{ propertyName: "projectedIcons", predicate: MrIcon$1, descendants: true, isSignal: true }], ngImport: i0, template: "<button [class]=\"hostClass()\" [type]=\"type\" [disabled]=\"isDisabled()\" [attr.aria-busy]=\"isLoading() ? 'true' : null\">\n  @if (isLoading()) {\n    <span\n      class=\"animate-spin rounded-pill border-md border-current border-t-transparent\"\n      [style.width]=\"spinnerPx()\"\n      [style.height]=\"spinnerPx()\"\n      aria-hidden=\"true\"\n    ></span>\n  }\n  <ng-content></ng-content>\n</button>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrButton, decorators: [{
            type: Component,
            args: [{ selector: 'mr-button', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button [class]=\"hostClass()\" [type]=\"type\" [disabled]=\"isDisabled()\" [attr.aria-busy]=\"isLoading() ? 'true' : null\">\n  @if (isLoading()) {\n    <span\n      class=\"animate-spin rounded-pill border-md border-current border-t-transparent\"\n      [style.width]=\"spinnerPx()\"\n      [style.height]=\"spinnerPx()\"\n      aria-hidden=\"true\"\n    ></span>\n  }\n  <ng-content></ng-content>\n</button>\n" }]
        }], ctorParameters: () => [], propDecorators: { variant: [{
                type: Input
            }], color: [{
                type: Input
            }], size: [{
                type: Input
            }], shape: [{
                type: Input
            }], radius: [{
                type: Input
            }], status: [{
                type: Input
            }], disabled: [{
                type: Input
            }], type: [{
                type: Input
            }], projectedIcons: [{ type: i0.ContentChildren, args: [i0.forwardRef(() => MrIcon$1), { ...{ descendants: true }, isSignal: true }] }] } });

var CardVariant;
(function (CardVariant) {
    CardVariant["Elevated"] = "elevated";
    CardVariant["Outlined"] = "outlined";
})(CardVariant || (CardVariant = {}));
var CardPadding;
(function (CardPadding) {
    CardPadding["None"] = "none";
    CardPadding["Sm"] = "sm";
    CardPadding["Md"] = "md";
    CardPadding["Lg"] = "lg";
})(CardPadding || (CardPadding = {}));

const cardVariants = tv$1({
    base: 'rounded-lg bg-white',
    variants: {
        variant: {
            elevated: 'border border-neutral-100 shadow-md',
            outlined: 'border border-neutral-200',
        },
        padding: {
            none: 'p-0',
            sm: 'p-lg',
            md: 'p-xl',
            lg: 'p-2xl',
        },
    },
    defaultVariants: {
        variant: 'elevated',
        padding: 'md',
    },
});

class MrCard {
    _variant = signal(CardVariant.Elevated, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_variant" }] : /* istanbul ignore next */ []));
    set variant(value) {
        this._variant.set(value);
    }
    get variant() {
        return this._variant();
    }
    _padding = signal(CardPadding.Md, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_padding" }] : /* istanbul ignore next */ []));
    set padding(value) {
        this._padding.set(value);
    }
    get padding() {
        return this._padding();
    }
    cardClass = computed(() => cardVariants({ variant: this._variant(), padding: this._padding() }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "cardClass" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrCard, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.1.6", type: MrCard, isStandalone: true, selector: "mr-card", inputs: { variant: "variant", padding: "padding" }, ngImport: i0, template: "<div [class]=\"cardClass()\">\n  <ng-content></ng-content>\n</div>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrCard, decorators: [{
            type: Component,
            args: [{ selector: 'mr-card', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [class]=\"cardClass()\">\n  <ng-content></ng-content>\n</div>\n" }]
        }], propDecorators: { variant: [{
                type: Input
            }], padding: [{
                type: Input
            }] } });

var CheckboxSize;
(function (CheckboxSize) {
    CheckboxSize["Xs"] = "xs";
    CheckboxSize["Sm"] = "sm";
    CheckboxSize["Md"] = "md";
    CheckboxSize["Lg"] = "lg";
    CheckboxSize["Xl"] = "xl";
})(CheckboxSize || (CheckboxSize = {}));
var CheckboxStatus;
(function (CheckboxStatus) {
    CheckboxStatus["Default"] = "default";
    CheckboxStatus["Error"] = "error";
    CheckboxStatus["Success"] = "success";
    CheckboxStatus["Warning"] = "warning";
})(CheckboxStatus || (CheckboxStatus = {}));

const checkboxBoxVariants = tv$1({
    base: 'relative inline-flex shrink-0 items-center justify-center rounded-sm border bg-white transition-colors duration-150',
    variants: {
        size: {
            xs: 'h-3.5 w-3.5',
            sm: 'h-4 w-4',
            md: 'h-5 w-5',
            lg: 'h-6 w-6',
            xl: 'h-7 w-7',
        },
        status: {
            default: 'border-neutral-300',
            error: 'border-error-500',
            success: 'border-success-500',
            warning: 'border-warning-500',
        },
        // No standalone classes — a checked box's actual fill is resolved per `status` below.
        checked: {
            true: '',
            false: '',
        },
        disabled: {
            true: 'cursor-not-allowed border-neutral-200 bg-neutral-50 opacity-40',
            false: 'cursor-pointer',
        },
    },
    compoundVariants: [
        { status: CheckboxStatus.Default, checked: true, class: 'border-primary-500 bg-primary-500 text-white' },
        { status: CheckboxStatus.Error, checked: true, class: 'border-error-500 bg-error-500 text-white' },
        { status: CheckboxStatus.Success, checked: true, class: 'border-success-500 bg-success-500 text-white' },
        { status: CheckboxStatus.Warning, checked: true, class: 'border-warning-500 bg-warning-500 text-white' },
    ],
    defaultVariants: {
        size: CheckboxSize.Md,
        status: CheckboxStatus.Default,
        checked: false,
        disabled: false,
    },
});
/** Keeps the checkmark/dash icon legible at every box size without needing its own size input. */
const CHECKBOX_ICON_SIZE = {
    [CheckboxSize.Xs]: 'xs',
    [CheckboxSize.Sm]: 'xs',
    [CheckboxSize.Md]: 'sm',
    [CheckboxSize.Lg]: 'sm',
    [CheckboxSize.Xl]: 'md',
};

let nextCheckboxId = 0;
class MrCheckbox {
    inputId = `mr-checkbox-${nextCheckboxId++}`;
    label;
    _indeterminate = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_indeterminate" }] : /* istanbul ignore next */ []));
    /** Visual "mixed" state (e.g. a parent checkbox over a partially-selected list) — not user-settable by clicking. */
    set indeterminate(value) {
        this._indeterminate.set(coerceBooleanProperty(value));
    }
    get indeterminate() {
        return this._indeterminate();
    }
    _size = signal(CheckboxSize.Md, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_size" }] : /* istanbul ignore next */ []));
    set size(value) {
        this._size.set(value);
    }
    get size() {
        return this._size();
    }
    _status = signal(CheckboxStatus.Default, /* @ts-ignore */
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
    checked = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "checked" }] : /* istanbul ignore next */ []));
    boxClass = computed(() => checkboxBoxVariants({
        size: this._size(),
        status: this._status(),
        checked: this.checked() || this._indeterminate(),
        disabled: this._disabled(),
    }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "boxClass" }] : /* istanbul ignore next */ []));
    iconSize = computed(() => CHECKBOX_ICON_SIZE[this._size()], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "iconSize" }] : /* istanbul ignore next */ []));
    onChange = () => { };
    onTouched = () => { };
    writeValue(value) {
        this.checked.set(!!value);
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
    handleChange(event) {
        const value = event.target.checked;
        this.checked.set(value);
        this.onChange(value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrCheckbox, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.6", type: MrCheckbox, isStandalone: true, selector: "mr-checkbox", inputs: { label: "label", indeterminate: "indeterminate", size: "size", status: "status", disabled: "disabled", required: "required" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => MrCheckbox),
                multi: true,
            },
        ], ngImport: i0, template: "<label [for]=\"inputId\" class=\"inline-flex cursor-pointer select-none items-center gap-xs\">\n  <span class=\"relative inline-flex\">\n    <input\n      [id]=\"inputId\"\n      type=\"checkbox\"\n      class=\"absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed\"\n      [checked]=\"checked()\"\n      [indeterminate]=\"indeterminate\"\n      [disabled]=\"disabled\"\n      [required]=\"required\"\n      [attr.aria-checked]=\"indeterminate ? 'mixed' : checked()\"\n      (change)=\"handleChange($event)\"\n      (blur)=\"onTouched()\"\n    />\n    <span [class]=\"boxClass()\" aria-hidden=\"true\">\n      @if (indeterminate) {\n        <mr-icon name=\"minus\" [size]=\"iconSize()\" />\n      } @else if (checked()) {\n        <mr-icon name=\"check\" [size]=\"iconSize()\" />\n      }\n    </span>\n  </span>\n  @if (label) {\n    <span class=\"label-2 text-neutral-700\">{{ label }}</span>\n  }\n</label>\n", dependencies: [{ kind: "component", type: MrIcon$1, selector: "mr-icon", inputs: ["name", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrCheckbox, decorators: [{
            type: Component,
            args: [{ selector: 'mr-checkbox', imports: [MrIcon$1], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => MrCheckbox),
                            multi: true,
                        },
                    ], template: "<label [for]=\"inputId\" class=\"inline-flex cursor-pointer select-none items-center gap-xs\">\n  <span class=\"relative inline-flex\">\n    <input\n      [id]=\"inputId\"\n      type=\"checkbox\"\n      class=\"absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed\"\n      [checked]=\"checked()\"\n      [indeterminate]=\"indeterminate\"\n      [disabled]=\"disabled\"\n      [required]=\"required\"\n      [attr.aria-checked]=\"indeterminate ? 'mixed' : checked()\"\n      (change)=\"handleChange($event)\"\n      (blur)=\"onTouched()\"\n    />\n    <span [class]=\"boxClass()\" aria-hidden=\"true\">\n      @if (indeterminate) {\n        <mr-icon name=\"minus\" [size]=\"iconSize()\" />\n      } @else if (checked()) {\n        <mr-icon name=\"check\" [size]=\"iconSize()\" />\n      }\n    </span>\n  </span>\n  @if (label) {\n    <span class=\"label-2 text-neutral-700\">{{ label }}</span>\n  }\n</label>\n" }]
        }], propDecorators: { label: [{
                type: Input
            }], indeterminate: [{
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

var DropdownPosition;
(function (DropdownPosition) {
    DropdownPosition["BottomStart"] = "bottom-start";
    DropdownPosition["BottomEnd"] = "bottom-end";
    DropdownPosition["TopStart"] = "top-start";
    DropdownPosition["TopEnd"] = "top-end";
})(DropdownPosition || (DropdownPosition = {}));

const dropdownPanelVariants = tv$1({
    base: 'min-w-40 rounded-md border border-neutral-200 bg-white p-3xs shadow-lg',
});
const dropdownItemVariants = tv$1({
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

var IconSize;
(function (IconSize) {
    IconSize["Xs"] = "xs";
    IconSize["Sm"] = "sm";
    IconSize["Md"] = "md";
    IconSize["Lg"] = "lg";
    IconSize["Xl"] = "xl";
})(IconSize || (IconSize = {}));

const iconVariants = tv$1({
    base: 'inline-flex shrink-0 items-center justify-center leading-none',
});
/** Pixel size handed to `ng-icon`'s `size` input, keyed by the same enum as every other component. */
const ICON_SIZE_PX = {
    [IconSize.Xs]: 12,
    [IconSize.Sm]: 14,
    [IconSize.Md]: 16,
    [IconSize.Lg]: 20,
    [IconSize.Xl]: 24,
};

class MrIcon {
    name;
    _size = signal(IconSize.Md, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_size" }] : /* istanbul ignore next */ []));
    set size(value) {
        this._size.set(value);
    }
    get size() {
        return this._size();
    }
    wrapperClass = computed(() => iconVariants(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "wrapperClass" }] : /* istanbul ignore next */ []));
    pixelSize = computed(() => `${ICON_SIZE_PX[this._size()]}px`, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "pixelSize" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrIcon, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.1.6", type: MrIcon, isStandalone: true, selector: "mr-icon", inputs: { name: "name", size: "size" }, ngImport: i0, template: "<ng-icon [class]=\"wrapperClass()\" [name]=\"name\" [size]=\"pixelSize()\" />\n", dependencies: [{ kind: "component", type: NgIcon, selector: "ng-icon", inputs: ["name", "svg", "size", "strokeWidth", "color"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrIcon, decorators: [{
            type: Component,
            args: [{ selector: 'mr-icon', imports: [NgIcon], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-icon [class]=\"wrapperClass()\" [name]=\"name\" [size]=\"pixelSize()\" />\n" }]
        }], propDecorators: { name: [{
                type: Input,
                args: [{ required: true }]
            }], size: [{
                type: Input
            }] } });

/**
 * The curated set of icons available as `<mr-icon name="...">` across the library.
 * Consumers register these once via `provideMeridianIcons()` in their app config — ng-icons
 * then tree-shakes away anything not referenced, so this is the one place a new icon is added.
 */
const MERIDIAN_ICONS = {
    chevronDown: lucideChevronDown,
    chevronUp: lucideChevronUp,
    chevronLeft: lucideChevronLeft,
    chevronRight: lucideChevronRight,
    check: lucideCheck,
    x: lucideX,
    alertCircle: lucideAlertCircle,
    alertTriangle: lucideAlertTriangle,
    info: lucideInfo,
    loader: lucideLoader2,
    search: lucideSearch,
    eye: lucideEye,
    eyeOff: lucideEyeOff,
    link: lucideLink2,
    calendar: lucideCalendar,
    plus: lucidePlus,
    minus: lucideMinus,
    moreHorizontal: lucideMoreHorizontal,
    star: lucideStar,
    circle: lucideCircle,
    square: lucideSquare,
};
/** Register once in the consuming app's providers (bootstrapApplication or root NgModule). */
function provideMeridianIcons() {
    return provideIcons(MERIDIAN_ICONS);
}

var InputFieldSize;
(function (InputFieldSize) {
    InputFieldSize["Xs"] = "xs";
    InputFieldSize["Sm"] = "sm";
    InputFieldSize["Md"] = "md";
    InputFieldSize["Lg"] = "lg";
    InputFieldSize["Xl"] = "xl";
})(InputFieldSize || (InputFieldSize = {}));
var InputFieldStatus;
(function (InputFieldStatus) {
    InputFieldStatus["Default"] = "default";
    InputFieldStatus["Error"] = "error";
    InputFieldStatus["Success"] = "success";
    InputFieldStatus["Warning"] = "warning";
})(InputFieldStatus || (InputFieldStatus = {}));

const inputFieldVariants = tv$1({
    base: 'w-full rounded-md border bg-white font-sans text-neutral-900 shadow-xs outline-none transition-colors duration-150 placeholder:text-neutral-400 focus:ring-2 disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-neutral-50 disabled:text-neutral-400',
    variants: {
        size: {
            xs: 'h-7 px-sm text-xs',
            sm: 'h-8 px-sm text-sm',
            md: 'h-9 px-md text-base',
            lg: 'h-10 px-lg text-md',
            xl: 'h-12 px-xl text-lg',
        },
        status: {
            default: 'border-neutral-300 focus:border-primary-500 focus:ring-primary-100',
            error: 'border-error-500 focus:border-error-500 focus:ring-error-100',
            success: 'border-success-500 focus:border-success-500 focus:ring-success-100',
            warning: 'border-warning-500 focus:border-warning-500 focus:ring-warning-100',
        },
    },
    defaultVariants: {
        size: InputFieldSize.Md,
        status: InputFieldStatus.Default,
    },
});
const inputFieldHelperVariants = tv$1({
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
        status: InputFieldStatus.Default,
    },
});

let nextInputFieldId = 0;
class MrInputField {
    inputId = `mr-input-field-${nextInputFieldId++}`;
    helperId = `${this.inputId}-helper`;
    label;
    placeholder = '';
    helperText;
    type = 'text';
    _size = signal(InputFieldSize.Md, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_size" }] : /* istanbul ignore next */ []));
    set size(value) {
        this._size.set(value);
    }
    get size() {
        return this._size();
    }
    _status = signal(InputFieldStatus.Default, /* @ts-ignore */
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
    _readonly = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_readonly" }] : /* istanbul ignore next */ []));
    set readonly(value) {
        this._readonly.set(coerceBooleanProperty(value));
    }
    get readonly() {
        return this._readonly();
    }
    _required = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_required" }] : /* istanbul ignore next */ []));
    set required(value) {
        this._required.set(coerceBooleanProperty(value));
    }
    get required() {
        return this._required();
    }
    value = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    inputClass = computed(() => inputFieldVariants({ size: this._size(), status: this._status() }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "inputClass" }] : /* istanbul ignore next */ []));
    helperClass = computed(() => inputFieldHelperVariants({ status: this._status() }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "helperClass" }] : /* istanbul ignore next */ []));
    onChange = () => { };
    onTouched = () => { };
    writeValue(value) {
        this.value.set(value ?? '');
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
    handleInput(event) {
        const value = event.target.value;
        this.value.set(value);
        this.onChange(value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrInputField, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.6", type: MrInputField, isStandalone: true, selector: "mr-input-field", inputs: { label: "label", placeholder: "placeholder", helperText: "helperText", type: "type", size: "size", status: "status", disabled: "disabled", readonly: "readonly", required: "required" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => MrInputField),
                multi: true,
            },
        ], ngImport: i0, template: "<div class=\"flex flex-col gap-2xs\">\n  @if (label) {\n    <mr-label [for]=\"inputId\" [required]=\"required\" [disabled]=\"disabled\">{{ label }}</mr-label>\n  }\n  <input\n    [id]=\"inputId\"\n    [class]=\"inputClass()\"\n    [type]=\"type\"\n    [placeholder]=\"placeholder\"\n    [value]=\"value()\"\n    [disabled]=\"disabled\"\n    [readOnly]=\"readonly\"\n    [required]=\"required\"\n    [attr.aria-invalid]=\"status === 'error' ? 'true' : null\"\n    [attr.aria-describedby]=\"helperText ? helperId : null\"\n    (input)=\"handleInput($event)\"\n    (blur)=\"onTouched()\"\n  />\n  @if (helperText) {\n    <span [id]=\"helperId\" [class]=\"helperClass()\">{{ helperText }}</span>\n  }\n</div>\n", dependencies: [{ kind: "component", type: MrLabel$1, selector: "mr-label", inputs: ["for", "size", "required", "disabled"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrInputField, decorators: [{
            type: Component,
            args: [{ selector: 'mr-input-field', imports: [MrLabel$1], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => MrInputField),
                            multi: true,
                        },
                    ], template: "<div class=\"flex flex-col gap-2xs\">\n  @if (label) {\n    <mr-label [for]=\"inputId\" [required]=\"required\" [disabled]=\"disabled\">{{ label }}</mr-label>\n  }\n  <input\n    [id]=\"inputId\"\n    [class]=\"inputClass()\"\n    [type]=\"type\"\n    [placeholder]=\"placeholder\"\n    [value]=\"value()\"\n    [disabled]=\"disabled\"\n    [readOnly]=\"readonly\"\n    [required]=\"required\"\n    [attr.aria-invalid]=\"status === 'error' ? 'true' : null\"\n    [attr.aria-describedby]=\"helperText ? helperId : null\"\n    (input)=\"handleInput($event)\"\n    (blur)=\"onTouched()\"\n  />\n  @if (helperText) {\n    <span [id]=\"helperId\" [class]=\"helperClass()\">{{ helperText }}</span>\n  }\n</div>\n" }]
        }], propDecorators: { label: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], helperText: [{
                type: Input
            }], type: [{
                type: Input
            }], size: [{
                type: Input
            }], status: [{
                type: Input
            }], disabled: [{
                type: Input
            }], readonly: [{
                type: Input
            }], required: [{
                type: Input
            }] } });

var LabelSize;
(function (LabelSize) {
    LabelSize["Sm"] = "sm";
    LabelSize["Md"] = "md";
    LabelSize["Lg"] = "lg";
})(LabelSize || (LabelSize = {}));

const labelVariants = tv$1({
    base: 'inline-flex select-none items-center gap-3xs font-sans text-neutral-600',
    variants: {
        // Maps onto the `.label-1/2/3` typography utilities generated by plugins.js, largest first.
        size: {
            lg: 'label-1',
            md: 'label-2',
            sm: 'label-3',
        },
        disabled: {
            true: 'opacity-40',
            false: '',
        },
    },
    defaultVariants: {
        size: LabelSize.Md,
        disabled: false,
    },
});

class MrLabel {
    /** Mirrors the native `<label for>` attribute — pass the id of the control this labels. */
    for;
    _size = signal(LabelSize.Md, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_size" }] : /* istanbul ignore next */ []));
    set size(value) {
        this._size.set(value);
    }
    get size() {
        return this._size();
    }
    _required = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_required" }] : /* istanbul ignore next */ []));
    set required(value) {
        this._required.set(coerceBooleanProperty(value));
    }
    get required() {
        return this._required();
    }
    _disabled = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_disabled" }] : /* istanbul ignore next */ []));
    set disabled(value) {
        this._disabled.set(coerceBooleanProperty(value));
    }
    get disabled() {
        return this._disabled();
    }
    hostClass = computed(() => labelVariants({ size: this._size(), disabled: this._disabled() }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "hostClass" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrLabel, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.6", type: MrLabel, isStandalone: true, selector: "mr-label", inputs: { for: "for", size: "size", required: "required", disabled: "disabled" }, ngImport: i0, template: "<label [class]=\"hostClass()\" [attr.for]=\"for\">\n  <ng-content></ng-content>\n  @if (required) {\n    <span class=\"text-error-500\" aria-hidden=\"true\">*</span>\n  }\n</label>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrLabel, decorators: [{
            type: Component,
            args: [{ selector: 'mr-label', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<label [class]=\"hostClass()\" [attr.for]=\"for\">\n  <ng-content></ng-content>\n  @if (required) {\n    <span class=\"text-error-500\" aria-hidden=\"true\">*</span>\n  }\n</label>\n" }]
        }], propDecorators: { for: [{
                type: Input
            }], size: [{
                type: Input
            }], required: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });

var ModalSize;
(function (ModalSize) {
    ModalSize["Sm"] = "sm";
    ModalSize["Md"] = "md";
    ModalSize["Lg"] = "lg";
    ModalSize["Xl"] = "xl";
})(ModalSize || (ModalSize = {}));

const modalPanelVariants = tv$1({
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.1.6", type: MrModal, isStandalone: true, selector: "mr-modal", inputs: { open: "open", dismissible: "dismissible", size: "size" }, outputs: { openChange: "openChange" }, viewQueries: [{ propertyName: "modalTemplate", first: true, predicate: ["modalTemplate"], descendants: true }], ngImport: i0, template: "<ng-template #modalTemplate>\n  <div\n    role=\"dialog\"\n    aria-modal=\"true\"\n    tabindex=\"-1\"\n    cdkTrapFocus\n    cdkTrapFocusAutoCapture\n    [class]=\"panelClass()\"\n    (keydown.escape)=\"close()\"\n  >\n    <ng-content></ng-content>\n  </div>\n</ng-template>\n", dependencies: [{ kind: "ngmodule", type: A11yModule }, { kind: "directive", type: i1$1.CdkTrapFocus, selector: "[cdkTrapFocus]", inputs: ["cdkTrapFocus", "cdkTrapFocusAutoCapture"], exportAs: ["cdkTrapFocus"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
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

var PaginationSize;
(function (PaginationSize) {
    PaginationSize["Xs"] = "xs";
    PaginationSize["Sm"] = "sm";
    PaginationSize["Md"] = "md";
    PaginationSize["Lg"] = "lg";
    PaginationSize["Xl"] = "xl";
})(PaginationSize || (PaginationSize = {}));

const paginationNavVariants = tv$1({
    base: 'inline-flex items-center gap-2xs',
});
// Same fixed square footprint for a page number, prev/next, and the ellipsis placeholder, so a
// row of controls lines up evenly regardless of which kind of item sits in each slot.
const paginationButtonVariants = tv$1({
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
const paginationEllipsisVariants = tv$1({
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.6", type: MrPagination, isStandalone: true, selector: "mr-pagination", inputs: { page: "page", totalPages: "totalPages", size: "size" }, outputs: { pageChange: "pageChange" }, ngImport: i0, template: "<nav [class]=\"navClass()\" aria-label=\"Pagination\">\n  <button type=\"button\" [class]=\"navButtonClass()\" [disabled]=\"isFirstPage()\" aria-label=\"Previous page\" (click)=\"prev()\">\n    <mr-icon name=\"chevronLeft\" [size]=\"size\" />\n  </button>\n\n  @for (item of pageItems(); track $index) {\n    @if (item === 'ellipsis') {\n      <span [class]=\"ellipsisClass()\" aria-hidden=\"true\">\n        <mr-icon name=\"moreHorizontal\" [size]=\"size\" />\n      </span>\n    } @else {\n      <button\n        type=\"button\"\n        [class]=\"pageButtonClass(item)\"\n        [attr.aria-current]=\"item === page ? 'page' : null\"\n        [attr.aria-label]=\"'Page ' + item\"\n        (click)=\"goTo(item)\"\n      >\n        {{ item }}\n      </button>\n    }\n  }\n\n  <button type=\"button\" [class]=\"navButtonClass()\" [disabled]=\"isLastPage()\" aria-label=\"Next page\" (click)=\"next()\">\n    <mr-icon name=\"chevronRight\" [size]=\"size\" />\n  </button>\n</nav>\n", dependencies: [{ kind: "component", type: MrIcon$1, selector: "mr-icon", inputs: ["name", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrPagination, decorators: [{
            type: Component,
            args: [{ selector: 'mr-pagination', imports: [MrIcon$1], changeDetection: ChangeDetectionStrategy.OnPush, template: "<nav [class]=\"navClass()\" aria-label=\"Pagination\">\n  <button type=\"button\" [class]=\"navButtonClass()\" [disabled]=\"isFirstPage()\" aria-label=\"Previous page\" (click)=\"prev()\">\n    <mr-icon name=\"chevronLeft\" [size]=\"size\" />\n  </button>\n\n  @for (item of pageItems(); track $index) {\n    @if (item === 'ellipsis') {\n      <span [class]=\"ellipsisClass()\" aria-hidden=\"true\">\n        <mr-icon name=\"moreHorizontal\" [size]=\"size\" />\n      </span>\n    } @else {\n      <button\n        type=\"button\"\n        [class]=\"pageButtonClass(item)\"\n        [attr.aria-current]=\"item === page ? 'page' : null\"\n        [attr.aria-label]=\"'Page ' + item\"\n        (click)=\"goTo(item)\"\n      >\n        {{ item }}\n      </button>\n    }\n  }\n\n  <button type=\"button\" [class]=\"navButtonClass()\" [disabled]=\"isLastPage()\" aria-label=\"Next page\" (click)=\"next()\">\n    <mr-icon name=\"chevronRight\" [size]=\"size\" />\n  </button>\n</nav>\n" }]
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

var RadioSize;
(function (RadioSize) {
    RadioSize["Xs"] = "xs";
    RadioSize["Sm"] = "sm";
    RadioSize["Md"] = "md";
    RadioSize["Lg"] = "lg";
    RadioSize["Xl"] = "xl";
})(RadioSize || (RadioSize = {}));
var RadioStatus;
(function (RadioStatus) {
    RadioStatus["Default"] = "default";
    RadioStatus["Error"] = "error";
    RadioStatus["Success"] = "success";
    RadioStatus["Warning"] = "warning";
})(RadioStatus || (RadioStatus = {}));

const radioBoxVariants = tv$1({
    base: 'relative inline-flex shrink-0 items-center justify-center rounded-pill border bg-white transition-colors duration-150',
    variants: {
        size: {
            xs: 'h-3.5 w-3.5',
            sm: 'h-4 w-4',
            md: 'h-5 w-5',
            lg: 'h-6 w-6',
            xl: 'h-7 w-7',
        },
        status: {
            default: 'border-neutral-300',
            error: 'border-error-500',
            success: 'border-success-500',
            warning: 'border-warning-500',
        },
        // No standalone classes — a checked radio's border color is resolved per `status` below.
        checked: {
            true: '',
            false: '',
        },
        disabled: {
            true: 'cursor-not-allowed border-neutral-200 bg-neutral-50 opacity-40',
            false: 'cursor-pointer',
        },
    },
    compoundVariants: [
        { status: RadioStatus.Default, checked: true, class: 'border-primary-500' },
        { status: RadioStatus.Error, checked: true, class: 'border-error-500' },
        { status: RadioStatus.Success, checked: true, class: 'border-success-500' },
        { status: RadioStatus.Warning, checked: true, class: 'border-warning-500' },
    ],
    defaultVariants: {
        size: RadioSize.Md,
        status: RadioStatus.Default,
        checked: false,
        disabled: false,
    },
});
const radioDotVariants = tv$1({
    base: 'rounded-pill transition-colors duration-150',
    variants: {
        size: {
            xs: 'h-1.5 w-1.5',
            sm: 'h-1.5 w-1.5',
            md: 'h-2 w-2',
            lg: 'h-2.5 w-2.5',
            xl: 'h-3 w-3',
        },
        status: {
            default: 'bg-primary-500',
            error: 'bg-error-500',
            success: 'bg-success-500',
            warning: 'bg-warning-500',
        },
    },
    defaultVariants: {
        size: RadioSize.Md,
        status: RadioStatus.Default,
    },
});

let nextRadioId = 0;
class MrRadio {
    /** Also doubles as this instance's id for `UniqueSelectionDispatcher` — see the constructor. */
    inputId = `mr-radio-${nextRadioId++}`;
    selectionDispatcher = inject(UniqueSelectionDispatcher);
    unlisten;
    label;
    /** Groups radios together — must match across every `mr-radio` in the group, same as a native `name` attribute. */
    name;
    /** The value this particular radio represents; `writeValue` compares the model value against it. */
    value;
    _size = signal(RadioSize.Md, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_size" }] : /* istanbul ignore next */ []));
    set size(value) {
        this._size.set(value);
    }
    get size() {
        return this._size();
    }
    _status = signal(RadioStatus.Default, /* @ts-ignore */
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
    checked = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "checked" }] : /* istanbul ignore next */ []));
    boxClass = computed(() => radioBoxVariants({
        size: this._size(),
        status: this._status(),
        checked: this.checked(),
        disabled: this._disabled(),
    }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "boxClass" }] : /* istanbul ignore next */ []));
    dotClass = computed(() => radioDotVariants({ size: this._size(), status: this._status() }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "dotClass" }] : /* istanbul ignore next */ []));
    onChange = () => { };
    onTouched = () => { };
    constructor() {
        // Native radio `change` events only fire on the newly-selected item — a sibling that just got
        // deselected is never told. This service is exactly the fix (see its own doc comment).
        this.unlisten = this.selectionDispatcher.listen((id, name) => {
            if (name === this.name && id !== this.inputId) {
                this.checked.set(false);
            }
        });
    }
    ngOnDestroy() {
        this.unlisten();
    }
    writeValue(value) {
        this.checked.set(value === this.value);
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
    handleChange() {
        this.checked.set(true);
        this.onChange(this.value);
        this.selectionDispatcher.notify(this.inputId, this.name);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrRadio, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.6", type: MrRadio, isStandalone: true, selector: "mr-radio", inputs: { label: "label", name: "name", value: "value", size: "size", status: "status", disabled: "disabled", required: "required" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => MrRadio),
                multi: true,
            },
        ], ngImport: i0, template: "<label [for]=\"inputId\" class=\"inline-flex cursor-pointer select-none items-center gap-xs\">\n  <span class=\"relative inline-flex\">\n    <input\n      [id]=\"inputId\"\n      type=\"radio\"\n      [name]=\"name\"\n      class=\"absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed\"\n      [checked]=\"checked()\"\n      [disabled]=\"disabled\"\n      [required]=\"required\"\n      (change)=\"handleChange()\"\n      (blur)=\"onTouched()\"\n    />\n    <span [class]=\"boxClass()\" aria-hidden=\"true\">\n      @if (checked()) {\n        <span [class]=\"dotClass()\"></span>\n      }\n    </span>\n  </span>\n  @if (label) {\n    <span class=\"label-2 text-neutral-700\">{{ label }}</span>\n  }\n</label>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrRadio, decorators: [{
            type: Component,
            args: [{ selector: 'mr-radio', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => MrRadio),
                            multi: true,
                        },
                    ], template: "<label [for]=\"inputId\" class=\"inline-flex cursor-pointer select-none items-center gap-xs\">\n  <span class=\"relative inline-flex\">\n    <input\n      [id]=\"inputId\"\n      type=\"radio\"\n      [name]=\"name\"\n      class=\"absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed\"\n      [checked]=\"checked()\"\n      [disabled]=\"disabled\"\n      [required]=\"required\"\n      (change)=\"handleChange()\"\n      (blur)=\"onTouched()\"\n    />\n    <span [class]=\"boxClass()\" aria-hidden=\"true\">\n      @if (checked()) {\n        <span [class]=\"dotClass()\"></span>\n      }\n    </span>\n  </span>\n  @if (label) {\n    <span class=\"label-2 text-neutral-700\">{{ label }}</span>\n  }\n</label>\n" }]
        }], ctorParameters: () => [], propDecorators: { label: [{
                type: Input
            }], name: [{
                type: Input,
                args: [{ required: true }]
            }], value: [{
                type: Input,
                args: [{ required: true }]
            }], size: [{
                type: Input
            }], status: [{
                type: Input
            }], disabled: [{
                type: Input
            }], required: [{
                type: Input
            }] } });

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

const selectTriggerVariants = tv$1({
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
const selectValueVariants = tv$1({
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
const selectPanelVariants = tv$1({
    base: 'max-h-64 overflow-auto rounded-md border border-neutral-200 bg-white py-2xs shadow-lg',
});
const selectOptionVariants = tv$1({
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
const selectHelperVariants = tv$1({
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
        ], viewQueries: [{ propertyName: "triggerRef", first: true, predicate: ["trigger"], descendants: true, static: true }], ngImport: i0, template: "<div class=\"flex flex-col gap-2xs\">\n  @if (label) {\n    <mr-label [for]=\"triggerId\" [required]=\"required\" [disabled]=\"disabled\">{{ label }}</mr-label>\n  }\n\n  <button\n    #trigger\n    #origin=\"cdkOverlayOrigin\"\n    cdkOverlayOrigin\n    type=\"button\"\n    [id]=\"triggerId\"\n    [class]=\"triggerClass()\"\n    [disabled]=\"disabled\"\n    [attr.aria-haspopup]=\"'listbox'\"\n    [attr.aria-expanded]=\"isOpen()\"\n    [attr.aria-describedby]=\"helperText ? helperId : null\"\n    (click)=\"toggle()\"\n    (keydown.escape)=\"close()\"\n  >\n    <span [class]=\"valueClass()\">{{ selectedOption()?.label ?? placeholder }}</span>\n    <mr-icon name=\"chevronDown\" size=\"sm\" class=\"shrink-0\" [class.rotate-180]=\"isOpen()\" />\n  </button>\n\n  <ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayOrigin]=\"origin\"\n    [cdkConnectedOverlayOpen]=\"isOpen()\"\n    [cdkConnectedOverlayWidth]=\"triggerWidth()\"\n    [cdkConnectedOverlayHasBackdrop]=\"true\"\n    cdkConnectedOverlayBackdropClass=\"cdk-overlay-transparent-backdrop\"\n    (backdropClick)=\"close()\"\n    (detach)=\"close()\"\n  >\n    <ul [class]=\"panelClass()\" role=\"listbox\">\n      @for (option of options; track option.value) {\n        <li\n          role=\"option\"\n          [class]=\"optionClass(option)\"\n          [attr.aria-selected]=\"option.value === value()\"\n          [attr.aria-disabled]=\"option.disabled ? 'true' : null\"\n          (click)=\"selectOption(option)\"\n        >\n          {{ option.label }}\n        </li>\n      }\n    </ul>\n  </ng-template>\n\n  @if (helperText) {\n    <span [id]=\"helperId\" [class]=\"helperClass()\">{{ helperText }}</span>\n  }\n</div>\n", dependencies: [{ kind: "ngmodule", type: OverlayModule }, { kind: "directive", type: i1.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush", "cdkConnectedOverlayDisposeOnNavigation", "cdkConnectedOverlayUsePopover", "cdkConnectedOverlayMatchWidth", "cdkConnectedOverlay"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i1.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }, { kind: "component", type: MrIcon$1, selector: "mr-icon", inputs: ["name", "size"] }, { kind: "component", type: MrLabel$1, selector: "mr-label", inputs: ["for", "size", "required", "disabled"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrSelect, decorators: [{
            type: Component,
            args: [{ selector: 'mr-select', imports: [OverlayModule, MrIcon$1, MrLabel$1], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
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

var SpinnerSize;
(function (SpinnerSize) {
    SpinnerSize["Xs"] = "xs";
    SpinnerSize["Sm"] = "sm";
    SpinnerSize["Md"] = "md";
    SpinnerSize["Lg"] = "lg";
    SpinnerSize["Xl"] = "xl";
})(SpinnerSize || (SpinnerSize = {}));
var SpinnerColor;
(function (SpinnerColor) {
    SpinnerColor["Primary"] = "primary";
    SpinnerColor["Secondary"] = "secondary";
    SpinnerColor["Neutral"] = "neutral";
    SpinnerColor["Success"] = "success";
    SpinnerColor["Warning"] = "warning";
    SpinnerColor["Error"] = "error";
    SpinnerColor["Info"] = "info";
})(SpinnerColor || (SpinnerColor = {}));

// `tailwind-variants` v3 bundles its own Tailwind-v4-shaped class-conflict resolver rather than
// reading this project's tailwind.config.js. Its default border-width matcher only recognizes
// numeric values (`border-2`, `border-4`, ...), so this library's word-keyed `borderWidth` scale
// (`border-md`/`border-lg` below — see tailwind.config.js) falls through to the border-COLOR
// group's catch-all matcher instead, and silently loses its merge conflict against `border-current`
// (both get classified as "border-color"; the merge keeps only the last one in the list) — so
// `border-md` was being dropped outright, leaving the ring with no border-width at all. This local
// `tv` extends just the `border-w` class group with the two extra keys to fix that. (Not factored
// into a shared helper: a cross-component/cross-entry-point import here would break ng-packagr's
// per-secondary-entry-point `rootDir` — every other component redeclares small config locally for
// the same reason, e.g. `badge` redeclaring `ButtonColor`'s palette as its own `BadgeColor`.)
const tv = createTV({
    twMergeConfig: {
        extend: {
            classGroups: {
                'border-w': [{ border: ['md', 'lg'] }],
            },
        },
    },
});
// Same ring markup `button` renders inline for its own loading state (`animate-spin` + a
// current-color border with the top edge cut out), pulled out standalone so it can be placed
// anywhere (a loading placeholder over a `card`/`table`), not just inside a `button`.
const spinnerVariants = tv({
    base: 'inline-block shrink-0 animate-spin rounded-pill border-md border-current border-t-transparent',
    variants: {
        color: {
            primary: 'text-primary-500',
            secondary: 'text-secondary-500',
            neutral: 'text-neutral-400',
            success: 'text-success-500',
            warning: 'text-warning-500',
            error: 'text-error-500',
            info: 'text-info-500',
        },
    },
    defaultVariants: {
        color: 'neutral',
    },
});

class MrSpinner {
    _size = signal(SpinnerSize.Md, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_size" }] : /* istanbul ignore next */ []));
    set size(value) {
        this._size.set(value);
    }
    get size() {
        return this._size();
    }
    _color = signal(SpinnerColor.Neutral, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_color" }] : /* istanbul ignore next */ []));
    set color(value) {
        this._color.set(value);
    }
    get color() {
        return this._color();
    }
    /** Announced to assistive tech via `aria-label` — a spinner conveys a loading state with no visible text of its own. */
    label = 'Loading';
    spinnerClass = computed(() => spinnerVariants({ color: this._color() }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "spinnerClass" }] : /* istanbul ignore next */ []));
    spinnerPx = computed(() => `${ICON_SIZE_PX$1[this._size()]}px`, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "spinnerPx" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrSpinner, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.1.6", type: MrSpinner, isStandalone: true, selector: "mr-spinner", inputs: { size: "size", color: "color", label: "label" }, ngImport: i0, template: "<span\n  [class]=\"spinnerClass()\"\n  [style.width]=\"spinnerPx()\"\n  [style.height]=\"spinnerPx()\"\n  role=\"status\"\n  [attr.aria-label]=\"label\"\n></span>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrSpinner, decorators: [{
            type: Component,
            args: [{ selector: 'mr-spinner', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span\n  [class]=\"spinnerClass()\"\n  [style.width]=\"spinnerPx()\"\n  [style.height]=\"spinnerPx()\"\n  role=\"status\"\n  [attr.aria-label]=\"label\"\n></span>\n" }]
        }], propDecorators: { size: [{
                type: Input
            }], color: [{
                type: Input
            }], label: [{
                type: Input
            }] } });

var TableSize;
(function (TableSize) {
    TableSize["Sm"] = "sm";
    TableSize["Md"] = "md";
    TableSize["Lg"] = "lg";
})(TableSize || (TableSize = {}));

const tableWrapperVariants = tv$1({
    base: 'w-full overflow-x-auto rounded-lg border border-neutral-200',
});
const tableVariants = tv$1({
    base: 'w-full border-collapse text-left',
});
const tableHeaderRowVariants = tv$1({
    base: 'border-b border-neutral-200 bg-neutral-25',
});
const tableBodyRowVariants = tv$1({
    base: 'border-b border-neutral-100 last:border-b-0 hover:bg-neutral-25',
});
const tableHeaderCellVariants = tv$1({
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
const tableCellVariants = tv$1({
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.6", type: MrTable, isStandalone: true, selector: "mr-table", inputs: { columns: "columns", rows: "rows", emptyMessage: "emptyMessage", size: "size" }, outputs: { sortChange: "sortChange" }, ngImport: i0, template: "<div [class]=\"wrapperClass()\">\n  <table [class]=\"tableClass()\">\n    <thead>\n      <tr [class]=\"headerRowClass()\">\n        @for (column of columns; track column.key) {\n          <th\n            scope=\"col\"\n            [class]=\"headerCellClass(column)\"\n            [attr.aria-sort]=\"column.sortable ? ariaSortFor(column) : null\"\n            (click)=\"toggleSort(column)\"\n          >\n            <span class=\"inline-flex items-center gap-3xs\">\n              {{ column.header }}\n              @if (column.sortable) {\n                <mr-icon\n                  [name]=\"sortDirectionFor(column) === 'desc' ? 'chevronDown' : 'chevronUp'\"\n                  size=\"xs\"\n                  [class.opacity-30]=\"sortDirectionFor(column) === null\"\n                />\n              }\n            </span>\n          </th>\n        }\n      </tr>\n    </thead>\n    <tbody>\n      @if (sortedRows().length === 0) {\n        <tr>\n          <td [attr.colspan]=\"columns.length\" [class]=\"emptyCellClass()\">{{ emptyMessage }}</td>\n        </tr>\n      } @else {\n        @for (row of sortedRows(); track $index) {\n          <tr [class]=\"bodyRowClass()\">\n            @for (column of columns; track column.key) {\n              <td [class]=\"cellClass(column)\">{{ row[column.key] }}</td>\n            }\n          </tr>\n        }\n      }\n    </tbody>\n  </table>\n</div>\n", dependencies: [{ kind: "component", type: MrIcon$1, selector: "mr-icon", inputs: ["name", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrTable, decorators: [{
            type: Component,
            args: [{ selector: 'mr-table', imports: [MrIcon$1], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [class]=\"wrapperClass()\">\n  <table [class]=\"tableClass()\">\n    <thead>\n      <tr [class]=\"headerRowClass()\">\n        @for (column of columns; track column.key) {\n          <th\n            scope=\"col\"\n            [class]=\"headerCellClass(column)\"\n            [attr.aria-sort]=\"column.sortable ? ariaSortFor(column) : null\"\n            (click)=\"toggleSort(column)\"\n          >\n            <span class=\"inline-flex items-center gap-3xs\">\n              {{ column.header }}\n              @if (column.sortable) {\n                <mr-icon\n                  [name]=\"sortDirectionFor(column) === 'desc' ? 'chevronDown' : 'chevronUp'\"\n                  size=\"xs\"\n                  [class.opacity-30]=\"sortDirectionFor(column) === null\"\n                />\n              }\n            </span>\n          </th>\n        }\n      </tr>\n    </thead>\n    <tbody>\n      @if (sortedRows().length === 0) {\n        <tr>\n          <td [attr.colspan]=\"columns.length\" [class]=\"emptyCellClass()\">{{ emptyMessage }}</td>\n        </tr>\n      } @else {\n        @for (row of sortedRows(); track $index) {\n          <tr [class]=\"bodyRowClass()\">\n            @for (column of columns; track column.key) {\n              <td [class]=\"cellClass(column)\">{{ row[column.key] }}</td>\n            }\n          </tr>\n        }\n      }\n    </tbody>\n  </table>\n</div>\n" }]
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

let nextTabId = 0;
/**
 * One tab within an `<mr-tabs>`. Renders nothing on its own — `MrTabs` reads `label`/`disabled`
 * off each projected `MrTab` to build the tab-list row, and sets `active` on the one it selects.
 */
class MrTab {
    /** Public (not `protected`) — `MrTabs`' template reads these off each projected child. */
    tabId = `mr-tab-${nextTabId++}`;
    panelId = `${this.tabId}-panel`;
    label;
    _disabled = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_disabled" }] : /* istanbul ignore next */ []));
    set disabled(value) {
        this._disabled.set(coerceBooleanProperty(value));
    }
    get disabled() {
        return this._disabled();
    }
    _active = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_active" }] : /* istanbul ignore next */ []));
    /** Set by the parent `MrTabs` — not meant to be bound directly by a consumer. */
    set active(value) {
        this._active.set(value);
    }
    get active() {
        return this._active();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrTab, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.6", type: MrTab, isStandalone: true, selector: "mr-tab", inputs: { label: "label", disabled: "disabled" }, ngImport: i0, template: "@if (active) {\n  <div role=\"tabpanel\" [id]=\"panelId\" [attr.aria-labelledby]=\"tabId\" tabindex=\"0\" class=\"pt-md\">\n    <ng-content></ng-content>\n  </div>\n}\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrTab, decorators: [{
            type: Component,
            args: [{ selector: 'mr-tab', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (active) {\n  <div role=\"tabpanel\" [id]=\"panelId\" [attr.aria-labelledby]=\"tabId\" tabindex=\"0\" class=\"pt-md\">\n    <ng-content></ng-content>\n  </div>\n}\n" }]
        }], propDecorators: { label: [{
                type: Input,
                args: [{ required: true }]
            }], disabled: [{
                type: Input
            }] } });

var TabsSize;
(function (TabsSize) {
    TabsSize["Xs"] = "xs";
    TabsSize["Sm"] = "sm";
    TabsSize["Md"] = "md";
    TabsSize["Lg"] = "lg";
    TabsSize["Xl"] = "xl";
})(TabsSize || (TabsSize = {}));

const tabsListVariants = tv$1({
    base: 'flex items-center gap-lg border-b border-neutral-200',
});
const tabButtonVariants = tv$1({
    base: 'relative -mb-px whitespace-nowrap border-b-2 border-transparent font-sans font-medium text-neutral-500 outline-none transition-colors duration-150 hover:text-neutral-700 focus-visible:outline focus-visible:outline-md focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:cursor-not-allowed disabled:text-neutral-300 disabled:hover:text-neutral-300',
    variants: {
        size: {
            xs: 'py-3xs text-xs',
            sm: 'py-2xs text-sm',
            md: 'py-xs text-base',
            lg: 'py-sm text-md',
            xl: 'py-md text-lg',
        },
        // No standalone classes — a selected tab's underline/text color is resolved via the
        // compoundVariant below (it doesn't vary by size).
        selected: {
            true: '',
            false: '',
        },
    },
    compoundVariants: [{ selected: true, class: 'border-primary-500 text-primary-600 hover:text-primary-600' }],
    defaultVariants: {
        size: TabsSize.Md,
        selected: false,
    },
});

class MrTabs {
    _selected = signal(0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_selected" }] : /* istanbul ignore next */ []));
    set selected(value) {
        this._selected.set(value);
    }
    get selected() {
        return this._selected();
    }
    selectedChange = new EventEmitter();
    _size = signal(TabsSize.Md, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_size" }] : /* istanbul ignore next */ []));
    set size(value) {
        this._size.set(value);
    }
    get size() {
        return this._size();
    }
    tabs = contentChildren(MrTab, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tabs" }] : /* istanbul ignore next */ []));
    listClass = computed(() => tabsListVariants(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "listClass" }] : /* istanbul ignore next */ []));
    constructor() {
        // Same contentChildren + effect pattern MrButton uses to push its size down to a projected
        // MrIcon — here pushing which tab is active down to each projected MrTab.
        effect(() => {
            const selected = this._selected();
            this.tabs().forEach((tab, index) => {
                tab.active = index === selected;
            });
        });
    }
    tabButtonClass(index) {
        return tabButtonVariants({ size: this._size(), selected: index === this._selected() });
    }
    select(index) {
        const tab = this.tabs()[index];
        if (!tab || tab.disabled || index === this._selected()) {
            return;
        }
        this._selected.set(index);
        this.selectedChange.emit(index);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrTabs, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.6", type: MrTabs, isStandalone: true, selector: "mr-tabs", inputs: { selected: "selected", size: "size" }, outputs: { selectedChange: "selectedChange" }, queries: [{ propertyName: "tabs", predicate: MrTab, isSignal: true }], ngImport: i0, template: "<div>\n  <div role=\"tablist\" [class]=\"listClass()\">\n    @for (tab of tabs(); track tab.tabId; let i = $index) {\n      <button\n        type=\"button\"\n        role=\"tab\"\n        [id]=\"tab.tabId\"\n        [attr.aria-controls]=\"tab.panelId\"\n        [attr.aria-selected]=\"i === selected\"\n        [disabled]=\"tab.disabled\"\n        [class]=\"tabButtonClass(i)\"\n        (click)=\"select(i)\"\n      >\n        {{ tab.label }}\n      </button>\n    }\n  </div>\n  <ng-content></ng-content>\n</div>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrTabs, decorators: [{
            type: Component,
            args: [{ selector: 'mr-tabs', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div>\n  <div role=\"tablist\" [class]=\"listClass()\">\n    @for (tab of tabs(); track tab.tabId; let i = $index) {\n      <button\n        type=\"button\"\n        role=\"tab\"\n        [id]=\"tab.tabId\"\n        [attr.aria-controls]=\"tab.panelId\"\n        [attr.aria-selected]=\"i === selected\"\n        [disabled]=\"tab.disabled\"\n        [class]=\"tabButtonClass(i)\"\n        (click)=\"select(i)\"\n      >\n        {{ tab.label }}\n      </button>\n    }\n  </div>\n  <ng-content></ng-content>\n</div>\n" }]
        }], ctorParameters: () => [], propDecorators: { selected: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], size: [{
                type: Input
            }], tabs: [{ type: i0.ContentChildren, args: [i0.forwardRef(() => MrTab), { isSignal: true }] }] } });

var ToastStatus;
(function (ToastStatus) {
    ToastStatus["Info"] = "info";
    ToastStatus["Success"] = "success";
    ToastStatus["Warning"] = "warning";
    ToastStatus["Error"] = "error";
})(ToastStatus || (ToastStatus = {}));

const toastVariants = tv$1({
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
const toastIconVariants = tv$1({
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
const toastMessageVariants = tv$1({
    base: 'flex-1 pt-3xs text-sm text-neutral-700',
});
const toastCloseButtonVariants = tv$1({
    base: 'mt-3xs shrink-0 rounded-sm text-neutral-400 transition-colors duration-150 hover:text-neutral-600 focus-visible:outline focus-visible:outline-md focus-visible:outline-offset-2 focus-visible:outline-primary-500',
});
// The container's own positioning wrapper: click-through everywhere except where an actual toast
// card sits (each card opts back in via `toastVariants`' own `pointer-events-auto`).
const toastListVariants = tv$1({
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.1.6", type: MrToast, isStandalone: true, selector: "mr-toast", inputs: { toast: "toast" }, outputs: { dismissed: "dismissed" }, ngImport: i0, template: "<div [class]=\"toastClass()\" [attr.role]=\"role()\" [attr.aria-live]=\"role() === 'alert' ? 'assertive' : 'polite'\">\n  <mr-icon [name]=\"iconName()\" size=\"sm\" [class]=\"iconClass()\" />\n  <span [class]=\"messageClass\">{{ toast.message }}</span>\n  <button type=\"button\" [class]=\"closeButtonClass\" aria-label=\"Dismiss\" (click)=\"dismiss()\">\n    <mr-icon name=\"x\" size=\"sm\" />\n  </button>\n</div>\n", dependencies: [{ kind: "component", type: MrIcon$1, selector: "mr-icon", inputs: ["name", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrToast, decorators: [{
            type: Component,
            args: [{ selector: 'mr-toast', imports: [MrIcon$1], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [class]=\"toastClass()\" [attr.role]=\"role()\" [attr.aria-live]=\"role() === 'alert' ? 'assertive' : 'polite'\">\n  <mr-icon [name]=\"iconName()\" size=\"sm\" [class]=\"iconClass()\" />\n  <span [class]=\"messageClass\">{{ toast.message }}</span>\n  <button type=\"button\" [class]=\"closeButtonClass\" aria-label=\"Dismiss\" (click)=\"dismiss()\">\n    <mr-icon name=\"x\" size=\"sm\" />\n  </button>\n</div>\n" }]
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

var ToggleSize;
(function (ToggleSize) {
    ToggleSize["Xs"] = "xs";
    ToggleSize["Sm"] = "sm";
    ToggleSize["Md"] = "md";
    ToggleSize["Lg"] = "lg";
    ToggleSize["Xl"] = "xl";
})(ToggleSize || (ToggleSize = {}));
var ToggleStatus;
(function (ToggleStatus) {
    ToggleStatus["Default"] = "default";
    ToggleStatus["Error"] = "error";
    ToggleStatus["Success"] = "success";
    ToggleStatus["Warning"] = "warning";
})(ToggleStatus || (ToggleStatus = {}));

const toggleTrackVariants = tv$1({
    base: 'relative inline-flex shrink-0 items-center rounded-pill border border-neutral-300 bg-neutral-200 transition-colors duration-150',
    variants: {
        size: {
            xs: 'h-4 w-7',
            sm: 'h-5 w-9',
            md: 'h-6 w-10',
            lg: 'h-7 w-12',
            xl: 'h-8 w-14',
        },
        // No standalone classes — an unchecked track is always neutral gray; only a checked track's
        // fill color is resolved per `status`, below.
        status: {
            default: '',
            error: '',
            success: '',
            warning: '',
        },
        checked: {
            true: '',
            false: '',
        },
        disabled: {
            true: 'cursor-not-allowed opacity-40',
            false: 'cursor-pointer',
        },
    },
    compoundVariants: [
        { status: ToggleStatus.Default, checked: true, class: 'border-primary-500 bg-primary-500' },
        { status: ToggleStatus.Error, checked: true, class: 'border-error-500 bg-error-500' },
        { status: ToggleStatus.Success, checked: true, class: 'border-success-500 bg-success-500' },
        { status: ToggleStatus.Warning, checked: true, class: 'border-warning-500 bg-warning-500' },
    ],
    defaultVariants: {
        size: ToggleSize.Md,
        status: ToggleStatus.Default,
        checked: false,
        disabled: false,
    },
});
const toggleThumbVariants = tv$1({
    base: 'pointer-events-none absolute left-0.5 top-1/2 -translate-y-1/2 rounded-pill bg-white shadow-sm transition-transform duration-150',
    variants: {
        size: {
            xs: 'h-3 w-3',
            sm: 'h-4 w-4',
            md: 'h-5 w-5',
            lg: 'h-6 w-6',
            xl: 'h-7 w-7',
        },
        // The actual slide distance depends on both size (track width - thumb size) and checked —
        // resolved per size below rather than a single shared distance.
        checked: {
            true: '',
            false: '',
        },
    },
    compoundVariants: [
        { size: ToggleSize.Xs, checked: true, class: 'translate-x-3' },
        { size: ToggleSize.Sm, checked: true, class: 'translate-x-4' },
        { size: ToggleSize.Md, checked: true, class: 'translate-x-4' },
        { size: ToggleSize.Lg, checked: true, class: 'translate-x-5' },
        { size: ToggleSize.Xl, checked: true, class: 'translate-x-6' },
    ],
    defaultVariants: {
        size: ToggleSize.Md,
        checked: false,
    },
});

let nextToggleId = 0;
class MrToggle {
    inputId = `mr-toggle-${nextToggleId++}`;
    label;
    _size = signal(ToggleSize.Md, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_size" }] : /* istanbul ignore next */ []));
    set size(value) {
        this._size.set(value);
    }
    get size() {
        return this._size();
    }
    _status = signal(ToggleStatus.Default, /* @ts-ignore */
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
    checked = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "checked" }] : /* istanbul ignore next */ []));
    trackClass = computed(() => toggleTrackVariants({
        size: this._size(),
        status: this._status(),
        checked: this.checked(),
        disabled: this._disabled(),
    }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "trackClass" }] : /* istanbul ignore next */ []));
    thumbClass = computed(() => toggleThumbVariants({ size: this._size(), checked: this.checked() }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "thumbClass" }] : /* istanbul ignore next */ []));
    onChange = () => { };
    onTouched = () => { };
    writeValue(value) {
        this.checked.set(!!value);
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
    handleChange(event) {
        const value = event.target.checked;
        this.checked.set(value);
        this.onChange(value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrToggle, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.6", type: MrToggle, isStandalone: true, selector: "mr-toggle", inputs: { label: "label", size: "size", status: "status", disabled: "disabled", required: "required" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => MrToggle),
                multi: true,
            },
        ], ngImport: i0, template: "<label [for]=\"inputId\" class=\"inline-flex cursor-pointer select-none items-center gap-xs\">\n  <span class=\"relative inline-flex\">\n    <input\n      [id]=\"inputId\"\n      type=\"checkbox\"\n      role=\"switch\"\n      class=\"absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed\"\n      [checked]=\"checked()\"\n      [disabled]=\"disabled\"\n      [required]=\"required\"\n      [attr.aria-checked]=\"checked()\"\n      (change)=\"handleChange($event)\"\n      (blur)=\"onTouched()\"\n    />\n    <span [class]=\"trackClass()\" aria-hidden=\"true\">\n      <span [class]=\"thumbClass()\"></span>\n    </span>\n  </span>\n  @if (label) {\n    <span class=\"label-2 text-neutral-700\">{{ label }}</span>\n  }\n</label>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrToggle, decorators: [{
            type: Component,
            args: [{ selector: 'mr-toggle', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => MrToggle),
                            multi: true,
                        },
                    ], template: "<label [for]=\"inputId\" class=\"inline-flex cursor-pointer select-none items-center gap-xs\">\n  <span class=\"relative inline-flex\">\n    <input\n      [id]=\"inputId\"\n      type=\"checkbox\"\n      role=\"switch\"\n      class=\"absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed\"\n      [checked]=\"checked()\"\n      [disabled]=\"disabled\"\n      [required]=\"required\"\n      [attr.aria-checked]=\"checked()\"\n      (change)=\"handleChange($event)\"\n      (blur)=\"onTouched()\"\n    />\n    <span [class]=\"trackClass()\" aria-hidden=\"true\">\n      <span [class]=\"thumbClass()\"></span>\n    </span>\n  </span>\n  @if (label) {\n    <span class=\"label-2 text-neutral-700\">{{ label }}</span>\n  }\n</label>\n" }]
        }], propDecorators: { label: [{
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

var TooltipPosition;
(function (TooltipPosition) {
    TooltipPosition["Top"] = "top";
    TooltipPosition["Bottom"] = "bottom";
    TooltipPosition["Left"] = "left";
    TooltipPosition["Right"] = "right";
})(TooltipPosition || (TooltipPosition = {}));

const tooltipPanelVariants = tv$1({
    base: 'pointer-events-none max-w-xs rounded-sm bg-neutral-600 px-sm py-2xs font-sans text-xs text-white shadow-md',
});
/** Each position tries its preferred side first, then falls back to the opposite side if it doesn't fit. */
const TOOLTIP_POSITIONS = {
    [TooltipPosition.Top]: [
        { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -8 },
        { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 8 },
    ],
    [TooltipPosition.Bottom]: [
        { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 8 },
        { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -8 },
    ],
    [TooltipPosition.Left]: [
        { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -8 },
        { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 8 },
    ],
    [TooltipPosition.Right]: [
        { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 8 },
        { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -8 },
    ],
};

let nextTooltipId = 0;
class MrTooltip {
    tooltipId = `mr-tooltip-${nextTooltipId++}`;
    text;
    /** Delay in ms before showing on hover — avoids flicker when the pointer just passes over the trigger. */
    showDelay = 150;
    /** Delay in ms before hiding on mouse-leave. */
    hideDelay = 0;
    _position = signal(TooltipPosition.Top, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_position" }] : /* istanbul ignore next */ []));
    set position(value) {
        this._position.set(value);
    }
    get position() {
        return this._position();
    }
    isOpen = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isOpen" }] : /* istanbul ignore next */ []));
    positions = computed(() => TOOLTIP_POSITIONS[this._position()], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "positions" }] : /* istanbul ignore next */ []));
    panelClass = computed(() => tooltipPanelVariants(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "panelClass" }] : /* istanbul ignore next */ []));
    showTimeoutId;
    hideTimeoutId;
    ngOnDestroy() {
        this.clearTimeouts();
    }
    scheduleShow() {
        this.clearTimeouts();
        this.showTimeoutId = setTimeout(() => this.isOpen.set(true), this.showDelay);
    }
    scheduleHide() {
        this.clearTimeouts();
        this.hideTimeoutId = setTimeout(() => this.isOpen.set(false), this.hideDelay);
    }
    /** Immediate, no delay — used for focus/blur/Escape so keyboard users never wait on it. */
    show() {
        this.clearTimeouts();
        this.isOpen.set(true);
    }
    hide() {
        this.clearTimeouts();
        this.isOpen.set(false);
    }
    clearTimeouts() {
        clearTimeout(this.showTimeoutId);
        clearTimeout(this.hideTimeoutId);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrTooltip, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.1.6", type: MrTooltip, isStandalone: true, selector: "mr-tooltip", inputs: { text: "text", showDelay: "showDelay", hideDelay: "hideDelay", position: "position" }, ngImport: i0, template: "<span\n  #origin=\"cdkOverlayOrigin\"\n  cdkOverlayOrigin\n  class=\"inline-flex\"\n  [attr.aria-describedby]=\"isOpen() ? tooltipId : null\"\n  (mouseenter)=\"scheduleShow()\"\n  (mouseleave)=\"scheduleHide()\"\n  (focusin)=\"show()\"\n  (focusout)=\"hide()\"\n  (keydown.escape)=\"hide()\"\n>\n  <ng-content></ng-content>\n</span>\n\n<ng-template\n  cdkConnectedOverlay\n  [cdkConnectedOverlayOrigin]=\"origin\"\n  [cdkConnectedOverlayOpen]=\"isOpen()\"\n  [cdkConnectedOverlayPositions]=\"positions()\"\n  [cdkConnectedOverlayHasBackdrop]=\"false\"\n>\n  <div [id]=\"tooltipId\" role=\"tooltip\" [class]=\"panelClass()\">{{ text }}</div>\n</ng-template>\n", dependencies: [{ kind: "ngmodule", type: OverlayModule }, { kind: "directive", type: i1.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush", "cdkConnectedOverlayDisposeOnNavigation", "cdkConnectedOverlayUsePopover", "cdkConnectedOverlayMatchWidth", "cdkConnectedOverlay"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i1.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrTooltip, decorators: [{
            type: Component,
            args: [{ selector: 'mr-tooltip', imports: [OverlayModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span\n  #origin=\"cdkOverlayOrigin\"\n  cdkOverlayOrigin\n  class=\"inline-flex\"\n  [attr.aria-describedby]=\"isOpen() ? tooltipId : null\"\n  (mouseenter)=\"scheduleShow()\"\n  (mouseleave)=\"scheduleHide()\"\n  (focusin)=\"show()\"\n  (focusout)=\"hide()\"\n  (keydown.escape)=\"hide()\"\n>\n  <ng-content></ng-content>\n</span>\n\n<ng-template\n  cdkConnectedOverlay\n  [cdkConnectedOverlayOrigin]=\"origin\"\n  [cdkConnectedOverlayOpen]=\"isOpen()\"\n  [cdkConnectedOverlayPositions]=\"positions()\"\n  [cdkConnectedOverlayHasBackdrop]=\"false\"\n>\n  <div [id]=\"tooltipId\" role=\"tooltip\" [class]=\"panelClass()\">{{ text }}</div>\n</ng-template>\n" }]
        }], propDecorators: { text: [{
                type: Input,
                args: [{ required: true }]
            }], showDelay: [{
                type: Input
            }], hideDelay: [{
                type: Input
            }], position: [{
                type: Input
            }] } });

/**
 * Root barrel. Prefer importing from a component's own sub-path
 * (`@meridian/ui/button`) instead — see CONVENTIONS.md. This barrel exists only
 * for consumers who genuinely want the whole library at once.
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AvatarShape, AvatarSize, BadgeColor, BadgeVariant, ButtonColor, ButtonRadius, ButtonShape, ButtonSize, ButtonStatus, ButtonVariant, CHECKBOX_ICON_SIZE, CardPadding, CardVariant, CheckboxSize, CheckboxStatus, DROPDOWN_POSITIONS, DropdownPosition, ICON_SIZE_PX, IconSize, InputFieldSize, InputFieldStatus, LabelSize, MERIDIAN_ICONS, ModalSize, MrAvatar, MrBadge, MrButton, MrCard, MrCheckbox, MrDropdown, MrDropdownItem, MrIcon, MrInputField, MrLabel, MrModal, MrPagination, MrRadio, MrSelect, MrSpinner, MrTab, MrTable, MrTabs, MrToast, MrToastContainer, MrToastService, MrToggle, MrTooltip, PaginationSize, RadioSize, RadioStatus, SelectSize, SelectStatus, SpinnerColor, SpinnerSize, TOOLTIP_POSITIONS, TableSize, TabsSize, ToastStatus, ToggleSize, ToggleStatus, TooltipPosition, avatarVariants, badgeVariants, buttonVariants, cardVariants, checkboxBoxVariants, dropdownItemVariants, dropdownPanelVariants, iconVariants, inputFieldHelperVariants, inputFieldVariants, labelVariants, modalPanelVariants, paginationButtonVariants, paginationEllipsisVariants, paginationNavVariants, provideMeridianIcons, radioBoxVariants, radioDotVariants, selectHelperVariants, selectOptionVariants, selectPanelVariants, selectTriggerVariants, selectValueVariants, spinnerVariants, tabButtonVariants, tableBodyRowVariants, tableCellVariants, tableHeaderCellVariants, tableHeaderRowVariants, tableVariants, tableWrapperVariants, tabsListVariants, toastCloseButtonVariants, toastIconVariants, toastListVariants, toastMessageVariants, toastVariants, toggleThumbVariants, toggleTrackVariants, tooltipPanelVariants };
//# sourceMappingURL=meridian-ui.mjs.map
