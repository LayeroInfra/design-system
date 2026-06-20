import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    // Background comes from the app's own tokens (html/body use var(--background),
    // flipped by the .dark class), so the built-in backgrounds tool is off.
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: ["Foundations", "Primitives", "Components", "Patterns"],
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: { light: "", dark: "dark" },
      defaultTheme: "light",
      parentSelector: "html",
    }),
    (Story) => (
      <div style={{ padding: "2rem", minHeight: "100vh" }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
