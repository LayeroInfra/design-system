# Карта консолидации (Этап 2)

Аудит фактического использования компонентов в `control-plane` и план приведения
к единому набору. Цифры — на момент аудита (grep по `src/**/*.tsx`).

Легенда статуса: 🟢 канон (оставляем) · 🟡 доработать · 🔴 удалить/слить.

---

## 1. Кнопки 🟡 — приоритет №1

| Что | Где | Решение |
|---|---|---|
| `<Button>` (cva: default/destructive/outline/secondary/ghost/link + sizes) | 31 файл | 🟢 **канон** |
| `.btn*` (CSS-кнопки) | 3 места | 🔴 заменить на `<Button>`, удалить классы |
| Сырые `<button className="…">` | 126 всего | 🟡 **но мигрируется не всё** — см. ниже |

> **Уточнение по аудиту.** Из 126 сырых `<button>` ~104 — это НЕ кнопки-действия,
> а интерактивные элементы (пункты меню/дропдаунов, триггеры свитчеров, строки
> списков в пикерах, подложки оверлеев, выбираемые карточки, плавающая
> support-кнопка). Они остаются `<button>`. Большинство настоящих CTA уже на
> `<Button>`. Реальная цель миграции — небольшая.

**Tier 1 — явные CTA (заменить):**
- `.btn-ghost` → `<Button variant="ghost" size="sm">`: `RuntimeOomBanner.tsx:51,57`
- `.btn-primary btn-sm` (disabled) → `<Button size="sm" disabled>`: `Overview.tsx:580`
- инлайн primary → `<Button>`: `DropDeploy.tsx:315`
- chip-кнопки (ревью на `secondary`): `SupportWidget.tsx:1013`, `NewProject.tsx:548`
- затем удалить `.btn*` из `index.css`.

**Tier 2 — текст-ссылки (8) → опц. `<Button variant="link">`:**
`Team.tsx:482,654,664`, `Members.tsx:135`, `Overview.tsx:751`,
`Settings.tsx:1125,1789`, `DropDeploy.tsx:420`.

**Tier 3 — иконочные/«крестики» → опц. `<Button variant="ghost" size="icon">`**
(единые focus-ring/hover; выше churn, по желанию).

**Маппинг вариантов:** `bg-primary`/`bg-black`→`default`; `bg-white`+border→`outline`;
`bg-red-500/600`/`bg-destructive`→`destructive`; иконка без фона→`ghost size="icon"`;
текст-ссылка→`link`; `.btn-sm`→`size="sm"`.

**Не трогать:** триггеры свитчеров/аватаров, подложки оверлеев, выбираемые карточки,
support-bubble, внутренности `SupportWidget`/`CommandPalette`.

---

## 2. Бейджи 🟡 — приоритет №2

| Что | Где | Решение |
|---|---|---|
| `<Badge>` (default/secondary/outline/success/warning/destructive) | 1 файл | 🟢 **канон** |
| `.pill`, `.pill-leaf`, `.pill-amber` (CSS) | ~10 | 🔴 слить в `<Badge>` |
| Инлайновые `rounded-full bg-*-50/100 text-*` спаны | **22** | 🟡 мигрировать в `<Badge>` |

**Маппинг:** `.pill-leaf` → `success`, `.pill-amber` → `warning`, нейтральный `.pill` →
`secondary`/`outline`. Инлайновые зелёные/янтарные/красные спаны → соответствующий вариант.

**Отдельно:** `.pill-input` — это не бейдж, а поле-пилюля → разобрать в категории «Поля».

---

## 3. Карточки 🔴 — быстрый выигрыш

| Что | Где | Решение |
|---|---|---|
| `.surface`, `.surface-interactive`, `.surface-soft` (CSS) | 15 | 🟢 **канон** (тематизирован токенами) |
| `ui/card.tsx` (Card/CardHeader/…) | **0 импортов** | 🔴 удалить мёртвый код |

Решение: оставить `.surface` как канонический контейнер. Позже — опционально обернуть
в компонент `<Surface>`. `ui/card.tsx` удалить (нигде не используется).

---

## 4. Поля ввода 🟡

| Что | Где | Решение |
|---|---|---|
| `<Input>` | + | 🟢 канон |
| Сырые `<input className>` | 26 | 🟡 мигрировать в `<Input>` |
| `.pill-input` | 1 | 🔴 разобрать (в `<Input>` или вариант) |
| `<Label>`, `<Select>`, `<Switch>` | — | 🟢 канон |

---

## 5. Модалки 🟡

Примитив `Dialog` (Radix) — 🟢 канон. Поверх него — много самописных оболочек с
дублирующейся структурой:

- `ConfirmDialog` 🟢 (общий — оставить, на него переводить подтверждения)
- `ComingSoonModal`, `CreateTeamModal`, `UploadFolderModal`, `RepoFolderPicker`,
  `InstallAccountPicker` — 🟡 привести к единой оболочке на `Dialog`
- ad-hoc оверлеи `fixed inset-0 z-…` (мобильный drawer в `Sidebar`, `CommandPalette`) —
  🟡 вынести общий `<Overlay>`/`<Drawer>` примитив

---

## 6. Баннеры / информеры 🟡

`Informer` (success) — 🟢 канон. Доработать: тоны `success | warning | danger | info`.
Затем мигрировать:

- `RuntimeTypeBanner`, `RuntimeOomBanner`, `CdnFailedBanner`, `SuspendedBanner` (проектные)
- `MaintenanceBanner` (узкая полоса сверху — отдельный вариант `Informer` или свой `Banner`)

---

## 7. Пикеры / свитчеры 🟡 — самое сложное

Общий паттерн «триггер → поиск → список → выбор» в 6 местах:

- `ProjectSwitcher`, `OrganizationSwitcher` (свитчеры в хедере)
- `ProjectPicker` (страница выбора проекта)
- `GitRepoPicker`, `RepoFolderPicker`, `InstallAccountPicker`

Решение: выделить примитив `<ListPicker>`/`<Combobox>` (поиск + виртуальный список +
выбор) и собрать эти компоненты на нём.

---

## 8. Аватары 🟡

- `ProjectAvatar` 🟢 (градиент-куб + буква / favicon)
- `OrgAvatar` — инлайновый внутри `OrganizationSwitcher` 🟡 → вынести в `<Avatar>`
  (варианты: project/team/personal; формы square/circle)

---

## 9. Прочее 🟢

- `toast.tsx` — кастомные тосты, оставить, задокументировать.
- `icons.tsx` (свой набор) + `lucide-react` — выбрать один источник иконок (рекомендация:
  lucide как база, свои — только брендовые).

---

## Порядок работ (Этап 3+)

1. **Кнопки** — `<Button>` ← 126 сырых + удалить `.btn*`. (механика, макс. охват)
2. **Бейджи** — `<Badge>` ← `.pill*` + 22 спана.
3. **Карточки** — удалить `ui/card`, закрепить `.surface`.
4. **Поля** — `<Input>` ← сырые input'ы.
5. **Баннеры** — тоны `Informer`, миграция баннеров.
6. **Модалки** — общая оболочка на `Dialog`.
7. **Пикеры/свитчеры** — примитив `ListPicker`.
8. **Аватары** — `<Avatar>`.

## Модель доставки на платформу

Сейчас компоненты дублируются: канон в `design-system`, рабочая копия в
`control-plane` (деплоится оттуда). Чтобы «заменить на всей платформе» без дрейфа,
далее нужно решить модель потребления:

- **Опубликовать** `design-system` как версионируемый npm-пакет (GitHub Packages),
  `control-plane` импортирует из него; **или**
- git-зависимость / submodule; **или**
- свести фронтенды в monorepo с общим пакетом `ui`.

До этого: правки вносим сначала в `design-system`, затем переносим в `control-plane`
в рамках миграции каждой категории.
