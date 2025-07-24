import config from "@grby/eslint-config";

export default [
  ...config,
  {
    languageOptions: {
      globals: {
        Bun: "readonly",
        process: "readonly",
      },
    },
  },
];
