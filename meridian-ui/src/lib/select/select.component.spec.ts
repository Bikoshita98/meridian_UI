import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverlayContainer } from '@angular/cdk/overlay';
import { provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';
import { MrSelect } from './select.component';
import { SelectOption, SelectSize } from './select.enums';

const OPTIONS: SelectOption<string>[] = [
  { label: 'Red', value: 'red' },
  { label: 'Green', value: 'green' },
  { label: 'Blue', value: 'blue', disabled: true },
];

describe('MrSelect', () => {
  let fixture: ComponentFixture<MrSelect<string>>;
  let overlayContainer: OverlayContainer;
  let trigger: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrSelect],
      providers: [provideIcons({ chevronDown: lucideChevronDown })],
    }).compileComponents();

    fixture = TestBed.createComponent<MrSelect<string>>(MrSelect);
    fixture.componentRef.setInput('options', OPTIONS);
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

  it('shows the placeholder when nothing is selected', () => {
    expect(trigger.textContent).toContain('Select an option');
  });

  it('is closed by default', () => {
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('opens the options panel on trigger click', () => {
    trigger.click();
    fixture.detectChanges();

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    const panel = overlayContainer.getContainerElement();
    const optionEls = panel.querySelectorAll('li[role="option"]');
    expect(optionEls.length).toBe(3);
    expect(optionEls[0].textContent?.trim()).toBe('Red');
  });

  it('selects an option, updates the trigger label, and closes the panel', () => {
    const onChange = jest.fn();
    fixture.componentInstance.registerOnChange(onChange);

    trigger.click();
    fixture.detectChanges();
    const panel = overlayContainer.getContainerElement();
    const [redOption] = Array.from(panel.querySelectorAll('li[role="option"]')) as HTMLLIElement[];
    redOption.click();
    fixture.detectChanges();

    expect(onChange).toHaveBeenCalledWith('red');
    expect(trigger.textContent).toContain('Red');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('does not select a disabled option', () => {
    const onChange = jest.fn();
    fixture.componentInstance.registerOnChange(onChange);

    trigger.click();
    fixture.detectChanges();
    const panel = overlayContainer.getContainerElement();
    const blueOption = Array.from(panel.querySelectorAll('li[role="option"]')).find((el) =>
      el.textContent?.includes('Blue'),
    ) as HTMLLIElement;
    blueOption.click();
    fixture.detectChanges();

    expect(onChange).not.toHaveBeenCalled();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('does not open when disabled', () => {
    fixture.componentInstance.setDisabledState(true);
    fixture.detectChanges();
    trigger.click();
    fixture.detectChanges();
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('implements ControlValueAccessor: writeValue renders the matching option label', () => {
    fixture.componentInstance.writeValue('green');
    fixture.detectChanges();
    expect(trigger.textContent).toContain('Green');
  });

  it('reflects a different size as classes', () => {
    fixture.componentRef.setInput('size', SelectSize.Xl);
    fixture.detectChanges();
    expect(trigger.className).toContain('h-12');
  });
});
