import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MrAvatar } from './avatar.component';
import { AvatarShape, AvatarSize } from './avatar.enums';

@Component({
  imports: [MrAvatar],
  template: `
    <mr-avatar
      [src]="src"
      [alt]="alt"
      [name]="name"
      [initials]="initials"
      [size]="size"
      [shape]="shape"
    ></mr-avatar>
  `,
})
class AvatarHost {
  @Input() src: string | undefined = undefined;
  @Input() alt = '';
  @Input() name: string | undefined = undefined;
  @Input() initials: string | undefined = undefined;
  @Input() size: `${AvatarSize}` = AvatarSize.Md;
  @Input() shape: `${AvatarShape}` = AvatarShape.Circle;
}

describe('MrAvatar', () => {
  let fixture: ComponentFixture<AvatarHost>;

  const root = (): HTMLElement => fixture.nativeElement.querySelector('span');
  const img = (): HTMLImageElement | null => fixture.nativeElement.querySelector('img');
  const fallback = (): HTMLElement | null => fixture.nativeElement.querySelector('span > span');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarHost],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarHost);
  });

  it('creates', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('defaults to the md size with a circle shape', () => {
    fixture.detectChanges();
    expect(root().className).toContain('h-9');
    expect(root().className).toContain('w-9');
    expect(root().className).toContain('rounded-pill');
  });

  it('applies a size and shape', () => {
    fixture.componentRef.setInput('size', AvatarSize.Xl);
    fixture.componentRef.setInput('shape', AvatarShape.Square);
    fixture.detectChanges();
    expect(root().className).toContain('h-12');
    expect(root().className).toContain('w-12');
    expect(root().className).toContain('rounded-lg');
  });

  it('renders an initials fallback derived from name when there is no src', () => {
    fixture.componentRef.setInput('name', 'Ada Lovelace');
    fixture.detectChanges();

    expect(img()).toBeNull();
    expect(fallback()?.textContent?.trim()).toBe('AL');
    expect(root().getAttribute('role')).toBe('img');
    expect(root().getAttribute('aria-label')).toBe('Ada Lovelace');
  });

  it('prefers an explicit initials input over one derived from name', () => {
    fixture.componentRef.setInput('name', 'Ada Lovelace');
    fixture.componentRef.setInput('initials', 'X');
    fixture.detectChanges();

    expect(fallback()?.textContent?.trim()).toBe('X');
  });

  it('renders an image when src is set', () => {
    fixture.componentRef.setInput('src', 'https://example.com/avatar.png');
    fixture.componentRef.setInput('name', 'Ada Lovelace');
    fixture.detectChanges();

    expect(img()?.src).toBe('https://example.com/avatar.png');
    expect(img()?.alt).toBe('Ada Lovelace');
    expect(root().getAttribute('role')).toBeNull();
  });

  it('falls back to initials when the image fails to load', () => {
    fixture.componentRef.setInput('src', 'https://example.com/broken.png');
    fixture.componentRef.setInput('name', 'Ada Lovelace');
    fixture.detectChanges();

    img()!.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    expect(img()).toBeNull();
    expect(fallback()?.textContent?.trim()).toBe('AL');
  });
});
