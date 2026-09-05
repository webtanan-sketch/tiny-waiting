export type TinyWaitingStatus = 'open' | 'done';
export type TinyLocale = 'fa' | 'en';

export interface TinyWaitingItem {
  id: string;
  subject: string;
  waitingOn: string;
  personId?: string;
  status: TinyWaitingStatus;
  createdAt: string;
  updatedAt: string;
  followUpAt?: string;
  projectId?: string;
  note?: string;
}

export interface CreateTinyWaitingInput {
  subject: string;
  waitingOn: string;
  personId?: string;
  followUpAt?: string;
  projectId?: string;
  note?: string;
}

export interface TinyWaitingStorage {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
}
