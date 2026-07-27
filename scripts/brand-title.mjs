// Storybook жёстко пишет <title>@storybook/core - Storybook</title> в шаблон
// менеджера. Через `managerHead` это не поправить: хук получает только тот
// кусок <head>, который сам же и вставляет, — тег заголовка лежит выше, а
// второй <title> браузер игнорирует (проверено маркером в сборке).
//
// Каталог публичный, на него ссылается профиль организации, поэтому во вкладке
// и в закладках он не должен быть безымянным.
import { readFileSync, writeFileSync } from "node:fs";

const FILE = "storybook-static/index.html";
const TITLE = "Layero UI — каталог компонентов";

const html = readFileSync(FILE, "utf8");
const patched = html.replace(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`);

if (patched === html) {
  console.error(`brand-title: <title> не найден в ${FILE} — шаблон Storybook изменился`);
  process.exit(1);
}
writeFileSync(FILE, patched);
console.log(`brand-title: заголовок → «${TITLE}»`);
