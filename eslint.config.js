import config from "@grby/eslint-config";

export default [
  ...config,
  {
    languageOptions: {
      globals: {
        process: "readonly",
      },
    },
  },
];
