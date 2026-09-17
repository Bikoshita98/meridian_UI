import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MrCard } from './card.component';
import { CardPadding, CardVariant } from './card.enums';

@Component({
  imports: [MrCard],
  template: `
    <mr-card [variant]="variant" [padding]="padding">
      <p>Card content</p>
    </mr-card>
  `,
})
class CardHost {
  @Input() variant: `${CardVariant}` = CardVariant.Elevated;
  @Input() padding: `${CardPadding}` = CardPadding.Md;
}

describe('MrCard', () => {
  let fixture: ComponentFixture<CardHost>;

  const card = (): HTMLElement => fixture.nativeElement.querySelector('div');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardHost],
    }).compileComponents();

    fixture = TestBed.createComponent(CardHost);
  });

  it('creates', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders projected content', () => {
    fixture.detectChanges();
    expect(card().textContent?.trim()).toBe('Card content');
  });

  it('defaults to the elevated variant with medium padding', () => {
    fixture.detectChanges();
    expect(card().className).toContain('shadow-md');
    expect(card().className).toContain('p-xl');
  });

  it('applies the outlined variant, dropping the shadow', () => {
    fixture.componentRef.setInput('variant', CardVariant.Outlined);
    fixture.detectChanges();
    expect(card().className).toContain('border-neutral-200');
    expect(card().className).not.toContain('shadow-md');
  });

  it('applies a padding size', () => {
    fixture.componentRef.setInput('padding', CardPadding.None);
    fixture.detectChanges();
    expect(card().className).toContain('p-0');
  });
});
