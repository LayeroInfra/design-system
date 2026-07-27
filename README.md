# Layero Design System

Каталог UI-компонентов платформы [Layero](https://layero.ru) на [Storybook](https://storybook.js.org/).
Единый источник правды для примитивов интерфейса: кнопки, поля, бейджи, информеры,
оверлеи (диалоги, поповеры, меню) и дизайн-токены (палитра, темы).

🔍 **Живой каталог:** <https://ui-catalog-ds.layero.app>

Он опубликован на самой Layero и пересобирается при каждом push — тем же
[GitHub Action](https://github.com/LayeroInfra/deploy-action), который мы
предлагаем пользователям.

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
| Проект на Layero | `ui-catalog-ds` |
| Что уезжает | готовый `storybook-static` (`prebuilt`) |

Сборка идёт **здесь**, в GitHub Actions (`deploy-storybook.yml`), а на Layero
уходит уже собранная статика: так быстрее и не заставляет платформу ставить
Storybook со всеми аддонами. То есть платформа каталог не пересобирает — она
его раздаёт. SPA-rewrite не нужен: Storybook отдаёт реальный `index.html` и
навигирует через `?path=`.

Выкатить вручную (например, когда CI недоступен) — той же командой, что и в
workflow:

```bash
npm run build-storybook
npx layero@latest deploy --project ui-catalog-ds --prebuilt storybook-static --prod --yes
```

`--project`, а не `--name`: без закоммиченного `.layero/project.json` каждый
запуск считается первым, и `--name` плодил бы новый проект на каждый прогон.

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

- **Авто (CI):** воркфлоу `sync-design-system.yml` живёт в репозитории
  `LayeroInfra/frontend` (а не здесь): по расписанию (раз в день) и по кнопке
  «Run workflow» он клонирует этот публичный репозиторий и открывает PR в
  `frontend` встроенным `GITHUB_TOKEN`. **Никакого PAT/секрета не нужно** —
  чтение публичного репо не требует авторизации. Разовая настройка в `frontend`:
  Settings → Actions → General → «Allow GitHub Actions to create and approve
  pull requests».
- **Вручную:** в `control-plane` → `npm run sync:ds` (или
  `DS_PATH=../../design-system npm run sync:ds` для локального чекаута).

Не синкаются: `*.stories.tsx` (живут только в каталоге) и app-уровень
(`tailwind.config.js`, токены `index.css`) — он остаётся за приложением.
