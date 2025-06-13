<p align="center">
    <image src="nestjstools-logo.png" width="400">
</p>

# @nestjstools/domain-driven-starter

#### Domain-Driven Design Core Library (TypeScript)

This is a lightweight, framework-agnostic library to support core things in Domain-Driven Design (DDD) in TypeScript/Node.js applications. It provides foundational building blocks like value objects, domain events, and aggregate roots to help you build rich domain models with clear boundaries and event-driven behavior.

---

## Library include

- Immutable `Uuid` Value Object
- Domain Event interface for decoupling and traceability
- Generic `AggregateRoot<T>` base class with event recording
- Easily testable and framework-agnostic
- Can be used with NestJS, Express, or standalone services

---

## Installation

```bash
npm install @nestjstools/domain-driven-starter
# or
yarn add @nestjstools/domain-driven-starter
```

## Core Concepts

### 1. `Uuid` (v7, v4 is compatible) Value Object

```ts
import { Uuid } from '@nestjstools/domain-driven-starter';

const id = Uuid.generate();
const fromString = Uuid.fromString('f47ac10b-58cc-4372-a567-0e02b2c3d479');

console.log(id.toString()); // valid UUIDv7
```

### 2. `DomainEvent` Interface

```ts
export interface DomainEvent {
  readonly id: string;
}
```

You can implement your own events:

```ts
export class OrderCreatedEvent implements DomainEvent {
  readonly occurredAt = new Date();
  readonly eventName = 'order.created';

  constructor(public readonly id: string, public readonly customerId: string) {}
}
```

### 3. `AggregateRoot<T extends DomainEvent>`

#### AggregateRoot<T extends DomainEvent> – Method & Pattern Descriptions
* protected constructor(id: Uuid)
This constructor is protected, not public — meaning only subclasses (like OrderAggregate) can call it.
In your aggregate (e.g., OrderAggregate), the constructor is often made private to enforce the use of static factory methods like createNew().
This ensures that aggregates are always created in a controlled and valid state.

* recordEvent(event: T): void
Adds a domain event to the internal list.
This method should be used within aggregate methods to capture meaningful changes that occurred in the domain.

* popRecordedEvents(): T[]
Returns the list of recorded domain events and clears the internal list.
Typically used after saving the aggregate to publish events externally (e.g. via an event bus).

```ts
import { AggregateRoot, Uuid } from '@nestjstools/domain-driven-starter';

// OrderEvents is a domain-specific type that should implement the DomainEvent interface.
// You can define your own event types within your domain and use them here.
export class OrderAggregate extends AggregateRoot<OrderEvents> {
  private constructor(
    id: Uuid, 
    private readonly customerId: Uuid
  ) {
    super(id);
  }

  static createNew(id: Uuid, customerId: Uuid, now: Date): OrderAggregate {
    const order = new OrderAggregate(id, customerId);
    order.recordEvent(new OrderCreatedEvent(id.toString(), now, customerId.toString()));
    return order;
  }
}
```

