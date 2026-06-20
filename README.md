# Layero Design System

Каталог UI-компонентов платформы [Layero](https://layero.ru) на [Storybook](https://storybook.js.org/).
Единый источник правды для примитивов интерфейса: кнопки, поля, бейджи, информеры,
оверлеи (диалоги, поповеры, меню) и дизайн-токены (палитра, темы).

## Локальная разработка

```bash
npm install
npm run storybook   # http://localhost:6006
```

## Сборка статики

```bash
npm run build-storybook   # → storybook-static/
```

`storybook-static/` — обычный статический сайт, его можно отдавать любым
статик-хостингом.

## Деплой на Layero

Каталог хостится как отдельный проект на самой Layero (догфудинг):

| Параметр | Значение |
|---|---|
| Репозиторий | `LayeroInfra/design-system` |
| Build-команда | `npm run build-storybook` |
| Output-директория | `storybook-static` |

На каждый push в `main` Layero пересобирает каталог. SPA-rewrite не нужен —
Storybook отдаёт реальный `index.html` и навигирует через `?path=`.

## Структура

- `src/components/ui/*` — примитивы (shadcn/ui-стиль, Radix + Tailwind) и их stories.
- `src/stories/Foundations.*` — токены и палитра.
- `src/index.css` — дизайн-токены (CSS-переменные) и Tailwind-слои; светлая/тёмная тема через класс `.dark`.
- `tailwind.config.js` — палитра (в т.ч. тёплый `green`, завязанный на системный зелёный) и токены.
- `.storybook/*` — конфиг Storybook (Vite-билдер, Tailwind, шрифты Geist, переключатель тем, аддон a11y).

## Связь с платформой (пропагация на фронт)

Этот репозиторий — **единственный источник правды** для примитивов `ui/*` и
хелпера `cn()`. В приложениях (`control-plane`) эти файлы — генерируемое зеркало;
править их там нельзя. Правки вносятся здесь, затем прокидываются:

- **Авто (CI):** push в `main`, затрагивающий `src/components/ui/**` или
  `src/lib/utils.ts`, запускает workflow [`sync-to-frontend.yml`](.github/workflows/sync-to-frontend.yml),
  который открывает PR в `LayeroInfra/frontend` с обновлёнными примитивами.
  Нужен секрет репозитория **`FRONTEND_SYNC_TOKEN`** — PAT с правом записи на
  `frontend` (classic: `repo` + `workflow`; fine-grained: Contents + Pull requests).
- **Вручную:** в `control-plane` → `npm run sync:ds` (или
  `DS_PATH=../../design-system npm run sync:ds` для локального чекаута).

Не синкаются: `*.stories.tsx` (живут только в каталоге) и app-уровень
(`tailwind.config.js`, токены `index.css`) — он остаётся за приложением.
