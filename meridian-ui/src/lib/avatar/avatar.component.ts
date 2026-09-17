import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { AvatarShape, AvatarSize } from './avatar.enums';
import { avatarVariants } from './avatar.variants';

function initialsFromName(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
}

@Component({
  selector: 'mr-avatar',
  imports: [],
  templateUrl: './avatar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MrAvatar {
  private readonly _src = signal<string | undefined>(undefined);

  @Input()
  set src(value: string | undefined) {
    this._src.set(value);
    this._imgError.set(false);
  }

  get src(): string | undefined {
    return this._src();
  }

  private readonly _alt = signal('');

  @Input()
  set alt(value: string) {
    this._alt.set(value);
  }

  get alt(): string {
    return this._alt();
  }

  private readonly _name = signal<string | undefined>(undefined);

  @Input()
  set name(value: string | undefined) {
    this._name.set(value);
  }

  get name(): string | undefined {
    return this._name();
  }

  private readonly _initials = signal<string | undefined>(undefined);

  @Input()
  set initials(value: string | undefined) {
    this._initials.set(value);
  }

  get initials(): string | undefined {
    return this._initials();
  }

  private readonly _size = signal<`${AvatarSize}`>(AvatarSize.Md);

  @Input()
  set size(value: `${AvatarSize}`) {
    this._size.set(value);
  }

  get size(): `${AvatarSize}` {
    return this._size();
  }

  private readonly _shape = signal<`${AvatarShape}`>(AvatarShape.Circle);

  @Input()
  set shape(value: `${AvatarShape}`) {
    this._shape.set(value);
  }

  get shape(): `${AvatarShape}` {
    return this._shape();
  }

  private readonly _imgError = signal(false);

  protected readonly avatarClass = computed(() => avatarVariants({ size: this._size(), shape: this._shape() }));

  protected readonly resolvedAlt = computed(() => this._alt() || this._name() || '');

  protected readonly resolvedInitials = computed(() => {
    const explicit = this._initials();
    if (explicit) {
      return explicit;
    }

    const name = this._name();
    return name ? initialsFromName(name) : '';
  });

  protected readonly showImage = computed(() => !!this._src() && !this._imgError());

  protected onImageError(): void {
    this._imgError.set(true);
  }
}
