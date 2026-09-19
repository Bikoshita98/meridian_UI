/**
 * Minimal "drop this into your own app" usage for each of the 18 @meridian/ui components, shown
 * in the showcase's usage blocks. Deliberately trimmed to just the import + the bindings actually
 * used in the snippet — `// ...` stands in for the rest of a real `@Component` decorator.
 */
export interface CodeSnippet {
  html: string;
  ts: string;
}

export const CODE_SNIPPETS: Record<string, CodeSnippet> = {
  button: {
    html: `<mr-button (click)="onSave()">Save</mr-button>
<mr-button variant="outline" color="error">Delete</mr-button>`,
    ts: `import { MrButton } from '@meridian/ui/button';

@Component({
  // ...
  imports: [MrButton],
})
export class MyComponent {
  onSave(): void {
    // ...
  }
}`,
  },

  icon: {
    html: `<mr-icon name="check" size="md" />`,
    ts: `import { MrIcon } from '@meridian/ui/icon';

@Component({
  // ...
  imports: [MrIcon],
})
export class MyComponent {}`,
  },

  inputField: {
    html: `<mr-input-field
  label="Username"
  placeholder="e.g. avery-chen"
  helperText="Visible to other members of your workspace."
  [(ngModel)]="username"
/>`,
    ts: `import { FormsModule } from '@angular/forms';
import { MrInputField } from '@meridian/ui/input-field';

@Component({
  // ...
  imports: [FormsModule, MrInputField],
})
export class MyComponent {
  username = '';
}`,
  },

  select: {
    html: `<mr-select label="Framework" [options]="frameworkOptions" [(ngModel)]="framework" />`,
    ts: `import { FormsModule } from '@angular/forms';
import { MrSelect, type SelectOption } from '@meridian/ui/select';

@Component({
  // ...
  imports: [FormsModule, MrSelect],
})
export class MyComponent {
  framework = 'angular';
  frameworkOptions: SelectOption<string>[] = [
    { label: 'Angular', value: 'angular' },
    { label: 'React', value: 'react' },
  ];
}`,
  },

  checkbox: {
    html: `<mr-checkbox label="I accept the terms" [(ngModel)]="termsAccepted" />`,
    ts: `import { FormsModule } from '@angular/forms';
import { MrCheckbox } from '@meridian/ui/checkbox';

@Component({
  // ...
  imports: [FormsModule, MrCheckbox],
})
export class MyComponent {
  termsAccepted = false;
}`,
  },

  radio: {
    html: `<mr-radio name="plan" label="Starter" value="starter" [(ngModel)]="plan" />
<mr-radio name="plan" label="Pro" value="pro" [(ngModel)]="plan" />`,
    ts: `import { FormsModule } from '@angular/forms';
import { MrRadio } from '@meridian/ui/radio';

@Component({
  // ...
  imports: [FormsModule, MrRadio],
})
export class MyComponent {
  plan: 'starter' | 'pro' = 'pro';
}`,
  },

  toggle: {
    html: `<mr-toggle label="Email notifications" [(ngModel)]="emailNotifications" />`,
    ts: `import { FormsModule } from '@angular/forms';
import { MrToggle } from '@meridian/ui/toggle';

@Component({
  // ...
  imports: [FormsModule, MrToggle],
})
export class MyComponent {
  emailNotifications = true;
}`,
  },

  tabs: {
    html: `<mr-tabs [(selected)]="activeTab">
  <mr-tab label="Overview">Everything looks good.</mr-tab>
  <mr-tab label="Activity">3 deploys this week.</mr-tab>
</mr-tabs>`,
    ts: `import { MrTab, MrTabs } from '@meridian/ui/tabs';

@Component({
  // ...
  imports: [MrTab, MrTabs],
})
export class MyComponent {
  activeTab = 0;
}`,
  },

  pagination: {
    html: `<mr-pagination [page]="page" [totalPages]="totalPages" (pageChange)="page = $event" />`,
    ts: `import { MrPagination } from '@meridian/ui/pagination';

@Component({
  // ...
  imports: [MrPagination],
})
export class MyComponent {
  page = 1;
  totalPages = 12;
}`,
  },

  tooltip: {
    html: `<mr-tooltip text="Copies the share link to your clipboard" position="top">
  <mr-button variant="outline">Hover me</mr-button>
</mr-tooltip>`,
    ts: `import { MrButton } from '@meridian/ui/button';
import { MrTooltip } from '@meridian/ui/tooltip';

@Component({
  // ...
  imports: [MrButton, MrTooltip],
})
export class MyComponent {}`,
  },

  dropdown: {
    html: `<mr-dropdown>
  <mr-button variant="outline">Actions</mr-button>
  <mr-dropdown-item>Edit</mr-dropdown-item>
  <mr-dropdown-item>Duplicate</mr-dropdown-item>
</mr-dropdown>`,
    ts: `import { MrButton } from '@meridian/ui/button';
import { MrDropdown, MrDropdownItem } from '@meridian/ui/dropdown';

@Component({
  // ...
  imports: [MrButton, MrDropdown, MrDropdownItem],
})
export class MyComponent {}`,
  },

  modal: {
    html: `<mr-button (click)="modalOpen = true">Open modal</mr-button>
<mr-modal [(open)]="modalOpen" size="sm">
  <p>This action can't be undone.</p>
</mr-modal>`,
    ts: `import { MrButton } from '@meridian/ui/button';
import { MrModal } from '@meridian/ui/modal';

@Component({
  // ...
  imports: [MrButton, MrModal],
})
export class MyComponent {
  modalOpen = false;
}`,
  },

  card: {
    html: `<mr-card variant="outlined" padding="md">
  <p>Card content goes here.</p>
</mr-card>`,
    ts: `import { MrCard } from '@meridian/ui/card';

@Component({
  // ...
  imports: [MrCard],
})
export class MyComponent {}`,
  },

  badge: {
    html: `<mr-badge color="success">Success</mr-badge>`,
    ts: `import { MrBadge } from '@meridian/ui/badge';

@Component({
  // ...
  imports: [MrBadge],
})
export class MyComponent {}`,
  },

  avatar: {
    html: `<mr-avatar name="Avery Chen" size="md" />
<mr-avatar src="https://i.pravatar.cc/64?img=12" alt="Random user" size="lg" />`,
    ts: `import { MrAvatar } from '@meridian/ui/avatar';

@Component({
  // ...
  imports: [MrAvatar],
})
export class MyComponent {}`,
  },

  table: {
    html: `<mr-table [columns]="columns" [rows]="rows" (sortChange)="onSortChange($event)" />`,
    ts: `import { MrTable, type TableColumn, type TableSortEvent } from '@meridian/ui/table';

interface Person {
  name: string;
  role: string;
}

@Component({
  // ...
  imports: [MrTable],
})
export class MyComponent {
  columns: TableColumn<Person>[] = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'role', header: 'Role', sortable: true },
  ];
  rows: Person[] = [{ name: 'Avery Chen', role: 'Engineering' }];

  onSortChange(event: TableSortEvent<Person>): void {
    // ...
  }
}`,
  },

  spinner: {
    html: `<mr-spinner size="md" color="primary" label="Saving" />`,
    ts: `import { MrSpinner } from '@meridian/ui/spinner';

@Component({
  // ...
  imports: [MrSpinner],
})
export class MyComponent {}`,
  },

  toast: {
    html: `<mr-button (click)="showToast()">Save</mr-button>

<!-- once, at the app root -->
<mr-toast-container />`,
    ts: `import { inject } from '@angular/core';
import { MrButton } from '@meridian/ui/button';
import { MrToastContainer, MrToastService } from '@meridian/ui/toast';

@Component({
  // ...
  imports: [MrButton, MrToastContainer],
})
export class MyComponent {
  private readonly toastService = inject(MrToastService);

  showToast(): void {
    this.toastService.show('Changes saved successfully.', { status: 'success' });
  }
}`,
  },
};
