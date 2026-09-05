import type { CreateTinyWaitingInput, TinyWaitingItem, TinyWaitingStorage } from './types';

export const TINY_WAITING_STORAGE_KEY = 'module.tiny-waiting.items';

const makeId = (): string => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `waiting-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

export class TinyWaitingRepository {
  constructor(
    private readonly storage: TinyWaitingStorage,
    private readonly storageKey = TINY_WAITING_STORAGE_KEY,
  ) {}

  async list(): Promise<TinyWaitingItem[]> {
    return (await this.storage.get<TinyWaitingItem[]>(this.storageKey)) ?? [];
  }

  async create(input: CreateTinyWaitingInput): Promise<TinyWaitingItem> {
    const subject = input.subject.trim();
    const waitingOn = input.waitingOn.trim();
    if (!subject) throw new Error('Waiting subject is required.');
    if (!waitingOn) throw new Error('Waiting person/source is required.');

    const now = new Date().toISOString();
    const item: TinyWaitingItem = {
      id: makeId(),
      subject,
      waitingOn,
      status: 'open',
      createdAt: now,
      updatedAt: now,
      ...(input.followUpAt ? { followUpAt: input.followUpAt } : {}),
      ...(input.projectId ? { projectId: input.projectId } : {}),
      ...(input.note?.trim() ? { note: input.note.trim() } : {}),
    };

    const items = await this.list();
    await this.storage.set(this.storageKey, [item, ...items]);
    return item;
  }

  async complete(id: string): Promise<TinyWaitingItem | null> {
    const items = await this.list();
    const index = items.findIndex((item) => item.id === id);
    if (index < 0) return null;
    const current = items[index];
    if (!current) return null;
    const updated: TinyWaitingItem = {
      ...current,
      status: 'done',
      updatedAt: new Date().toISOString(),
    };
    const next = [...items];
    next[index] = updated;
    await this.storage.set(this.storageKey, next);
    return updated;
  }

  async remove(id: string): Promise<boolean> {
    const items = await this.list();
    const next = items.filter((item) => item.id !== id);
    if (next.length === items.length) return false;
    await this.storage.set(this.storageKey, next);
    return true;
  }
}
