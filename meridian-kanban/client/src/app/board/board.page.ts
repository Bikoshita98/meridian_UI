import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';
import { MrAvatar } from '@meridian/ui/avatar';
import { MrBadge } from '@meridian/ui/badge';
import { MrButton } from '@meridian/ui/button';
import { MrCard } from '@meridian/ui/card';
import { MrDropdown, MrDropdownItem } from '@meridian/ui/dropdown';
import { MrIcon } from '@meridian/ui/icon';
import { MrInputField } from '@meridian/ui/input-field';
import { MrModal } from '@meridian/ui/modal';
import { MrSelect } from '@meridian/ui/select';
import type { SelectOption } from '@meridian/ui/select';
import { MrSpinner } from '@meridian/ui/spinner';
import { RealtimeService } from '../realtime/realtime.service';
import type { Card, Column, User } from '../realtime/protocol';
import { USERNAME_STORAGE_KEY } from '../session';
import {
  COLUMN_ACCENT_CLASSES,
  COVER_COLOR_CLASSES,
  COVER_COLOR_OPTIONS,
  LABEL_PRESETS,
  formatDueDate,
  isOverdue,
  type BadgeColorName,
} from './board.presets';

type CardEditorState = {
  mode: 'create' | 'edit';
  columnId: string;
  cardId?: string;
  title: string;
  description: string;
  assigneeId?: string;
  labelIds: string[];
  dueDate?: string;
  coverColor?: string;
};

@Component({
  selector: 'app-board-page',
  imports: [
    FormsModule,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    MrAvatar,
    MrBadge,
    MrButton,
    MrCard,
    MrDropdown,
    MrDropdownItem,
    MrIcon,
    MrInputField,
    MrModal,
    MrSelect,
    MrSpinner,
  ],
  templateUrl: './board.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly realtime = inject(RealtimeService);

  protected readonly board = this.realtime.board;
  protected readonly users = this.realtime.users;
  protected readonly knownUsers = this.realtime.knownUsers;
  protected readonly status = this.realtime.status;

  // Only board members currently present can be *picked* as a new assignee — plus whoever the
  // card being edited is already assigned to, even if they've since gone offline, so editing
  // doesn't silently clear a valid assignment just because that person isn't online right now.
  protected readonly assigneeOptions = computed<SelectOption<string>[]>(() => {
    const present = new Map(this.users().map((u) => [u.id, u]));
    const editorAssigneeId = this.cardEditor()?.assigneeId;
    if (editorAssigneeId && !present.has(editorAssigneeId)) {
      const known = this.knownUsers()[editorAssigneeId];
      if (known) present.set(known.id, known);
    }
    return [{ label: 'Unassigned', value: '' }, ...[...present.values()].map((u) => ({ label: u.name, value: u.id }))];
  });

  protected readonly sortedColumns = computed<Column[]>(() => [...(this.board()?.columns ?? [])].sort((a, b) => a.order - b.order));
  protected readonly columnIds = computed(() => this.sortedColumns().map((c) => c.id));

  protected readonly labelPresets = LABEL_PRESETS;
  protected readonly coverColorOptions = COVER_COLOR_OPTIONS;
  protected readonly formatDueDate = formatDueDate;
  protected readonly isOverdue = isOverdue;

  protected readonly newColumnName = signal('');
  protected readonly cardEditor = signal<CardEditorState | null>(null);
  protected readonly editingColumnId = signal<string | null>(null);
  protected readonly editingColumnName = signal('');

  constructor() {
    const boardId = this.route.snapshot.paramMap.get('id')!;
    const userName = sessionStorage.getItem(USERNAME_STORAGE_KEY);

    if (!userName) {
      this.router.navigate(['/'], { queryParams: { board: boardId } });
      return;
    }

    const boardName = (history.state as { boardName?: string } | null)?.boardName;
    this.realtime.connect(boardId, userName, boardName);

    effect(() => {
      // Keep the tab title in sync with the board name once we know it.
      const name = this.board()?.name;
      if (name) document.title = `${name} · Meridian Kanban`;
    });
  }

  protected cardsIn(columnId: string): Card[] {
    return (this.board()?.cards ?? []).filter((c) => c.columnId === columnId).sort((a, b) => a.order - b.order);
  }

  protected assigneeOf(card: Card): User | undefined {
    return card.assigneeId ? this.knownUsers()[card.assigneeId] : undefined;
  }

  protected labelsOn(card: Card) {
    const ids = new Set(card.labelIds ?? []);
    return this.labelPresets.filter((p) => ids.has(p.id));
  }

  protected coverClass(card: Card): string | null {
    return card.coverColor ? COVER_COLOR_CLASSES[card.coverColor as BadgeColorName] : null;
  }

  protected swatchClass(color: BadgeColorName): string {
    return COVER_COLOR_CLASSES[color];
  }

  protected columnAccentClass(index: number): string {
    return COLUMN_ACCENT_CLASSES[index % COLUMN_ACCENT_CLASSES.length];
  }

  protected toggleLabel(id: string): void {
    const editor = this.cardEditor();
    if (!editor) return;
    const has = editor.labelIds.includes(id);
    this.patchEditor({ labelIds: has ? editor.labelIds.filter((l) => l !== id) : [...editor.labelIds, id] });
  }

  protected toggleCoverColor(color: BadgeColorName): void {
    const editor = this.cardEditor();
    if (!editor) return;
    this.patchEditor({ coverColor: editor.coverColor === color ? undefined : color });
  }

  protected addColumn(): void {
    const name = this.newColumnName().trim();
    if (!name) return;
    this.realtime.createColumn(name);
    this.newColumnName.set('');
  }

  protected startRenameColumn(column: Column): void {
    this.editingColumnId.set(column.id);
    this.editingColumnName.set(column.name);
  }

  protected commitRenameColumn(columnId: string): void {
    const name = this.editingColumnName().trim();
    if (name) this.realtime.renameColumn(columnId, name);
    this.editingColumnId.set(null);
  }

  protected onColumnDrop(event: CdkDragDrop<Column[]>): void {
    const ids = this.columnIds();
    moveItemInArray(ids, event.previousIndex, event.currentIndex);
    this.realtime.reorderColumns(ids);
  }

  protected onCardDrop(event: CdkDragDrop<Card[]>, toColumnId: string): void {
    // Deliberately not calling moveItemInArray/transferArrayItem here: the array CDK is dragging
    // is a *derived* view of the `board` signal, not a source of truth we own. Calling `moveCard`
    // updates the reconciler synchronously, which flows back into `board` and re-renders the
    // correct final position — a second, real state update, not CDK's own optimistic DOM patch.
    const cardId = event.item.data as string;
    this.realtime.moveCard(cardId, toColumnId, event.currentIndex);
  }

  protected openCreateCard(columnId: string): void {
    this.cardEditor.set({ mode: 'create', columnId, title: '', description: '', labelIds: [] });
  }

  protected openEditCard(card: Card): void {
    this.cardEditor.set({
      mode: 'edit',
      columnId: card.columnId,
      cardId: card.id,
      title: card.title,
      description: card.description ?? '',
      assigneeId: card.assigneeId,
      labelIds: card.labelIds ?? [],
      dueDate: card.dueDate,
      coverColor: card.coverColor,
    });
  }

  protected closeCardEditor(): void {
    this.cardEditor.set(null);
  }

  protected saveCardEditor(): void {
    const editor = this.cardEditor();
    if (!editor || !editor.title.trim()) return;
    if (editor.mode === 'create') {
      this.realtime.createCard(editor.columnId, editor.title.trim(), editor.description.trim() || undefined);
    } else {
      this.realtime.updateCard(editor.cardId!, {
        title: editor.title.trim(),
        description: editor.description.trim() || null,
        assigneeId: editor.assigneeId || null,
        labelIds: editor.labelIds,
        dueDate: editor.dueDate || null,
        coverColor: editor.coverColor || null,
      });
    }
    this.cardEditor.set(null);
  }

  protected deleteCard(cardId: string): void {
    this.realtime.deleteCard(cardId);
  }

  protected patchEditor(patch: Partial<CardEditorState>): void {
    const current = this.cardEditor();
    if (current) this.cardEditor.set({ ...current, ...patch });
  }

  protected copyBoardLink(): void {
    navigator.clipboard?.writeText(window.location.href);
  }
}
