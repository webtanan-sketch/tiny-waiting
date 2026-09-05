export const moduleManifest = {
  schemaVersion: 1,
  id: 'tiny-waiting',
  version: '0.1.0-alpha.1',
  name: { fa: 'منتظر پاسخ', en: 'Waiting For' },
  description: {
    fa: 'پیگیری مواردی که ادامه کار آن‌ها به پاسخ شخص دیگری وابسته است.',
    en: 'Track work that is waiting on somebody else.',
  },
  icon: 'Hourglass',
  route: '/modules/waiting',
  repository: 'https://github.com/webtanan-sketch/tiny-waiting',
  category: 'execution',
  maturity: 'alpha',
  capabilities: {
    dashboardWidget: true,
    globalSearch: true,
    exportData: true,
    sharedPeople: true,
    sharedProjects: true,
    notifications: true,
    assistantActions: true,
  },
  assistantActions: [
    'tiny-waiting.create',
    'tiny-waiting.complete',
  ],
} as const;

export default moduleManifest;
