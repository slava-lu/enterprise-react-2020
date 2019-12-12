module.exports = {
  extends: ['react-app', 'plugin:jsx-a11y/recommended', 'standard', 'standard-react', 'prettier', 'prettier/react'],
  plugins: ['jsx-a11y', 'prettier', 'standard'],
  rules: {
    'prettier/prettier': 'error',
    'react/prop-types': 'off',
    'prefer-promise-reject-errors': 'off'
  }
}
