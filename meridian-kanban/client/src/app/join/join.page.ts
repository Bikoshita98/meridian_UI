import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MrButton } from '@meridian/ui/button';
import { MrCard } from '@meridian/ui/card';
import { MrInputField } from '@meridian/ui/input-field';
import { USERNAME_STORAGE_KEY } from '../session';

function randomBoardId(): string {
  return crypto.randomUUID().slice(0, 8);
}

@Component({
  selector: 'app-join-page',
  imports: [FormsModule, MrButton, MrCard, MrInputField],
  templateUrl: './join.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinPage {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly userName = signal(sessionStorage.getItem(USERNAME_STORAGE_KEY) ?? '');
  protected readonly boardName = signal('');
  protected readonly joinBoardId = signal(this.route.snapshot.queryParamMap.get('board') ?? '');

  protected createBoard(): void {
    if (!this.userName().trim()) return;
    sessionStorage.setItem(USERNAME_STORAGE_KEY, this.userName().trim());
    const id = randomBoardId();
    this.router.navigate(['/board', id], { state: { boardName: this.boardName().trim() || undefined } });
  }

  protected joinExistingBoard(): void {
    if (!this.userName().trim() || !this.joinBoardId().trim()) return;
    sessionStorage.setItem(USERNAME_STORAGE_KEY, this.userName().trim());
    this.router.navigate(['/board', this.joinBoardId().trim()]);
  }
}
