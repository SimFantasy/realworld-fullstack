module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': 'off',
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'off',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'react/prop-types': 'off'
  }
}
