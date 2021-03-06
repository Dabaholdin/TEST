// http://eslint.org/docs/user-guide/configuring
module.exports = {
    'root': true,
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'sourceType': 'module'
    },
    'env': {
        'es6': true,
        'browser': true,
        'node': true
    },
    'rules': {
        'no-mixed-spaces-and-tabs': 2,
        'max-len': [
            'error',
            120,
            4,
            {
                'ignoreTrailingComments': true,
                'ignoreComments': true,
                'code': 120,
                'ignoreUrls': true,
                'ignoreTemplateLiterals': true,
                'ignoreStrings': true,
                'ignoreRegExpLiterals': true
            }
        ],
        'semi': 'off',
        'arrow-parens': 'off',
        'comma-dangle': 'off',
        'indent': 'off',
        'require-jsdoc': 'off',
        'operator-linebreak': 'off',
        'valid-jsdoc': 'off',
        'space-before-function-paren': 'off',
        'react/prop-types': 'off',
        'linebreak-style': 'off'
    },
    'plugins': [
        'react'
    ],
    'ignorePatterns': [
        'resources/js/components/UI/iconComponents/*.tsx'
    ],
    'extends': [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'eslint:recommended',
        'google'
    ]
}
