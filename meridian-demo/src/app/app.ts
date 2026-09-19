import { AfterViewInit, Component, OnDestroy, inject, signal } from '@angular/core';
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

import { CODE_SNIPPETS } from './code-snippets';
import { UsageBlock } from './usage-block';

interface DemoPerson {
  name: string;
  role: string;
  email: string;
}

interface NavLink {
  id: string;
  label: string;
}

interface NavGroup {
  category: string;
  links: NavLink[];
}

const NAV: NavGroup[] = [
  {
    category: 'Actions',
    links: [
      { id: 'button', label: 'Button' },
      { id: 'icon', label: 'Icon' },
    ],
  },
  {
    category: 'Form controls',
    links: [
      { id: 'inputs', label: 'Input field & select' },
      { id: 'selections', label: 'Checkbox, radio & toggle' },
    ],
  },
  {
    category: 'Navigation',
    links: [
      { id: 'tabs', label: 'Tabs' },
      { id: 'pagination', label: 'Pagination' },
    ],
  },
  {
    category: 'Overlays',
    links: [{ id: 'overlays', label: 'Tooltip, dropdown & modal' }],
  },
  {
    category: 'Data display',
    links: [
      { id: 'identity', label: 'Card, badge & avatar' },
      { id: 'table', label: 'Table' },
    ],
  },
  {
    category: 'Feedback',
    links: [
      { id: 'spinner', label: 'Spinner' },
      { id: 'toast', label: 'Toast' },
    ],
  },
];

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
    UsageBlock,
  ],
  templateUrl: './app.html',
})
export class App implements AfterViewInit, OnDestroy {
  private readonly toastService = inject(MrToastService);
  private readonly sectionIds = NAV.flatMap((group) => group.links.map((link) => link.id));
  private readonly observers: IntersectionObserver[] = [];
  private readonly onWindowScroll = (): void => {
    this.showBackToTop.set(window.scrollY > 480);
  };

  protected readonly iconGallery = ICON_GALLERY;
  protected readonly nav = NAV;
  protected readonly snippets = CODE_SNIPPETS;
  protected readonly activeSection = signal(this.sectionIds[0]);
  protected readonly showBackToTop = signal(false);

  ngAfterViewInit(): void {
    const sections = this.sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    // Fades/slides each section in the first time it crosses into view (styling in styles.scss).
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08 },
    );

    // Tracks which section is nearest the top of the viewport to highlight it in the sidebar.
    const spyObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          this.activeSection.set(visible.target.id);
        }
      },
      { rootMargin: '-15% 0px -70% 0px' },
    );

    for (const section of sections) {
      revealObserver.observe(section);
      spyObserver.observe(section);
    }
    this.observers.push(revealObserver, spyObserver);

    window.addEventListener('scroll', this.onWindowScroll, { passive: true });
  }

  ngOnDestroy(): void {
    this.observers.forEach((observer) => observer.disconnect());
    window.removeEventListener('scroll', this.onWindowScroll);
  }

  protected scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

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
