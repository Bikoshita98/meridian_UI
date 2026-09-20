/**
 * Static, client-only lookup tables for the two visual-richness features that don't need their own
 * free-form data: labels are a fixed preset set (id + text + a semantic color `mr-badge` already
 * knows how to render), and cover colors are one of the same 7 semantic colors. Neither needs a
 * color picker or free-text input server-side — only the ids/color keys a card picked travel over
 * the wire (see `Card.labelIds` and `Card.coverColor` in `realtime/protocol.ts`).
 *
 * Tailwind's content scanner only finds *literal* class strings, never runtime-concatenated ones
 * (e.g. `'bg-' + color + '-200'` would never match) — so `COVER_COLOR_CLASSES`' values are written
 * out in full below, not built from a template, precisely so the scanner picks them up.
 */

export type BadgeColorName = 'primary' | 'secondary' | 'neutral' | 'success' | 'warning' | 'error' | 'info';

export type LabelPreset = { id: string; text: string; color: BadgeColorName };

export const LABEL_PRESETS: LabelPreset[] = [
  { id: 'design', text: 'Design', color: 'secondary' },
  { id: 'frontend', text: 'Frontend', color: 'primary' },
  { id: 'backend', text: 'Backend', color: 'info' },
  { id: 'bug', text: 'Bug', color: 'error' },
  { id: 'urgent', text: 'Urgent', color: 'warning' },
  { id: 'docs', text: 'Docs', color: 'success' },
];

export const COVER_COLOR_CLASSES: Record<BadgeColorName, string> = {
  primary: 'bg-primary-200',
  secondary: 'bg-secondary-200',
  neutral: 'bg-neutral-200',
  success: 'bg-success-200',
  warning: 'bg-warning-200',
  error: 'bg-error-200',
  info: 'bg-info-200',
};

export const COVER_COLOR_OPTIONS: BadgeColorName[] = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];

/** Cycled by column position — purely decorative, not tied to any particular column name/meaning. */
export const COLUMN_ACCENT_CLASSES = ['bg-info-500', 'bg-warning-500', 'bg-success-500', 'bg-secondary-500', 'bg-error-500'];

export function formatDueDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(year, month - 1, day));
}

export function isOverdue(iso: string): boolean {
  const [year, month, day] = iso.split('-').map(Number);
  const due = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return due < today;
}
