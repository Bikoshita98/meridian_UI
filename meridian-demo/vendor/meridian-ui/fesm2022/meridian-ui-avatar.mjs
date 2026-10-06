import * as i0 from '@angular/core';
import { signal, computed, Input, ChangeDetectionStrategy, Component } from '@angular/core';
import { tv } from 'tailwind-variants';

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

const avatarVariants = tv({
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

/**
 * Generated bundle index. Do not edit.
 */

export { AvatarShape, AvatarSize, MrAvatar, avatarVariants };
//# sourceMappingURL=meridian-ui-avatar.mjs.map
