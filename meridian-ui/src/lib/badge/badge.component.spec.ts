import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MrBadge } from './badge.component';
import { BadgeColor, BadgeVariant } from './badge.enums';

@Component({
  imports: [MrBadge],
  template: `
    <mr-badge [variant]="variant" [color]="color">New</mr-badge>
  `,
})
class BadgeHost {
  @Input() variant: `${BadgeVariant}` = BadgeVariant.Filled;
  @Input() color: `${BadgeColor}` = BadgeColor.Neutral;
}

describe('MrBadge', () => {
  let fixture: ComponentFixture<BadgeHost>;

  const badge = (): HTMLElement => fixture.nativeElement.querySelector('span');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeHost],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeHost);
  });

  it('creates', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders projected content', () => {
    fixture.detectChanges();
    expect(badge().textContent?.trim()).toBe('New');
  });

  it('defaults to the filled variant with the neutral color', () => {
    fixture.detectChanges();
    expect(badge().className).toContain('bg-neutral-500');
    expect(badge().className).toContain('text-white');
  });

  it('applies the outline variant for a given color', () => {
    fixture.componentRef.setInput('variant', BadgeVariant.Outline);
    fixture.componentRef.setInput('color', BadgeColor.Success);
    fixture.detectChanges();

    expect(badge().className).toContain('border-success-300');
    expect(badge().className).toContain('text-success-600');
    expect(badge().className).not.toContain('bg-success-500');
  });
});
