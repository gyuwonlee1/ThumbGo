import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: ["app-design/**", "node_modules/**", ".next/**", "out/**"]
  },
  ...nextVitals,
  {
    rules: {
      "@next/next/no-img-element": "off",
      "react-hooks/purity": "off",
      "react-hooks/set-state-in-effect": "off"
    }
  }
];

export default eslintConfig;
