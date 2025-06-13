import { validate as isUuidValid } from 'uuid';
import { Uuid } from '../../../src';

describe('Uuid', () => {
  it('should generate a valid UUID v7', () => {
    const uuid = Uuid.generate();
    expect(uuid).toBeInstanceOf(Uuid);
    expect(isUuidValid(uuid.toString())).toBe(true);
  });

  it('should create Uuid from a valid string', () => {
    const raw = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
    const uuid = Uuid.fromString(raw);
    expect(uuid.toString()).toBe(raw);
  });

  it('should throw an error for invalid UUID string', () => {
    expect(() => {
      Uuid.fromString('not-a-uuid');
    }).toThrowError('Invalid UUID: not-a-uuid');
  });

  it('should compare equality correctly', () => {
    const id1 = Uuid.fromString('f47ac10b-58cc-4372-a567-0e02b2c3d479');
    const id2 = Uuid.fromString('f47ac10b-58cc-4372-a567-0e02b2c3d479');
    const id3 = Uuid.generate();

    expect(id1.equals(id2)).toBe(true);
    expect(id1.equals(id3)).toBe(false);
  });
});
