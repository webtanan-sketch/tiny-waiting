# Tiny Waiting

> **TinyManager Module · Foundation**  
> یک فهرست روشن برای همه چیزهایی که ادامه‌شان به پاسخ شخص دیگری وابسته است.

[🇮🇷 فارسی](README.md) · [🇬🇧 English](README.en.md) · [TinyManager Core](https://github.com/webtanan-sketch/tinymanager)

![TinyManager Module](https://img.shields.io/badge/TinyManager-Module-2563EB)
![Status](https://img.shields.io/badge/Status-Foundation-64748B)
![Icon](https://img.shields.io/badge/Lucide-Hourglass-0F766E)
![License](https://img.shields.io/badge/License-MIT-111827)

## هدف

بسیاری از کارهای مدیر «To-do» نیستند؛ مدیر کار خودش را انجام داده و حالا منتظر پاسخ، فایل، تأیید یا اقدام شخص دیگری است.

**Tiny Waiting** دقیقاً برای همین وضعیت ساخته می‌شود.

## هر مورد Waiting

```text
موضوع
منتظر چه کسی؟
از چه تاریخی؟
موعد پاسخ
آخرین پیگیری
پروژه مرتبط
اولویت
یادداشت
```

## دامنه نسخه اول

- ثبت سریع Waiting Item
- Person / Organization
- Since date
- Expected date
- Follow-up date
- وضعیت Waiting / Replied / Closed
- تشخیص Overdue
- تعداد روزهای انتظار
- فیلتر «امروز باید پیگیری شود»
- Reminder / Notification از Core
- فارسی/English
- RTL/LTR
- Local-first
- JSON / CSV export

## Dashboard Widget

```text
منتظر پاسخ
7 باز
2 عقب‌افتاده
3 نیازمند پیگیری امروز
```

## TinyManager Integration

- Shared People
- Shared Projects
- Core Date Service
- Notifications
- Dashboard Widget
- Shared Backup

## Module Identity

```text
ID:       tiny-waiting
Icon:     Hourglass (Lucide)
Category: execution
Route:    /modules/waiting
Status:   Foundation
```

## Roadmap

- [x] تعریف دامنه و Manifest
- [ ] Waiting domain model
- [ ] Follow-up rules
- [ ] List + filters
- [ ] Dashboard widget
- [ ] Notification adapter
- [ ] Standalone mode
- [ ] Export
- [ ] Tests + CI
- [ ] TinyManager integration

## License

MIT © 2026 Webtanan
