import { OrderAggregate, OrderCreatedEvent } from '../supports/example-aggregate';
import { Uuid } from '../../src';

describe('OrderAggregate', () => {
  it('should create a new order and record OrderCreatedEvent', () => {
    const orderId = Uuid.generate();
    const customerId = Uuid.generate();
    const now = new Date();

    const order = OrderAggregate.createNew(orderId, customerId, now);

    expect(order).toBeInstanceOf(OrderAggregate);

    const events = order.popRecordedEvents();
    expect(events).toHaveLength(1);

    const event = events[0] as OrderCreatedEvent;
    expect(event).toBeInstanceOf(OrderCreatedEvent);
    expect(event.id).toBe(orderId.toString());
    expect(event.customerId).toBe(customerId.toString());
    expect(event.occurredAt.getTime()).toBe(now.getTime());
  });

  it('should clear events after popRecordedEvents is called', () => {
    const order = OrderAggregate.createNew(Uuid.generate(), Uuid.generate(), new Date());

    const firstPop = order.popRecordedEvents();
    const secondPop = order.popRecordedEvents();

    expect(firstPop).toHaveLength(1);
    expect(secondPop).toHaveLength(0);
  });
});
