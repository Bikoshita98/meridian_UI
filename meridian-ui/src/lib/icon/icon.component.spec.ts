import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';
import { MrIcon } from './icon.component';
import { IconSize } from './icon.enums';

describe('MrIcon', () => {
  let fixture: ComponentFixture<MrIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrIcon],
      providers: [provideIcons({ check: lucideCheck })],
    }).compileComponents();

    fixture = TestBed.createComponent(MrIcon);
    fixture.componentRef.setInput('name', 'check');
  });

  it('creates', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('resolves the requested icon into an inline svg', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ng-icon svg')).toBeTruthy();
  });

  it('defaults to the md size (16px)', () => {
    fixture.detectChanges();
    const ngIcon = fixture.nativeElement.querySelector('ng-icon');
    expect(ngIcon.style.getPropertyValue('--ng-icon__size')).toBe('16px');
  });

  it('resolves a different pixel size when the size input changes', () => {
    fixture.componentRef.setInput('size', IconSize.Xl);
    fixture.detectChanges();
    const ngIcon = fixture.nativeElement.querySelector('ng-icon');
    expect(ngIcon.style.getPropertyValue('--ng-icon__size')).toBe('24px');
  });
});
