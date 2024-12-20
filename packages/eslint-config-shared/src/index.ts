export default {
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['node_modules/'],
  extends: [
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'turbo'
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.mjs', '.d.ts']
      }
    }
  },
  rules: {
    'turbo/no-undeclared-env-vars': 'off',
    'eol-last': ['error', 'always'],
    'no-multi-spaces': ['error'],
    'array-bracket-spacing': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
    'newline-after-var': ['error', 'always'],
    'import/named': 'off',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      { 'ts-ignore': 'allow-with-description' }
    ],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: { delimiter: 'none' }
      }
    ],
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        disallowTypeAnnotations: false
      }
    ],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    '@typescript-eslint/indent': [
      'error',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        MemberExpression: 1,
        FunctionDeclaration: { parameters: 1, body: 1 },
        FunctionExpression: { parameters: 1, body: 1 },
        CallExpression: { arguments: 1 },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        ignoreComments: false,
        offsetTernaryExpressions: true
      }
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_' }
    ],
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: false, variables: true }
    ],
    '@typescript-eslint/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
    '@typescript-eslint/comma-dangle': ['error', 'never'],
    '@typescript-eslint/object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/quotes': ['error', 'single'],
    '@typescript-eslint/space-before-blocks': ['error', 'always'],
    '@typescript-eslint/space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    '@typescript-eslint/space-infix-ops': 'error',
    '@typescript-eslint/keyword-spacing': [
      'error',
      { before: true, after: true }
    ],
    '@typescript-eslint/comma-spacing': ['error', { before: false, after: true }],
    '@typescript-eslint/no-extra-parens': ['error', 'functions'],
    '@typescript-eslint/no-dupe-class-members': 'error',
    '@typescript-eslint/no-loss-of-precision': 'error',
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true }
    ]
  }
};
