module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  overrides: [],
  'import/no-extraneous-dependencies': 'off',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['react'],
  rules: {},
};
