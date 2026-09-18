import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MrAvatar } from '@meridian/ui/avatar';
import { MrBadge } from '@meridian/ui/badge';
import { MrButton } from '@meridian/ui/button';
import { MrCard } from '@meridian/ui/card';
import { MrCheckbox } from '@meridian/ui/checkbox';
import { MrDropdown, MrDropdownItem } from '@meridian/ui/dropdown';
import { MrIcon, type MrIconName } from '@meridian/ui/icon';
import { MrInputField } from '@meridian/ui/input-field';
import { MrModal } from '@meridian/ui/modal';
import { MrPagination } from '@meridian/ui/pagination';
import { MrRadio } from '@meridian/ui/radio';
import { MrSelect, type SelectOption } from '@meridian/ui/select';
import { MrSpinner } from '@meridian/ui/spinner';
import { MrTab, MrTabs } from '@meridian/ui/tabs';
import { MrTable, type TableColumn, type TableSortEvent } from '@meridian/ui/table';
import { MrToastContainer, MrToastService } from '@meridian/ui/toast';
import type { ToastStatus } from '@meridian/ui/toast';
import { MrToggle } from '@meridian/ui/toggle';
import { MrTooltip } from '@meridian/ui/tooltip';

interface DemoPerson {
  name: string;
  role: string;
  email: string;
}

const ICON_GALLERY: MrIconName[] = [
  'chevronDown',
  'chevronUp',
  'chevronLeft',
  'chevronRight',
  'check',
  'x',
  'alertCircle',
  'alertTriangle',
  'info',
  'loader',
  'search',
  'eye',
  'eyeOff',
  'plus',
  'minus',
  'moreHorizontal',
  'star',
  'circle',
  'square',
];

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    MrAvatar,
    MrBadge,
    MrButton,
    MrCard,
    MrCheckbox,
    MrDropdown,
    MrDropdownItem,
    MrIcon,
    MrInputField,
    MrModal,
    MrPagination,
    MrRadio,
    MrSelect,
    MrSpinner,
    MrTab,
    MrTable,
    MrTabs,
    MrToastContainer,
    MrToggle,
    MrTooltip,
  ],
  templateUrl: './app.html',
})
export class App {
  private readonly toastService = inject(MrToastService);

  protected readonly iconGallery = ICON_GALLERY;

  // --- input-field / select / checkbox / radio / toggle --------------------------------------
  protected username = '';
  protected framework = 'angular';
  protected readonly frameworkOptions: SelectOption<string>[] = [
    { label: 'Angular', value: 'angular' },
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte (disabled)', value: 'svelte', disabled: true },
  ];
  protected termsAccepted = false;
  protected plan: 'starter' | 'pro' | 'enterprise' = 'pro';
  protected emailNotifications = true;

  // --- tabs ------------------------------------------------------------------------------------
  protected activeTab = 0;

  // --- modal -----------------------------------------------------------------------------------
  protected modalOpen = false;

  // --- pagination ------------------------------------------------------------------------------
  protected page = 1;
  protected readonly totalPages = 12;

  // --- table -----------------------------------------------------------------------------------
  protected readonly tableColumns: TableColumn<DemoPerson>[] = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'role', header: 'Role', sortable: true },
    { key: 'email', header: 'Email', align: 'right' },
  ];
  protected readonly tableRows: DemoPerson[] = [
    { name: 'Avery Chen', role: 'Engineering', email: 'avery@example.com' },
    { name: 'Jordan Blake', role: 'Design', email: 'jordan@example.com' },
    { name: 'Priya Nair', role: 'Product', email: 'priya@example.com' },
    { name: 'Sam Okafor', role: 'Engineering', email: 'sam@example.com' },
  ];
  protected lastSortEvent: TableSortEvent<DemoPerson> | null = null;

  protected onSortChange(event: TableSortEvent<DemoPerson>): void {
    this.lastSortEvent = event;
  }

  // --- toast -----------------------------------------------------------------------------------
  protected showToast(status: `${ToastStatus}`): void {
    const messages: Record<`${ToastStatus}`, string> = {
      info: 'Heads up — a new version is available.',
      success: 'Changes saved successfully.',
      warning: 'Your session expires in 5 minutes.',
      error: 'Something went wrong. Please try again.',
    };
    this.toastService.show(messages[status], { status });
  }
}
