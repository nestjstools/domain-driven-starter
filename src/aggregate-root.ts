import { Uuid } from './value-object/uuid';
import { DomainEvent } from './event/domain-event';

export abstract class AggregateRoot<T extends DomainEvent = DomainEvent> {
  private events: T[] = [];

  protected constructor(public readonly id: Uuid) {
  }

  protected recordEvent(event: T): void {
    this.events.push(event);
  }

  popRecordedEvents(): T[] {
    const events = [...this.events];
    this.events = [];
    return events;
  }
}
