import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

// Боковая панель по умолчанию подписана «Storybook» и ведёт на storybook.js.org.
// Каталог публичный — пусть называет себя и ведёт на платформу.
addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Layero UI",
    brandUrl: "https://layero.ru",
    brandTarget: "_blank",
  }),
});
