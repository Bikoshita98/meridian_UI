import { TestBed } from '@angular/core/testing';
import { MrToastService } from './toast.service';
import { ToastStatus } from './toast.enums';

describe('MrToastService', () => {
  let service: MrToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MrToastService);
  });

  it('creates', () => {
    expect(service).toBeTruthy();
  });

  it('starts with an empty queue', () => {
    expect(service.toasts()).toEqual([]);
  });

  it('queues a toast with info status and a default duration when show is called with no options', () => {
    service.show('Hello');
    expect(service.toasts()).toEqual([{ id: 0, message: 'Hello', status: ToastStatus.Info, duration: 5000 }]);
  });

  it('preserves insertion order across multiple toasts with increasing ids', () => {
    service.show('First');
    service.show('Second');

    const toasts = service.toasts();
    expect(toasts.map((t) => t.message)).toEqual(['First', 'Second']);
    expect(toasts[1].id).toBeGreaterThan(toasts[0].id);
  });

  it('applies a given status and duration', () => {
    service.show('Uh oh', { status: ToastStatus.Error, duration: 1000 });
    expect(service.toasts()[0]).toMatchObject({ status: ToastStatus.Error, duration: 1000 });
  });

  it('removes a toast by id via dismiss', () => {
    const id = service.show('Bye');
    service.dismiss(id);
    expect(service.toasts()).toEqual([]);
  });

  it('clears every queued toast', () => {
    service.show('One');
    service.show('Two');
    service.clear();
    expect(service.toasts()).toEqual([]);
  });
});
