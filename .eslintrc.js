module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    plugins: ['react', '@typescript-eslint'],
    rules: {
        '@typescript-eslint/no-var-requires': 0,
    },
    overrides: [
        {
            files: ['**/?(*.)+(spec|test).[jt]s'],
            extends: ['plugin:jest/recommended'],
        },
    ],
};
