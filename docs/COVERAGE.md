# Покрытие control-plane дизайн-системой

Аудит: где UI на компонентах ДС, а где сырой/ad-hoc, и что добавить/смержить.
Статус: ✅ сделано · 🟡 в работе · ⬜ запланировано.

## Адопшн ядра (хорошо)

`Button` 37 · `Dialog` 11 · `Input` 11 · `Badge` 9 · `Informer` 7 · `Switch` 4.

## Новые компоненты (в ДС не было)

| Компонент | Где нужно | Статус |
|---|---|---|
| **Textarea** | DebugPanel, BetaProgram | ✅ |
| **Segmented** | NewProject (выбор IDE) | ✅ |
| **FilterChip** | Dashboard (фильтры статусов) | ✅ |
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
| **Select** | 11 нативных `<select>` → `ui/select` (Team/Members/Perf/PageSpeed/DropDeploy/Integrations) | ✅ |
| **Skeleton** | generic-набор (`Skeleton/Text/Rows`) канон в ДС; роут-скелетоны остаются в app | ✅ |
| **Tooltip** | 1 использование vs **114 нативных `title=`** → выборочно перевести важные | ⬜ (низкий) |

## Осознанно НЕ трогаем

- `DropdownMenu` / `Popover` / `Separator` — в ДС есть, но в app это bespoke-дропдауны
  свитчеров/пикеров (оставлены кастомными, см. CONSOLIDATION §7).
- Нативные `color` / `file` — не для `Input`; сгруппированные поля с префиксом (slug, labelDraft).

## Порядок

1. ✅ Textarea
2. ✅ Select (мердж нативных)
3. ⬜ Tabs / Segmented
4. ✅ Spinner + Skeleton (generic канон в ДС)
5. ⬜ Checkbox / RadioGroup, CodeBlock, EmptyState
