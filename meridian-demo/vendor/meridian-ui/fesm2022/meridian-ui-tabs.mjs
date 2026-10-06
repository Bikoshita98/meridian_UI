import * as i0 from '@angular/core';
import { signal, Input, ChangeDetectionStrategy, Component, EventEmitter, contentChildren, computed, effect, Output } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { tv } from 'tailwind-variants';

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

const tabsListVariants = tv({
    base: 'flex items-center gap-lg border-b border-neutral-200',
});
const tabButtonVariants = tv({
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

/**
 * Generated bundle index. Do not edit.
 */

export { MrTab, MrTabs, TabsSize, tabButtonVariants, tabsListVariants };
//# sourceMappingURL=meridian-ui-tabs.mjs.map
