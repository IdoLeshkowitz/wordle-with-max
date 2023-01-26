module.exports = {
    "extends": ['plugin:react/recommended', 'eslint:recommended', 'plugin:typescript-eslint/recommended'],
    "parser": '@typescript-eslint/parser',
    "plugins": ['@typescript-eslint'],
    "parserOptions": {"ecmaVersion": "latest"},
    "env":{"browser":true,"es2021":true},
};
