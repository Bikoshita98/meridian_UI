import * as _angular_cdk_overlay from '@angular/cdk/overlay';
import { ConnectedPosition } from '@angular/cdk/overlay';
import * as _angular_core from '@angular/core';
import { OnDestroy } from '@angular/core';
import * as tailwind_variants from 'tailwind-variants';

declare enum TooltipPosition {
    Top = "top",
    Bottom = "bottom",
    Left = "left",
    Right = "right"
}

declare class MrTooltip implements OnDestroy {
    protected readonly tooltipId: string;
    text: string;
    /** Delay in ms before showing on hover — avoids flicker when the pointer just passes over the trigger. */
    showDelay: number;
    /** Delay in ms before hiding on mouse-leave. */
    hideDelay: number;
    private readonly _position;
    set position(value: `${TooltipPosition}`);
    get position(): `${TooltipPosition}`;
    protected readonly isOpen: _angular_core.WritableSignal<boolean>;
    protected readonly positions: _angular_core.Signal<_angular_cdk_overlay.ConnectedPosition[]>;
    protected readonly panelClass: _angular_core.Signal<string>;
    private showTimeoutId?;
    private hideTimeoutId?;
    ngOnDestroy(): void;
    protected scheduleShow(): void;
    protected scheduleHide(): void;
    /** Immediate, no delay — used for focus/blur/Escape so keyboard users never wait on it. */
    protected show(): void;
    protected hide(): void;
    private clearTimeouts;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MrTooltip, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<MrTooltip, "mr-tooltip", never, { "text": { "alias": "text"; "required": true; }; "showDelay": { "alias": "showDelay"; "required": false; }; "hideDelay": { "alias": "hideDelay"; "required": false; }; "position": { "alias": "position"; "required": false; }; }, {}, never, ["*"], true, never>;
}

declare const tooltipPanelVariants: tailwind_variants.TVReturnType<{} | {} | {}, undefined, "pointer-events-none max-w-xs rounded-sm bg-neutral-600 px-sm py-2xs font-sans text-xs text-white shadow-md", {} | {}, undefined, tailwind_variants.TVReturnTypeLike<unknown, undefined>>;
/** Each position tries its preferred side first, then falls back to the opposite side if it doesn't fit. */
declare const TOOLTIP_POSITIONS: Record<`${TooltipPosition}`, ConnectedPosition[]>;

export { MrTooltip, TOOLTIP_POSITIONS, TooltipPosition, tooltipPanelVariants };
