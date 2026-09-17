import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MrToast } from './toast.component';
import { MrToastService } from './toast.service';
import { toastListVariants } from './toast.variants';

// Matches the `lg` semantic spacing token (16px) — CDK's global position strategy takes a raw CSS
// length, not a Tailwind class, so it can't reference that token by name the way a template can.
const CONTAINER_OFFSET = '16px';

/**
 * Mount exactly one of these (e.g. at the app root) to render whatever `MrToastService` queues
 * up. Built on CDK Overlay's imperative API, same as `modal` — not for a backdrop or connected
 * positioning (a toast needs neither), but so it shares the same overlay stacking layer and
 * reliably renders above a `modal`/`dropdown`/`select` panel rather than under one.
 */
@Component({
  selector: 'mr-toast-container',
  imports: [MrToast],
  templateUrl: './toast-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MrToastContainer implements OnInit, OnDestroy {
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);
  protected readonly toastService = inject(MrToastService);

  @ViewChild('containerTemplate', { static: true }) private readonly containerTemplate!: TemplateRef<unknown>;

  protected readonly listClass = toastListVariants();

  private overlayRef?: OverlayRef;

  ngOnInit(): void {
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().top(CONTAINER_OFFSET).right(CONTAINER_OFFSET),
    });
    this.overlayRef.attach(new TemplatePortal(this.containerTemplate, this.viewContainerRef));
  }

  ngOnDestroy(): void {
    this.overlayRef?.dispose();
    this.overlayRef = undefined;
  }

  protected dismiss(id: number): void {
    this.toastService.dismiss(id);
  }
}
