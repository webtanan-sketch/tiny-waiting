export const moduleManifest = {
  id: 'tiny-waiting',
  version: '0.1.0-foundation',
  name: { fa: 'منتظر پاسخ', en: 'Waiting For' },
  description: {
    fa: 'پیگیری مواردی که ادامه کار آن‌ها به پاسخ شخص دیگری وابسته است.',
    en: 'Track work that is waiting on somebody else.',
  },
  icon: 'Hourglass',
  route: '/modules/waiting',
  repository: 'https://github.com/webtanan-sketch/tiny-waiting',
  category: 'execution',
  maturity: 'foundation',
  capabilities: {
    dashboardWidget: true,
    globalSearch: false,
    exportData: true,
    sharedPeople: true,
    sharedProjects: true,
    notifications: true,
  },
} as const;

export default moduleManifest;
