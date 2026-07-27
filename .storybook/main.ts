import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
    "@storybook/addon-designs",
  ],
  framework: { name: "@storybook/react-vite", options: {} },
  // Шрифты отдаём со своего хоста (см. preview-head.html), поэтому статику
  // из public/ нужно объявить явно: `storybook build` копирует только то,
  // что здесь перечислено.
  staticDirs: ["../public"],
  core: { disableTelemetry: true },
  // The app's vite.config (react plugin + the `@` → src alias) is picked up
  // automatically by @storybook/react-vite, so stories can import `@/...`.
};

export default config;
