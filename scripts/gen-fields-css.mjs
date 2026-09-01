#!/usr/bin/env node
/**
 * Генерирует `styles/fields.css` — вид полей ввода для НЕ-React поверхностей.
 *
 * Зачем. Примитивы `input` / `select` / `textarea` / `label` живут здесь как
 * React-компоненты на Tailwind. Лендинг (`frontend/landing`) — статический
 * HTML без сборщика: ни React, ни Tailwind туда не приезжают, а поля ввода там
 * нужны (форма приёма жалоб на layero.ru/abuse.html). До этого скрипта вид
 * полей был на лендинге СКОПИРОВАН строкой — ровно то, о чём предупреждает
 * комментарий у `fieldTriggerClass`: две копии одного вида расходятся молча.
 *
 * Как. Источник правды НЕ переезжает: значения ВЫЧИТЫВАЮТСЯ из токенов
 * (`src/index.css`) и из классов самих компонентов. Скрипт ничего не знает
 * наизусть — поменяли `h-9` на `h-10`, перегенерировали, CSS поехал следом.
 *
 * 🚨 Разбор Tailwind тут не полный и полным быть не должен: скрипт достаёт
 * ровно те утилиты, что описывают поле, и ПАДАЕТ, если не нашёл. Молчаливый
 * вывод «по умолчанию» здесь опаснее отказа — он выглядит как рабочий CSS.
 *
 * Тёмная тема отдаётся блоком `.dark` — правило 2: компонент обязан работать
 * в обеих. Именно классом, а не медиазапросом: медиазапрос потемнил бы форму
 * на светлом лендинге у того, у кого системная тема тёмная.
 *
 *   node scripts/gen-fields-css.mjs           # записать
 *   node scripts/gen-fields-css.mjs --check   # сверить, ничего не писать
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const SRC = join(ROOT, "src");
const OUT = join(ROOT, "styles", "fields.css");

const read = (p) => readFileSync(p, "utf8");

function die(msg) {
  console.error(`✗ ${msg}`);
  console.error(
    "\nWHAT: генератор не нашёл в дизайн-системе значение, которое обязан вычитать.\n" +
      "WHY:  подставить умолчание значило бы выдать правдоподобный, но неверный\n" +
      "      CSS — а он уедет на лендинг и разойдётся с панелью молча.\n" +
      "FIX:  посмотрите, как изменился класс или токен, и поправьте разбор здесь.",
  );
  process.exit(2);
}

/** Значение CSS-переменной из светлой темы (первое объявление в `:root`). */
function cssVar(css, name) {
  const m = css.match(new RegExp(`^\\s*${name}:\\s*([^;]+);`, "m"));
  return m ? m[1].trim() : null;
}

/** То же из блока `.dark` — тема переключается токенами, а не ветвлением. */
function darkVar(css, name) {
  const block = css.slice(css.indexOf(".dark {"));
  const m = block.match(new RegExp(`^\\s*${name}:\\s*([^;]+);`, "m"));
  return m ? m[1].trim() : null;
}

/** Строковый литерал длинной классовой константы. */
function classString(src, constName) {
  const m = src.match(new RegExp(`${constName}\\s*=\\s*\\n?\\s*"(.*?)";`, "s"));
  return m ? m[1] : null;
}

/** Первый className={cn( "…" ) } компонента. */
function firstCn(src) {
  const m = src.match(/className=\{cn\(\s*(?:\/\/[^\n]*\n\s*)*"(.*?)"/s);
  return m ? m[1] : null;
}

/** Tailwind spacing → px (шкала 4px). */
function spacing(cls, prefix) {
  const m = cls.match(new RegExp(`\\b${prefix}-(\\d+(?:\\.\\d+)?)\\b`));
  return m ? Number(m[1]) * 4 : null;
}

// ── читаем источник ──────────────────────────────────────────────────────────
const tokens = read(join(SRC, "index.css"));
const selectSrc = read(join(SRC, "components", "ui", "select.tsx"));
const inputSrc = read(join(SRC, "components", "ui", "input.tsx"));
const textareaSrc = read(join(SRC, "components", "ui", "textarea.tsx"));
const labelSrc = read(join(SRC, "components", "ui", "label.tsx"));

const trigger = classString(selectSrc, "fieldTriggerClass");
if (!trigger) die("в select.tsx не найден fieldTriggerClass");

const inputCls = firstCn(inputSrc);
if (!inputCls) die("в input.tsx не найден первый className={cn(…)}");
const textareaCls = firstCn(textareaSrc);
if (!textareaCls) die("в textarea.tsx не найден первый className={cn(…)}");
const labelCls = firstCn(labelSrc);
if (!labelCls) die("в label.tsx не найден первый className={cn(…)}");

// ── вычисляем спеку ──────────────────────────────────────────────────────────
const radiusRem = cssVar(tokens, "--radius");
if (!radiusRem || !/rem$/.test(radiusRem)) die(`--radius не разобран: ${radiusRem}`);
const radiusPx = parseFloat(radiusRem) * 16;
// tailwind.config.js: rounded-md = calc(var(--radius) - 2px)
const mdRadius = `${radiusPx - 2}px`;

const height = spacing(trigger, "h");
if (!height) die("в fieldTriggerClass не найдена высота (h-N)");

const padX = spacing(trigger, "px");
if (!padX) die("в fieldTriggerClass не найден горизонтальный отступ (px-N)");

const taPadY = spacing(textareaCls, "py");
if (!taPadY) die("в textarea.tsx не найден вертикальный отступ (py-N)");

const taMin = textareaCls.match(/min-h-\[(\d+)px\]/);
if (!taMin) die("в textarea.tsx не найдена min-h-[Npx]");

// text-base на мобильном, text-sm от sm: — так в input.tsx, чтобы iOS не
// зумил вьюпорт при фокусе. Если приём убрали — не выдумываем, падаем.
if (!/text-base\s+sm:text-sm/.test(inputCls)) {
  die("в input.tsx пропала пара `text-base sm:text-sm` — размер шрифта не выведен");
}
if (!/\btext-sm\b/.test(labelCls) || !/\bfont-medium\b/.test(labelCls)) {
  die("в label.tsx пропали text-sm / font-medium");
}
if (!/\bshadow-sm\b/.test(trigger)) die("в fieldTriggerClass пропала shadow-sm");
const ringM = trigger.match(/ring-neutral-(\d+)\/(\d+)\b/);
if (!ringM) die("в fieldTriggerClass не найдено кольцо фокуса ring-neutral-N/M");
const ringRgb = cssVar(tokens, `--neutral-${ringM[1]}`);
if (!ringRgb) die(`токен --neutral-${ringM[1]} не найден`);
const ringAlpha = Number(ringM[2]) / 100;
const ringWidth = spacing(trigger, "ring") ?? 2; // ring-2 → 2px, шкала тут 1:1
const ringPx = trigger.includes("ring-2") ? 2 : ringWidth;

const vars = {
  "--ds-field-h": `${height}px`,
  "--ds-field-radius": mdRadius,
  "--ds-field-pad-x": `${padX}px`,
  "--ds-field-border": cssVar(tokens, "--input"),
  "--ds-field-bg": cssVar(tokens, "--card"),
  "--ds-field-fg": cssVar(tokens, "--foreground"),
  "--ds-field-muted": cssVar(tokens, "--muted-foreground"),
  "--ds-field-ring": cssVar(tokens, "--ring"),
  "--ds-field-ring-shadow": `0 0 0 ${ringPx}px rgba(${ringRgb.replace(/\s+/g, ", ")}, ${ringAlpha})`,
  "--ds-field-textarea-min": `${taMin[1]}px`,
  "--ds-field-textarea-pad-y": `${taPadY}px`,
};
for (const [k, v] of Object.entries(vars)) if (!v) die(`значение для ${k} не выведено`);

// Тёмная тема — правило 2 дизайн-системы: компонент обязан работать в обеих.
// Переключается КЛАССОМ `.dark`, а не медиазапросом, поэтому потребитель без
// тёмной темы (статический лендинг) её просто не включает и ничего не теряет.
const darkRingRgb = darkVar(tokens, `--neutral-${ringM[1]}`);
if (!darkRingRgb) die(`тёмный токен --neutral-${ringM[1]} не найден`);
const darkVars = {
  "--ds-field-border": darkVar(tokens, "--input"),
  "--ds-field-bg": darkVar(tokens, "--card"),
  "--ds-field-fg": darkVar(tokens, "--foreground"),
  "--ds-field-muted": darkVar(tokens, "--muted-foreground"),
  "--ds-field-ring": darkVar(tokens, "--ring"),
  "--ds-field-ring-shadow": `0 0 0 ${ringPx}px rgba(${darkRingRgb.replace(/\s+/g, ", ")}, ${ringAlpha})`,
};
for (const [k, v] of Object.entries(darkVars)) if (!v) die(`тёмное значение для ${k} не выведено`);

// Стрелка селектора — lucide ChevronDown, 16px, прозрачность 50% (см.
// SelectTrigger). Цвет запечён в data-URI, токен туда не подставить, поэтому
// стрелка сама становится переменной: своя для каждой темы. Иначе в тёмной
// теме поле посветлело бы, а стрелка осталась чёрной.
const chevron = (hex) =>
  `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' ` +
  `width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23` +
  `${hex.replace("#", "")}' stroke-width='2' stroke-linecap='round' ` +
  `stroke-linejoin='round' opacity='.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`;
vars["--ds-field-chevron"] = chevron(vars["--ds-field-ring"]);
darkVars["--ds-field-chevron"] = chevron(darkVars["--ds-field-ring"]);

const css = `/* СГЕНЕРИРОВАНО design-system/scripts/gen-fields-css.mjs — НЕ ПРАВИТЬ РУКАМИ.
 *
 * Вид полей ввода для поверхностей без React и Tailwind (статический лендинг).
 * Значения выведены из src/index.css и src/components/ui/{select,input,
 * textarea,label}.tsx — правьте ТАМ и перегенерируйте:
 *
 *     cd design-system && make fields
 *
 * Тёмная тема — блоком .dark в конце файла. Она включается КЛАССОМ, а не
 * медиазапросом, поэтому потребитель без тёмной темы (статический лендинг)
 * её просто не ставит: форма остаётся светлой на светлой странице.
 */
:root {
${Object.entries(vars).map(([k, v]) => `  ${k}: ${v};`).join("\n")}
}

.ds-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  color: var(--ds-field-fg);
}

.ds-field {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: var(--ds-field-h);
  padding: 0 var(--ds-field-pad-x);
  font-family: inherit;
  /* 16px на мобильном — иначе iOS зумит вьюпорт при фокусе; 14px от sm. */
  font-size: 16px;
  color: var(--ds-field-fg);
  background: var(--ds-field-bg);
  border: 1px solid var(--ds-field-border);
  border-radius: var(--ds-field-radius);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
  transition: border-color .15s ease, box-shadow .15s ease;
}

@media (min-width: 640px) {
  .ds-field { font-size: 14px; }
}

.ds-field::placeholder { color: var(--ds-field-muted); }

.ds-field:focus {
  outline: none;
  border-color: var(--ds-field-ring);
  box-shadow: var(--ds-field-ring-shadow);
}

.ds-field:disabled { cursor: not-allowed; opacity: .5; }

textarea.ds-field {
  height: auto;
  min-height: var(--ds-field-textarea-min);
  padding: var(--ds-field-textarea-pad-y) var(--ds-field-pad-x);
  line-height: 1.5;
  resize: vertical;
}

select.ds-field {
  appearance: none;
  -webkit-appearance: none;
  padding-right: calc(var(--ds-field-pad-x) * 2 + 10px);
  background-image: var(--ds-field-chevron);
  background-repeat: no-repeat;
  background-position: right calc(var(--ds-field-pad-x) - 1px) center;
}

select.ds-field:invalid { color: var(--ds-field-muted); }

.dark {
${Object.entries(darkVars).map(([k, v]) => `  ${k}: ${v};`).join("\n")}
}
`;

const check = process.argv.includes("--check");
const current = existsSync(OUT) ? read(OUT) : null;

if (check) {
  if (current === css) {
    console.log(`✓ styles/fields.css совпадает со спекой (${Object.keys(vars).length} значений)`);
    process.exit(0);
  }
  console.error("\n✗ styles/fields.css отстал от компонентов или токенов\n");
  console.error(
    "WHAT: сгенерированный CSS полей не совпадает с тем, что лежит в репозитории.\n" +
      "WHY:  этот файл вендорится в frontend/landing и определяет вид полей на\n" +
      "      layero.ru. Отставший файл — это разъехавшиеся поля у лендинга и\n" +
      "      панели, видимые только глазом и только рядом.\n" +
      "FIX:  cd design-system && make fields, затем закоммитьте результат.\n" +
      "      Лендинг вендорит копию — там `make -C ../frontend check-crossrepo`.",
  );
  process.exit(1);
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, css, "utf8");
console.log(
  current === css
    ? `· styles/fields.css без изменений (${Object.keys(vars).length} значений)`
    : `✓ styles/fields.css обновлён (${Object.keys(vars).length} значений)`,
);
