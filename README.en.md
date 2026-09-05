# Tiny Waiting

> **TinyManager Module · Foundation**  
> A clear list of everything that cannot move until someone else responds.

[🇮🇷 فارسی](README.md) · [🇬🇧 English](README.en.md) · [TinyManager Core](https://github.com/webtanan-sketch/tinymanager)

![TinyManager Module](https://img.shields.io/badge/TinyManager-Module-2563EB)
![Status](https://img.shields.io/badge/Status-Foundation-64748B)
![Icon](https://img.shields.io/badge/Lucide-Hourglass-0F766E)
![License](https://img.shields.io/badge/License-MIT-111827)

## Purpose

A large part of a manager's workload is not a to-do. The manager has already acted and is now waiting for somebody else's response, file, approval or action.

**Tiny Waiting** is designed specifically for that state.

## A waiting item

```text
Subject
Waiting for whom?
Since when?
Expected response date
Last follow-up
Related project
Priority
Notes
```

## First-release scope

- fast waiting-item capture
- person / organization
- since date
- expected date
- follow-up date
- Waiting / Replied / Closed status
- overdue detection
- days waiting
- “follow up today” filter
- Core reminder / notification integration
- Persian / English
- RTL / LTR
- local-first persistence
- JSON / CSV export

## Dashboard widget

```text
Waiting for
7 open
2 overdue
3 follow-ups today
```

## TinyManager integration

- Shared People
- Shared Projects
- Core Date Service
- Notifications
- Dashboard Widget
- Shared Backup

## Module identity

```text
ID:       tiny-waiting
Icon:     Hourglass (Lucide)
Category: execution
Route:    /modules/waiting
Status:   Foundation
```

## Roadmap

- [x] Define scope and manifest
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
