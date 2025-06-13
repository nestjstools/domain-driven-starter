import { AggregateRoot, DomainEvent, Uuid } from '../../src';

export class OrderCreatedEvent implements DomainEvent {
  constructor(
    public readonly id: string,
    public readonly occurredAt: Date,
    public readonly customerId: string,
  ) {
  }
}

export class OrderAggregate extends AggregateRoot {

  private constructor(
    id: Uuid,
    private readonly customerId: Uuid,
  ) {
    super(id);
  }

  static createNew(
    id: Uuid,
    customerId: Uuid,
    now: Date,
  ): OrderAggregate {
    const order = new OrderAggregate(id, customerId);

    order.recordEvent(new OrderCreatedEvent(id.toString(), now, customerId.toString()));

    return order;
  }
}
