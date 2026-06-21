# Покрытие control-plane дизайн-системой

Аудит: где UI на компонентах ДС, а где сырой/ad-hoc, и что добавить/смержить.
Статус: ✅ сделано · 🟡 в работе · ⬜ запланировано.

## Адопшн ядра (хорошо)

`Button` 37 · `Dialog` 11 · `Input` 11 · `Badge` 9 · `Informer` 7 · `Switch` 4.

## Новые компоненты (в ДС не было)

| Компонент | Где нужно | Статус |
|---|---|---|
| **Textarea** | DebugPanel, BetaProgram | ✅ |
| **Tabs / Segmented** | NewProject (тип), Dashboard (фильтр-чипы), таб-навигация проекта | ⬜ |
| **Spinner** | 5 мест ad-hoc + инлайн в Button | ⬜ |
| **Checkbox** | Billing | ⬜ |
| **RadioGroup** | Settings (prod-окружение) | ⬜ |
| **CodeBlock / Snippet** | 7 `<pre>` (команды/сниппеты) | ⬜ |
| **EmptyState** | GitRepoPicker, ProjectPicker, … | ⬜ |
| **Breadcrumb** | шапка `layero / org / project` | ⬜ (низкий) |
| **Table** | PageSpeed | ⬜ (низкий) |

## Мердж / адопшн

| | Что | Статус |
|---|---|---|
| **Select** | в ДС есть `ui/select`, но в app **12 нативных `<select>`** (7 файлов) → мигрировать | ⬜ |
| **Skeleton** | у app богаче (`SkeletonRows/Text/Page/Project…`), в ДС базовый → перенести набор в ДС | ⬜ |
| **Tooltip** | 1 использование vs **114 нативных `title=`** → выборочно перевести важные | ⬜ (низкий) |

## Осознанно НЕ трогаем

- `DropdownMenu` / `Popover` / `Separator` — в ДС есть, но в app это bespoke-дропдауны
  свитчеров/пикеров (оставлены кастомными, см. CONSOLIDATION §7).
- Нативные `color` / `file` — не для `Input`; сгруппированные поля с префиксом (slug, labelDraft).

## Порядок

1. ✅ Textarea
2. ⬜ Select (мердж 12 нативных)
3. ⬜ Tabs / Segmented
4. ⬜ Spinner + Skeleton-мердж
5. ⬜ Checkbox / RadioGroup, CodeBlock, EmptyState
