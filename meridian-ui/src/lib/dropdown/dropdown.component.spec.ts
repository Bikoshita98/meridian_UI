import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MrDropdownItem } from './dropdown-item.component';
import { MrDropdown } from './dropdown.component';

@Component({
  imports: [MrDropdown, MrDropdownItem],
  template: `
    <mr-dropdown>
      <button type="button">Open menu</button>
      <mr-dropdown-item (click)="onSelect('one')">One</mr-dropdown-item>
      <mr-dropdown-item [disabled]="twoDisabled" (click)="onSelect('two')">Two</mr-dropdown-item>
      <mr-dropdown-item (click)="onSelect('three')">Three</mr-dropdown-item>
    </mr-dropdown>
  `,
})
class DropdownHost {
  twoDisabled = false;
  selected: string[] = [];

  onSelect(value: string): void {
    this.selected.push(value);
  }
}

describe('MrDropdown + MrDropdownItem', () => {
  let fixture: ComponentFixture<DropdownHost>;
  let overlayContainer: OverlayContainer;
  let trigger: HTMLButtonElement;

  const menu = (): HTMLElement | null => overlayContainer.getContainerElement().querySelector('[role="menu"]');
  const menuItems = (): HTMLButtonElement[] =>
    Array.from(overlayContainer.getContainerElement().querySelectorAll('[role="menuitem"]'));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownHost],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownHost);
    fixture.detectChanges();
    trigger = fixture.nativeElement.querySelector('button');
    overlayContainer = TestBed.inject(OverlayContainer);
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('creates', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('is closed by default', () => {
    expect(menu()).toBeFalsy();
  });

  it('opens on trigger click and renders every projected item', () => {
    trigger.click();
    fixture.detectChanges();

    expect(menu()).toBeTruthy();
    const labels = menuItems().map((el) => el.textContent?.trim());
    expect(labels).toEqual(['One', 'Two', 'Three']);
  });

  it('focuses the first item when opened', () => {
    trigger.click();
    fixture.detectChanges();

    expect(document.activeElement).toBe(menuItems()[0]);
  });

  it('ArrowDown moves focus to the next item', () => {
    trigger.click();
    fixture.detectChanges();

    // CDK's ListKeyManager reads the legacy `keyCode` (40 = down arrow), not just `key` — jsdom's
    // KeyboardEvent constructor doesn't derive one from `key` automatically, so it must be explicit.
    menu()!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', keyCode: 40, bubbles: true }));
    fixture.detectChanges();

    expect(document.activeElement).toBe(menuItems()[1]);
  });

  it('closes when an item is clicked, and the item\'s own click handler still fires', () => {
    trigger.click();
    fixture.detectChanges();

    menuItems()[2].click();
    fixture.detectChanges();

    expect(menu()).toBeFalsy();
    expect(fixture.componentInstance.selected).toEqual(['three']);
  });

  it('does not close or fire the click handler for a disabled item', () => {
    fixture.componentInstance.twoDisabled = true;
    fixture.detectChanges();

    trigger.click();
    fixture.detectChanges();
    menuItems()[1].click();
    fixture.detectChanges();

    expect(menu()).toBeTruthy();
    expect(fixture.componentInstance.selected).toEqual([]);
  });

  it('closes on Escape', () => {
    trigger.click();
    fixture.detectChanges();
    expect(menu()).toBeTruthy();

    menu()!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();

    expect(menu()).toBeFalsy();
  });

  it('closes on a backdrop click (clicking outside the panel)', () => {
    trigger.click();
    fixture.detectChanges();
    expect(menu()).toBeTruthy();

    (overlayContainer.getContainerElement().querySelector('.cdk-overlay-backdrop') as HTMLElement).click();
    fixture.detectChanges();

    expect(menu()).toBeFalsy();
  });
});
