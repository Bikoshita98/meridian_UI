import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, signal } from '@angular/core';

import { MrCard } from '@meridian/ui/card';
import { MrIcon } from '@meridian/ui/icon';

type UsageTab = 'html' | 'ts';

@Component({
  selector: 'app-usage-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MrCard, MrIcon],
  templateUrl: './usage-block.html',
})
export class UsageBlock {
  private readonly destroyRef = inject(DestroyRef);

  readonly name = input.required<string>();
  readonly html = input.required<string>();
  readonly ts = input.required<string>();

  protected readonly activeTab = signal<UsageTab>('html');
  protected readonly copied = signal(false);

  protected setTab(tab: UsageTab): void {
    this.activeTab.set(tab);
  }

  protected async copyCode(): Promise<void> {
    const code = this.activeTab() === 'html' ? this.html() : this.ts();
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      return;
    }
    this.copied.set(true);
    const timeout = setTimeout(() => this.copied.set(false), 1500);
    this.destroyRef.onDestroy(() => clearTimeout(timeout));
  }
}
