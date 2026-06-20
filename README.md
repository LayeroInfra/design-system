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

## Связь с платформой

Компоненты здесь — целевой канон. Приложения (`control-plane` и др.) постепенно
переезжают на эти компоненты; правки вносятся сначала здесь.
