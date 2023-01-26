module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: ['plugin:react/recommended', 'eslint:recommended'],
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react','jest'],
    rules: {
        semicolon: 'off',
    },
    parser: '@typescript-eslint/parser',
};
