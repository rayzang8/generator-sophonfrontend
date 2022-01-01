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
        "project": "./tsconfig.json",  // TS类型检查
        "tsconfigRootDir": "./"      // TS类型检查
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
        "plugin:@typescript-eslint/recommended-requiring-type-checking", // TS类型检查
        "plugin:react/recommended",
        "plugin:react-hooks/recommended"
    ],
    "ignorePatterns": [".eslintrc.js", "src/menu/*"],  // 不检查自身, 和 menu目录
    "rules": {
        "prefer-rest-params": "off",
        "prefer-spread": "off",
        "eol-last": 2,
        "no-undef": 2,
        "quotes": [2, "single", { "avoidEscape": true, "allowTemplateLiterals": true }],  // 字符一般用单引号‘,允许用双引号"和连字号`
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/member-delimiter-style": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/ban-ts-ignore": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/semi": 2,
        "@typescript-eslint/triple-slash-reference": 0,
        "@typescript-eslint/no-unused-vars": ["warn"],
        "@typescript-eslint/explicit-module-boundary-types": 0,
        "@typescript-eslint/restrict-template-expressions": 1,
        "@typescript-eslint/no-unsafe-assignment": 0,
        "@typescript-eslint/no-floating-promises": 0,
        "@typescript-eslint/no-unsafe-member-access": 0,
        "@typescript-eslint/no-non-null-assertion": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/restrict-template-expressions": 0,
        "@typescript-eslint/no-unsafe-call": 0,
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
