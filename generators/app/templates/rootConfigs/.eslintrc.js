module.exports = {
    "env": {
        "browser": true,
        "node": true
    },
    "globals": {
        "fetch": true
    },
    "root": true,
    "parser": "@typescript-eslint/parser",  // 识别路径别名
    "parserOptions": {
        "ecmaVersion": 2019,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        },
        // "project": "./tsconfig.json",
        // "tsconfigRootDir": "./"
    },
    "plugins": [
        "@typescript-eslint",   // 识别路径别名
        "import",              // 识别路径别名
        "react",    
        "react-hooks"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        // "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended"
    ],
    "ignorePatterns": [".eslintrc.js"],  // 不检查自身
    "rules": {
        "import/no-unresolved": "warn",
        "prefer-rest-params": "off",
        "prefer-spread": "off",
        "eol-last": 2,
        "no-undef": 2,
        "quotes": [2, "single", { "avoidEscape": true, "allowTemplateLiterals": true }],  // 字符一般用单引号‘,允许用双引号"和连字号`
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/member-delimiter-style": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/ban-ts-ignore": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-this-alias": "off",
        "@typescript-eslint/semi": 2,
        "@typescript-eslint/triple-slash-reference": 0,
        "@typescript-eslint/no-unused-vars": ["warn"],
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "react/display-name": "off",
        "react/prop-types": "warn",
        "react/no-string-refs": 0,
        "react/no-children-prop": 0,
        "react/jsx-no-target-blank": 0,
        "react/no-render-return-value": 0,
        "react/no-direct-mutation-state": "off",
        "react/no-unescaped-entities": "off",
        "react/no-find-dom-node": "off",
        "react/no-deprecated": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "jsx-quotes": [2, "prefer-double"]
    },
    "settings": { // 共享设置
        "react": {
            "pragma": "React",
            "version": "detect"
        },
        "import/parsers": {
            "@typescript-eslint/parser": [
                ".ts",
                ".tsx"
            ]
        },
        "import/resolver": { 
            "node": {
                "extensions": [
                    ".ts",
                    ".tsx"
                ]
            },
            "typescript": { // 识别路径别名
                "extensions": [
                    ".ts",
                    ".tsx",
                    ".js",
                    ".jsx"
                ],
                "alwaysTryTypes": true
            }
        },
    }
};
