# Карта консолидации (Этап 2)

Аудит фактического использования компонентов в `control-plane` и план приведения
к единому набору. Цифры — на момент аудита (grep по `src/**/*.tsx`).

Легенда статуса: 🟢 канон (оставляем) · 🟡 доработать · 🔴 удалить/слить.

---

## 1. Кнопки ✅ — сделано

> Мигрировано в `control-plane` (на `main`): `.btn*` удалены; Tier 1+2 → `<Button>`
> (CTA, заглушка, чип, текст-ссылки); **Tier 3** (нейтральные крестики/удаления:
> toast, тост Team, панель SupportWidget, удаление в EnvVars/ProjectSetup) →
> `<Button variant="ghost" size="icon" | "icon-sm">`. Сам `Button` расширен:
> `leftIcon`/`rightIcon`/`loading`/`fullWidth` + размеры `icon-sm/icon/icon-lg`.
>
> **Оставлено намеренно:** segmented-переключатель (NewProject) → будущий
> `<Segmented>`; цветные `×` внутри цветных алертов (Login/Integrations/
> LinkedAccounts) — они привязаны к цвету баннера, ghost-фон им вредит.


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
- `.btn-ghost` → `<Button variant="outline" size="sm">`: `RuntimeOomBanner.tsx:51,57`
  ⚠️ `.btn-ghost` — название обманчивое: в CSS это `bg-card + border + shadow`,
  визуально это **outline**, а не прозрачный ghost. Маппим в `outline`.
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

## 2. Бейджи ✅ — сделано

> Мигрировано в `control-plane`: статус/роль-бейджи (.pill-leaf/.pill-amber и
> инлайн-спаны) → `<Badge variant>`. Компонент: обводка убрана у
> secondary/warning/destructive (остаётся только у outline); все строковые
> подписи авто-приводятся к «Заглавная + строчные» (normal-case + sentence-case).

| Что | Где | Решение |
|---|---|---|
| `<Badge>` (default/secondary/outline/success/warning/destructive) | 1 файл | 🟢 **канон** |
| `.pill`, `.pill-leaf`, `.pill-amber` (CSS) | ~10 | 🔴 слить в `<Badge>` |
| Инлайновые `rounded-full bg-*-50/100 text-*` спаны | **22** | 🟡 мигрировать в `<Badge>` |

**Маппинг:** `.pill-leaf` → `success`, `.pill-amber` → `warning`, нейтральный `.pill` →
`secondary`/`outline`. Инлайновые зелёные/янтарные/красные спаны → соответствующий вариант.

**Отдельно:** `.pill-input` — это не бейдж, а поле-пилюля → разобрать в категории «Поля».

---

## 3. Карточки ✅ — сделано

> `ui/card.tsx` удалён (0 импортов) в обоих репо; канон контейнера — `.surface`.


| Что | Где | Решение |
|---|---|---|
| `.surface`, `.surface-interactive`, `.surface-soft` (CSS) | 15 | 🟢 **канон** (тематизирован токенами) |
| `ui/card.tsx` (Card/CardHeader/…) | **0 импортов** | 🔴 удалить мёртвый код |

Решение: оставить `.surface` как канонический контейнер. Позже — опционально обернуть
в компонент `<Surface>`. `ui/card.tsx` удалить (нигде не используется).

---

## 4. Поля ввода 🟡 — частично

> Стандартные text-поля → `<Input>` (Settings hex, DropDeploy name). Сырые поиски
> в пикерах/Command Palette — категория 7; спец-типы (color/radio/checkbox/file/
> сгруппированные/mono-строки env) оставлены.


| Что | Где | Решение |
|---|---|---|
| `<Input>` | + | 🟢 канон |
| Сырые `<input className>` | 26 | 🟡 мигрировать в `<Input>` |
| `.pill-input` | 1 | 🔴 разобрать (в `<Input>` или вариант) |
| `<Label>`, `<Select>`, `<Switch>` | — | 🟢 канон |

---

## 5. Модалки ✅ — сделано

> Все модалки (Confirm/ComingSoon/CreateTeam/Upload/RepoFolder/Install) уже на
> примитиве `Dialog`. Ad-hoc оверлеи оставлены намеренно: мобильный drawer
> (Sidebar) и CommandPalette — это не диалоги.


Примитив `Dialog` (Radix) — 🟢 канон. Поверх него — много самописных оболочек с
дублирующейся структурой:

- `ConfirmDialog` 🟢 (общий — оставить, на него переводить подтверждения)
- `ComingSoonModal`, `CreateTeamModal`, `UploadFolderModal`, `RepoFolderPicker`,
  `InstallAccountPicker` — 🟡 привести к единой оболочке на `Dialog`
- ad-hoc оверлеи `fixed inset-0 z-…` (мобильный drawer в `Sidebar`, `CommandPalette`) —
  🟡 вынести общий `<Overlay>`/`<Drawer>` примитив

---

## 6. Баннеры / информеры ✅ — сделано

> `Informer` получил тоны success/warning/danger/info. Проектные баннеры
> (RuntimeOom/CdnFailed → danger, RuntimeType/Suspended → warning) переведены
> на `<Informer tone>`. `MaintenanceBanner` (узкая полоса) оставлен отдельным.


`Informer` (success) — 🟢 канон. Доработать: тоны `success | warning | danger | info`.
Затем мигрировать:

- `RuntimeTypeBanner`, `RuntimeOomBanner`, `CdnFailedBanner`, `SuspendedBanner` (проектные)
- `MaintenanceBanner` (узкая полоса сверху — отдельный вариант `Informer` или свой `Banner`)

---

## 7. Пикеры / свитчеры ✅ — закрыто (с оговоркой)

> `ListPicker` (поиск + список + футер) создан и применён к **`ProjectPicker`**
> (страница выбора проекта) — чистый кейс.
>
> Хедер-свитчеры (`ProjectSwitcher`, `OrganizationSwitcher`) и диалоговые
> пикеры (`GitRepoPicker`, `RepoFolderPicker`, `InstallAccountPicker`)
> **оставлены bespoke намеренно**: у них своя логика (viewport-позиционирование
> popover, действия в строках «Импорт»/«Импортирован», auto-import, suspended-
> баннеры). Натягивание `ListPicker` = большой рефактор с риском регрессий ради
> малого выигрыша. При желании позже можно вынести лёгкие общие куски (стиль
> строки/поиска), но это необязательно.

## 8. Аватары ✅ — сделано

> Общий примитив `ui/avatar.tsx` (форма square/circle, градиент по seed, инициал,
> опц. картинка). `ProjectAvatar` и `OrgAvatar` (в OrganizationSwitcher) переведены
> на него; personal-аккаунт — фикс. emerald→cyan через `gradient`-оверрайд.


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
