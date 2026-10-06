import * as i0 from '@angular/core';
import { signal, computed, Input, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i1 from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import { tv } from 'tailwind-variants';

var TooltipPosition;
(function (TooltipPosition) {
    TooltipPosition["Top"] = "top";
    TooltipPosition["Bottom"] = "bottom";
    TooltipPosition["Left"] = "left";
    TooltipPosition["Right"] = "right";
})(TooltipPosition || (TooltipPosition = {}));

const tooltipPanelVariants = tv({
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
 * Generated bundle index. Do not edit.
 */

export { MrTooltip, TOOLTIP_POSITIONS, TooltipPosition, tooltipPanelVariants };
//# sourceMappingURL=meridian-ui-tooltip.mjs.map
