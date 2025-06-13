import { v7, validate as isUuidValid } from 'uuid';

export class Uuid {
  private readonly value: string;

  private constructor(value: string) {
    if (!isUuidValid(value)) {
      throw new Error(`Invalid UUID: ${value}`);
    }

    this.value = value;
  }

  static generate(): Uuid {
    return new Uuid(v7().toString());
  }

  static fromString(value: string): Uuid {
    return new Uuid(value);
  }

  toString(): string {
    return this.value;
  }

  equals(other: Uuid): boolean {
    return other.value === this.value;
  }
}
