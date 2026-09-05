import { Hourglass, Languages, Moon, Sun } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { WaitingWorkspace } from '../components/WaitingWorkspace';
import { TinyWaitingRepository } from '../domain/repository';
import type { CreateTinyWaitingInput, TinyLocale, TinyWaitingItem, TinyWaitingStorage } from '../domain/types';

const LOCALE_KEY = 'tiny-waiting.locale';
const THEME_KEY = 'tiny-waiting.theme';
type Theme = 'light' | 'dark';

class LocalStorageAdapter implements TinyWaitingStorage {
  async get<T>(key: string): Promise<T | null> {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) as T : null;
    } catch {
      return null;
    }
  }
  async set<T>(key: string, value: T): Promise<void> {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

function App() {
  const [locale, setLocale] = useState<TinyLocale>(() => window.localStorage.getItem(LOCALE_KEY) === 'en' ? 'en' : 'fa');
  const [theme, setTheme] = useState<Theme>(() => window.localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light');
  const [items, setItems] = useState<TinyWaitingItem[]>([]);
  const repository = useMemo(() => new TinyWaitingRepository(new LocalStorageAdapter()), []);

  const refresh = async () => setItems(await repository.list());

  useEffect(() => {
    void refresh();
  }, [repository]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr';
    window.localStorage.setItem(LOCALE_KEY, locale);
  }, [locale]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const create = async (input: CreateTinyWaitingInput) => {
    await repository.create(input);
    await refresh();
  };
  const complete = async (id: string) => {
    await repository.complete(id);
    await refresh();
  };
  const remove = async (id: string) => {
    await repository.remove(id);
    await refresh();
  };

  return (
    <div className="tw-standalone">
      <header className="tw-standalone-topbar">
        <a className="tw-brand" href="https://github.com/webtanan-sketch/tinymanager" target="_blank" rel="noreferrer">
          <span className="tw-brand-mark"><Hourglass size={18} /></span>
          TinyManager · Waiting For
        </a>
        <div className="tw-shell-actions">
          <button type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={locale === 'fa' ? 'تغییر پوسته' : 'Toggle theme'}>
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button type="button" onClick={() => setLocale(locale === 'fa' ? 'en' : 'fa')}>
            <Languages size={16} /> {locale === 'fa' ? 'EN' : 'فا'}
          </button>
        </div>
      </header>

      <main className="tw-standalone-main">
        <WaitingWorkspace locale={locale} items={items} onCreate={create} onComplete={complete} onRemove={remove} />
      </main>

      <footer className="tw-standalone-footer">
        <span>TinyManager · Small tools. Better management.</span>
        <span>v0.1.0-alpha.1</span>
      </footer>
    </div>
  );
}

export default App;
