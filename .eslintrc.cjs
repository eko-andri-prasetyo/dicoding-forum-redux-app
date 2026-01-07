/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es2022: true
  },
  extends: [
    'standard',
    'standard-jsx',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    // We use modern React (no need to import React in JSX)
    'react/react-in-jsx-scope': 'off',
    // Dicoding criteria doesn't require PropTypes; we keep it simple.
    'react/prop-types': 'off'
  }
}
