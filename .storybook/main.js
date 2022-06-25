module.exports = {
  "stories": [
    "../src/stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    // Other Storybook addons
    '@storybook/addon-a11y'
  ],
  "framework": "@storybook/react"
}