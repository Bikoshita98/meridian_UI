import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MrTab } from './tab.component';
import { MrTabs } from './tabs.component';
import { TabsSize } from './tabs.enums';

@Component({
  imports: [MrTabs, MrTab],
  template: `
    <mr-tabs [selected]="selected" (selectedChange)="selected = $event" [size]="size">
      <mr-tab label="One">Content One</mr-tab>
      <mr-tab label="Two" [disabled]="twoDisabled">Content Two</mr-tab>
      <mr-tab label="Three">Content Three</mr-tab>
    </mr-tabs>
  `,
})
class TabsHost {
  selected = 0;
  size: `${TabsSize}` = TabsSize.Md;
  twoDisabled = false;
}

describe('MrTabs + MrTab', () => {
  let fixture: ComponentFixture<TabsHost>;

  const tabButtons = (): HTMLButtonElement[] =>
    Array.from(fixture.nativeElement.querySelectorAll('button[role="tab"]'));
  const panels = (): HTMLElement[] => Array.from(fixture.nativeElement.querySelectorAll('[role="tabpanel"]'));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsHost],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsHost);
  });

  it('creates and renders one tab button per projected mr-tab, in order', () => {
    fixture.detectChanges();
    const labels = tabButtons().map((b) => b.textContent?.trim());
    expect(labels).toEqual(['One', 'Two', 'Three']);
  });

  it('shows only the first tab\'s panel by default', () => {
    fixture.detectChanges();
    expect(panels().length).toBe(1);
    expect(panels()[0].textContent?.trim()).toBe('Content One');
    expect(tabButtons()[0].getAttribute('aria-selected')).toBe('true');
    expect(tabButtons()[1].getAttribute('aria-selected')).toBe('false');
  });

  it('respects an initial non-zero selected input', () => {
    fixture.componentInstance.selected = 2;
    fixture.detectChanges();
    expect(panels()[0].textContent?.trim()).toBe('Content Three');
    expect(tabButtons()[2].getAttribute('aria-selected')).toBe('true');
  });

  it('switches the active tab on click and emits selectedChange', () => {
    fixture.detectChanges();
    tabButtons()[2].click();
    fixture.detectChanges();

    expect(panels()[0].textContent?.trim()).toBe('Content Three');
    expect(tabButtons()[0].getAttribute('aria-selected')).toBe('false');
    expect(tabButtons()[2].getAttribute('aria-selected')).toBe('true');
    expect(fixture.componentInstance.selected).toBe(2);
  });

  it('wires aria-controls on the tab to the panel it owns', () => {
    fixture.detectChanges();
    const controls = tabButtons()[0].getAttribute('aria-controls');
    expect(controls).toBeTruthy();
    expect(panels()[0].id).toBe(controls);
  });

  it('does not select a disabled tab (native disabled buttons never dispatch click)', () => {
    fixture.componentInstance.twoDisabled = true;
    fixture.detectChanges();

    tabButtons()[1].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.selected).toBe(0);
    expect(panels()[0].textContent?.trim()).toBe('Content One');
  });

  it('reflects a different size as classes on the tab buttons', () => {
    fixture.componentInstance.size = TabsSize.Xl;
    fixture.detectChanges();
    expect(tabButtons()[0].className).toContain('text-lg');
  });
});
