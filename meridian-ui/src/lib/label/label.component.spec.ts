import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MrLabel } from './label.component';
import { LabelSize } from './label.enums';

describe('MrLabel', () => {
  let fixture: ComponentFixture<MrLabel>;
  let label: HTMLLabelElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrLabel],
    }).compileComponents();

    fixture = TestBed.createComponent(MrLabel);
    label = fixture.nativeElement.querySelector('label');
  });

  it('creates', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('defaults to the md size (label-2 typography)', () => {
    fixture.detectChanges();
    expect(label.className).toContain('label-2');
  });

  it('reflects a different size', () => {
    fixture.componentRef.setInput('size', LabelSize.Lg);
    fixture.detectChanges();
    expect(label.className).toContain('label-1');
  });

  it('forwards the for input to the native for attribute', () => {
    fixture.componentRef.setInput('for', 'email-input');
    fixture.detectChanges();
    expect(label.getAttribute('for')).toBe('email-input');
  });

  it('does not show a required marker by default', () => {
    fixture.detectChanges();
    expect(label.textContent).not.toContain('*');
  });

  it('shows a required marker when required', () => {
    fixture.componentRef.setInput('required', '');
    fixture.detectChanges();
    expect(label.textContent).toContain('*');
  });

  it('dims itself when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(label.className).toContain('opacity-40');
  });
});
