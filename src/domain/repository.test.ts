import { describe, expect, it } from 'vitest';
import { TinyWaitingRepository, TINY_WAITING_STORAGE_KEY } from './repository';
import type { TinyWaitingStorage } from './types';

class MemoryStorage implements TinyWaitingStorage {
  private readonly data = new Map<string, unknown>();
  async get<T>(key: string): Promise<T | null> {
    return (this.data.get(key) as T | undefined) ?? null;
  }
  async set<T>(key: string, value: T): Promise<void> {
    this.data.set(key, value);
  }
}

describe('TinyWaitingRepository', () => {
  it('creates a minimal waiting item', async () => {
    const storage = new MemoryStorage();
    const repository = new TinyWaitingRepository(storage);
    const item = await repository.create({ subject: 'لیست قیمت', waitingOn: 'علی' });
    expect(item.subject).toBe('لیست قیمت');
    expect(item.waitingOn).toBe('علی');
    expect(item.status).toBe('open');
    expect((await storage.get<unknown[]>(TINY_WAITING_STORAGE_KEY))?.length).toBe(1);
  });

  it('marks an item done', async () => {
    const repository = new TinyWaitingRepository(new MemoryStorage());
    const item = await repository.create({ subject: 'Approval', waitingOn: 'Sara' });
    const completed = await repository.complete(item.id);
    expect(completed?.status).toBe('done');
  });

  it('rejects missing required fields', async () => {
    const repository = new TinyWaitingRepository(new MemoryStorage());
    await expect(repository.create({ subject: '', waitingOn: 'Ali' })).rejects.toThrow();
    await expect(repository.create({ subject: 'Price list', waitingOn: '' })).rejects.toThrow();
  });
});
