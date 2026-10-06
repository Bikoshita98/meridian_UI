import * as i0 from '@angular/core';
import { EventEmitter } from '@angular/core';
import * as tailwind_variants from 'tailwind-variants';

/**
 * One tab within an `<mr-tabs>`. Renders nothing on its own — `MrTabs` reads `label`/`disabled`
 * off each projected `MrTab` to build the tab-list row, and sets `active` on the one it selects.
 */
declare class MrTab {
    /** Public (not `protected`) — `MrTabs`' template reads these off each projected child. */
    readonly tabId: string;
    readonly panelId: string;
    label: string;
    private readonly _disabled;
    set disabled(value: boolean | `${boolean}` | '');
    get disabled(): boolean;
    private readonly _active;
    /** Set by the parent `MrTabs` — not meant to be bound directly by a consumer. */
    set active(value: boolean);
    get active(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<MrTab, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MrTab, "mr-tab", never, { "label": { "alias": "label"; "required": true; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, ["*"], true, never>;
}

declare enum TabsSize {
    Xs = "xs",
    Sm = "sm",
    Md = "md",
    Lg = "lg",
    Xl = "xl"
}

declare class MrTabs {
    private readonly _selected;
    set selected(value: number);
    get selected(): number;
    readonly selectedChange: EventEmitter<number>;
    private readonly _size;
    set size(value: `${TabsSize}`);
    get size(): `${TabsSize}`;
    protected readonly tabs: i0.Signal<readonly MrTab[]>;
    protected readonly listClass: i0.Signal<string>;
    constructor();
    protected tabButtonClass(index: number): string;
    protected select(index: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MrTabs, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MrTabs, "mr-tabs", never, { "selected": { "alias": "selected"; "required": false; }; "size": { "alias": "size"; "required": false; }; }, { "selectedChange": "selectedChange"; }, ["tabs"], ["*"], true, never>;
}

declare const tabsListVariants: tailwind_variants.TVReturnType<{} | {} | {}, undefined, "flex items-center gap-lg border-b border-neutral-200", {} | {}, undefined, tailwind_variants.TVReturnTypeLike<unknown, undefined>>;
declare const tabButtonVariants: tailwind_variants.TVReturnType<{
    size: {
        xs: "py-3xs text-xs";
        sm: "py-2xs text-sm";
        md: "py-xs text-base";
        lg: "py-sm text-md";
        xl: "py-md text-lg";
    };
    selected: {
        true: "";
        false: "";
    };
}, undefined, "relative -mb-px whitespace-nowrap border-b-2 border-transparent font-sans font-medium text-neutral-500 outline-none transition-colors duration-150 hover:text-neutral-700 focus-visible:outline focus-visible:outline-md focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:cursor-not-allowed disabled:text-neutral-300 disabled:hover:text-neutral-300", {
    size: {
        xs: "py-3xs text-xs";
        sm: "py-2xs text-sm";
        md: "py-xs text-base";
        lg: "py-sm text-md";
        xl: "py-md text-lg";
    };
    selected: {
        true: "";
        false: "";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    size: {
        xs: "py-3xs text-xs";
        sm: "py-2xs text-sm";
        md: "py-xs text-base";
        lg: "py-sm text-md";
        xl: "py-md text-lg";
    };
    selected: {
        true: "";
        false: "";
    };
}, undefined>>;

export { MrTab, MrTabs, TabsSize, tabButtonVariants, tabsListVariants };
