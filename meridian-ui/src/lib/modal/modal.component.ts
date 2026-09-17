import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ModalSize } from './modal.enums';
import { modalPanelVariants } from './modal.variants';

@Component({
  selector: 'mr-modal',
  imports: [A11yModule],
  templateUrl: './modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MrModal implements OnDestroy {
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);

  @ViewChild('modalTemplate') private readonly modalTemplate!: TemplateRef<unknown>;

  private readonly _open = signal(false);

  @Input()
  set open(value: boolean) {
    this._open.set(value);
  }

  get open(): boolean {
    return this._open();
  }

  @Output() readonly openChange = new EventEmitter<boolean>();

  /** Allows disabling backdrop-click-to-close for "must choose an option" modals. */
  @Input() dismissible = true;

  private readonly _size = signal<`${ModalSize}`>(ModalSize.Md);

  @Input()
  set size(value: `${ModalSize}`) {
    this._size.set(value);
  }

  get size(): `${ModalSize}` {
    return this._size();
  }

  protected readonly panelClass = computed(() => modalPanelVariants({ size: this._size() }));

  private overlayRef?: OverlayRef;
  private previouslyFocusedElement?: HTMLElement;

  constructor() {
    effect(() => {
      if (this._open()) {
        this.attach();
      } else {
        this.detach();
      }
    });
  }

  ngOnDestroy(): void {
    this.detach();
  }

  protected close(): void {
    this._open.set(false);
    this.openChange.emit(false);
  }

  private attach(): void {
    if (this.overlayRef) {
      return;
    }

    // Captured here (rather than in ngOnInit) so it's always the element that was focused
    // right before *this particular* open, not just whatever had focus when the component
    // was constructed.
    this.previouslyFocusedElement = document.activeElement as HTMLElement;

    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
    });

    this.overlayRef.backdropClick().subscribe(() => {
      if (this.dismissible) {
        this.close();
      }
    });

    this.overlayRef.attach(new TemplatePortal(this.modalTemplate, this.viewContainerRef));
  }

  private detach(): void {
    if (!this.overlayRef) {
      return;
    }

    this.overlayRef.dispose();
    this.overlayRef = undefined;

    this.previouslyFocusedElement?.focus();
    this.previouslyFocusedElement = undefined;
  }
}
