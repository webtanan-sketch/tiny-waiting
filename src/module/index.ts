import '../styles.css';
import { WaitingWorkspace } from '../components/WaitingWorkspace';
import { TinyWaitingRepository, TINY_WAITING_STORAGE_KEY } from '../domain/repository';

export { WaitingWorkspace, TinyWaitingRepository, TINY_WAITING_STORAGE_KEY };
export type {
  CreateTinyWaitingInput,
  TinyLocale,
  TinyWaitingItem,
  TinyWaitingStatus,
  TinyWaitingStorage,
} from '../domain/types';

export const waitingManifest = {
  id: 'tiny-waiting',
  version: '0.1.0-alpha.1',
  name: { fa: 'منتظر پاسخ', en: 'Waiting For' },
  description: {
    fa: 'ثبت و پیگیری چیزهایی که ادامه‌شان منتظر پاسخ شخص دیگری است.',
    en: 'Track things that cannot continue until somebody else responds.',
  },
  icon: 'Hourglass',
  route: '/modules/waiting',
  maturity: 'alpha',
} as const;
