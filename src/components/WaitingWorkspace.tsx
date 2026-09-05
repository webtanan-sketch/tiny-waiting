import { Check, Hourglass, Plus, Trash2, UserRound } from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';
import type { CreateTinyWaitingInput, TinyLocale, TinyWaitingItem } from '../domain/types';

export interface WaitingWorkspaceProps {
  locale: TinyLocale;
  items: TinyWaitingItem[];
  onCreate(input: CreateTinyWaitingInput): void | Promise<void>;
  onComplete(id: string): void | Promise<void>;
  onRemove(id: string): void | Promise<void>;
}

export function WaitingWorkspace({ locale, items, onCreate, onComplete, onRemove }: WaitingWorkspaceProps) {
  const [subject, setSubject] = useState('');
  const [waitingOn, setWaitingOn] = useState('');
  const [busy, setBusy] = useState(false);
  const openItems = useMemo(() => items.filter((item) => item.status === 'open'), [items]);
  const doneItems = useMemo(() => items.filter((item) => item.status === 'done'), [items]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!subject.trim() || !waitingOn.trim() || busy) return;
    setBusy(true);
    try {
      await onCreate({ subject: subject.trim(), waitingOn: waitingOn.trim() });
      setSubject('');
      setWaitingOn('');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="tw-workspace" dir={locale === 'fa' ? 'rtl' : 'ltr'}>
      <header className="tw-heading">
        <div className="tw-heading-icon"><Hourglass size={22} /></div>
        <div>
          <h1>{locale === 'fa' ? 'منتظر پاسخ' : 'Waiting For'}</h1>
          <p>{locale === 'fa' ? 'چیزهایی که کار تو انجام شده، اما ادامه‌شان دست شخص دیگری است.' : 'Things you have acted on, but cannot continue until somebody else responds.'}</p>
        </div>
        <span className="tw-count">{openItems.length}</span>
      </header>

      <form className="tw-quick-add" onSubmit={submit}>
        <label>
          <span>{locale === 'fa' ? 'منتظر چه چیزی؟' : 'Waiting for what?'}</span>
          <input value={subject} onChange={(event) => setSubject(event.currentTarget.value)} placeholder={locale === 'fa' ? 'مثلاً لیست قیمت' : 'e.g. price list'} />
        </label>
        <label>
          <span>{locale === 'fa' ? 'از چه کسی؟' : 'From whom?'}</span>
          <div className="tw-person-input"><UserRound size={16} /><input value={waitingOn} onChange={(event) => setWaitingOn(event.currentTarget.value)} placeholder={locale === 'fa' ? 'مثلاً علی' : 'e.g. Ali'} /></div>
        </label>
        <button type="submit" disabled={busy || !subject.trim() || !waitingOn.trim()}>
          <Plus size={17} />
          {locale === 'fa' ? 'ثبت' : 'Add'}
        </button>
      </form>

      <div className="tw-list">
        {openItems.length === 0 ? (
          <div className="tw-empty">
            <Check size={24} />
            <strong>{locale === 'fa' ? 'چیزی منتظر پاسخ نیست.' : 'Nothing is waiting.'}</strong>
            <span>{locale === 'fa' ? 'موارد جدید را از همین خط بالا یا از Tiny AI ثبت کن.' : 'Add a new item above or through Tiny AI.'}</span>
          </div>
        ) : openItems.map((item) => (
          <article className="tw-item" key={item.id}>
            <div className="tw-item-main">
              <span className="tw-avatar"><UserRound size={17} /></span>
              <div>
                <strong>{item.subject}</strong>
                <span>{locale === 'fa' ? `منتظر ${item.waitingOn}` : `Waiting on ${item.waitingOn}`}</span>
              </div>
            </div>
            <div className="tw-item-actions">
              <button className="tw-done" type="button" onClick={() => void onComplete(item.id)} title={locale === 'fa' ? 'پاسخ رسید' : 'Response received'}><Check size={17} /></button>
              <button className="tw-remove" type="button" onClick={() => void onRemove(item.id)} title={locale === 'fa' ? 'حذف' : 'Remove'}><Trash2 size={16} /></button>
            </div>
          </article>
        ))}
      </div>

      {doneItems.length > 0 && (
        <details className="tw-done-section">
          <summary>{locale === 'fa' ? `انجام‌شده‌ها (${doneItems.length})` : `Completed (${doneItems.length})`}</summary>
          {doneItems.slice(0, 10).map((item) => (
            <div className="tw-done-row" key={item.id}>
              <span>{item.subject}</span>
              <small>{item.waitingOn}</small>
            </div>
          ))}
        </details>
      )}
    </section>
  );
}
