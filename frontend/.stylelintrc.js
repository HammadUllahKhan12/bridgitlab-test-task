const { propertyOrdering, selectorOrderFactory } = require("stylelint-semantic-groups");

module.exports = {
  extends: ["stylelint-config-html", "stylelint-config-standard-scss", "stylelint-config-recommended-vue/scss"],
  plugins: ["stylelint-order"],
  rules: {
    "alpha-value-notation": "number",
    "at-rule-no-unknown": null,
    "color-function-notation": null,
    "custom-property-pattern": null,
    "media-feature-range-notation": "prefix",
    "number-max-precision": 6,
    "selector-class-pattern": null,
    "scss/at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["tailwind", "apply", "variants", "responsive", "screen"],
      },
    ],
    "scss/dollar-variable-empty-line-before": null,
    "scss/no-global-function-names": null,
    "declaration-empty-line-before": null,
    "order/properties-order": propertyOrdering,
    "value-keyword-case": ["lower", { camelCaseSvgKeywords: true }],
    "order/order": [
      "custom-properties",
      "dollar-variables",
      {
        type: "at-rule",
        name: "include",
      },
      {
        type: "at-rule",
        name: "extend",
      },
      {
        type: "at-rule",
        name: "apply",
      },
      "declarations",
      {
        type: "rule",
        selector: "^&:(before|after)",
      },
      {
        type: "rule",
        selector: "^&::(before|after)",
      },
      {
        type: "rule",
        selector: "^&::placeholder",
      },
      {
        type: "rule",
        selector: "^&:(first-child|last-child|nth-child|last-of-type|first-of-type|nth-of-type)",
      },
      {
        type: "rule",
        selector: "&:hover",
      },
      {
        type: "rule",
        selector: "&:focus",
      },
      {
        type: "rule",
        selector: "&:active",
      },
      {
        type: "rule",
        selector: "&:indeterminate",
      },
      {
        type: "rule",
        selector: "&:checked",
      },
      {
        type: "rule",
        selector: "&:disabled",
      },
      {
        // BEM element
        type: "rule",
        selector: "&__",
      },
      {
        // BEM modifiers
        type: "rule",
        selector: "&--",
      },
      "at-rules",
      "rules",
      {
        type: "at-rule",
        name: "container",
      },
      {
        type: "at-rule",
        name: "media",
      },
      "at-rules",
      "rules",
      {
        type: "at-rule",
        name: "screen",
      },
    ],
  },
  ignoreFiles: ["dist/**/*", "node_modules/**/*"],
};
