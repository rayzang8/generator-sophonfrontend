# 前端团队项目脚手架 - Webpack@5, TypeScript@4+, React@17+, eslint, sass, less, post-css, cssModule, stylelint, react-router, i18next

## 必要性
作为React开发者一定很熟悉 CRA (Create React App) 它使开发者可以讯速构建出React应用并开始书写业务代码.  然而 CRA 也有许多缺点.  如下:

- 为多个环境构建多个输出包变得团难.  比如, 你可以在应用代码中添加一些代码以便读写一些特定环境的文件, 但如果想在build流程中控制它，那么起码需要弹出(eject)应用配置文件或利用配置重载dependencies

- CRA 使用较老的依赖包,并不能第一时间使用最新版本的特性 (在结稿时, CRA 仍然在使用 webpack 4.41.2 其实webpack 5 早已发布一年有余.)

- 无法使用路径别名, 比如 ```import { Layout } from '#models'``` .  无法在 tsconfig， eslint 以及 webpack 3个上下文中统一使用 (typescript编写, webpack 编辑, eslint检查), 所以要做到所有的上下文件用统一的路径别名这样层度的控制, 还是要弹出(eject)应用配置.

- 使用CRA而过于依赖CRA的话，一旦被迫弹出(eject)基于CRA的应用程序，就不一定知道如何修复问题.  了解 CRA 底层的工具对于自己编写 react app有很多价值.  

> 值得注意的是, webpack 5 对 webpack 4 进行了重大更改包含了breaking change, 这也是CRA 迟迟不升级级的原因, 如果想使用最新的功能, 这也是放弃CRA 的一大原因.  如果想知道 Webpack 5 中有什么新东西以及为什么会要使用它，你可以参考 webpack.js.org 的发行说明在这里: https://webpack.js.org/blog/2020-10-10-webpack-5-release/


## 简介
- 1.脚手架工具目地是加快新项目的生成速度, 免去项目新建时一些基础文件的复制工作,比如：.eslintrc.js, .ignore
- 2.自动生成一些基础代码, 集成了react-router, i18next, Axios, 并完成了登入/登出, 页面切换功能
- 3.搭建了基本的开发环境, 集成了eslint, stylelint, 及其自动修复等功能
- 4.自动完成对后端api的proxy配置
- 5.所有基础的配置文件均可见,方便后续的维护与修改
- 6.i18next 多语言支持自动抽出项目中的key, 生成语言资源包加速开发


## 安装
### 1. 全局安装yo
```shell
npm i -g yo
```
### 2. 全局安装Sophon脚手架
```shell
npm i -g generator-sophonfrontend
```

## 使用
### 1. 新建普通项目
```shell
yo
```
待弹出问题选项后选择 Sophonfrontend, 然后回答诸如项目名,后面服务地址等问题, 然后当前目录就会生成一个与刚才输入的项目名同名的文件夹, 这就是新项目的文件夹.

### 2. 启动开发环境
安装过程的最后一步可以选择直接用yarn/npm安装或者跳过安装依赖, 待后续依赖安装完成后可用以下命令行启动
```shell
yarn start
```
### 3.打包
```shell
yarn build
```
打包同时生成包的size分析
```shell
yarn build:report
```

### 4. TS/JS代码查错
```shell
yarn lint
```

### 5.自动修复TS/JS代码错误 
```shell
yarn fix
```

### 6. 样式查错
```shell
yarn lint:style
```

### 7. 自动修复样式错误
```shell
yarn fix:style
```
> 请注意,在提交代码之前推荐做一下样式纠错, 因为dev阶段没有自动进行样式查错(手动调整css样式的顺序没有必要), 但打包阶段会进行查错
> 引入远程portal 的项目, 基础路径前缀会加上项目模块联邦中的名字, 比如模块联邦名字是data, 则在开发时要用/data/home 打开首页

### 项目后期维护
- 配置文件位于 config/webpack/ 目录
- 其中webpack.common.config.js是基础配置,  webpack.dev.babel.js 用于开发环境, webpack.prod.babel.js 用于打包生成环境
- dev.server.js 可以配置 dev服务启动端口, 后端api 服务地址, 远程组件(portal)服务地址, 在模块联邦中的名称等信息
- module.federation.js 只用来配置模块联邦插件


## 贡献
本项目的git 地址是 ssh://git@github.com:rayzang8/generator-sophonfrontend.git 欢迎为力队贡献你的力量, 比如目前 husky 就可以集成进脚手架里
> 本项目使用yeoman 为模板生成工具, 核心入口位于 generators/app/index.js
> 本项目所程现的样子(src, 根目录的配置文件, 存放配置文件的目录config/, 但不包括generators/, rootConfigs/)也就最后脚手架生成新项目的样子
> 请特别注意,npm publish发布到公司private npm库之前先要跑一下 npm run generate-template 这个脚本, 确保脚手架样板的文件与项目文件是同步的, 所以把它加到 prepublishOnly 脚本中去很必要



# 其实本脚手架项目就可以看作为一个从零开始搭建较新版本的 - Webpack@5, TypeScript@4+, React@17+, eslint, sass, less, post-css, cssModule, stylelint, react-router, i18next 项目的最佳实践

## 在本文中，将向您展示如何从一个空命令行开始，使用 VSCode 和 Node.js 在 Typescript 中创建一个 Hello World React 应用程序，同时从头开始配置它. 同时将给出涵盖每个依赖项资源的链接.

## 初始化项目
-----------

**执行的首条命令行是:**

```node
npm init 
```

此命令会初始化项目,它会生成一个 package.json 和一些默认设置.您可以在跳出的提示问题中选择您认为适合设置的任何内容，一般情况下只需采用默认值.

-----------

## Installing Yarn

> 现在让我们安装 yarn，因为从现在开始，我们将使用它进行所有进一步的包依赖安装.  yarn的相关文件链接在这: https://classic.yarnpkg.com/en/docs

注意：在使用 yarn 时，不要再使用 NPM（全局包除外）很重要，因为它会创建一个与 yarn.lock.json 冲突的 package.lock.json。 所以你要么只使用 NPM，要么只使用 Yarn。 对于这个指南,我将从这里开始使用yarn 

**执行以下命令:**

``` node
npm install -g yarn 
```

## 安裝 SCSS, Less 和 PostCss

> 我们将在本教程中使用 SCSS和 Less, 自动前缀处理使用 post css. 首先我们需要安装一些依赖...

**执行以下命令:**

``` node
yarn add -D postcss sass@1.32  less postcss-less postcss-preset-env autoprefixer
```

>请注意,我在这里使用 sass@1.32 是因为最新版本的 sass 已经弃用了警告 scss 作者准备在 sass@2.0.0 中引入破坏性更改,并且一些像 font-awesome 这样的库还没有更新他们对 / (除法运算符)到新的数学库. 所以为了不收到弃用警告的垃圾邮件,在这个项目中,我使用添加警告之前的最后一个 sass 版本. 如果您不需要 SASS,这无关紧要. 如果您的依赖项都没有在其 scss 文件中使用 / 运算符进行除法,那么您可以使用最新版本而不会收到来自库的过时警告的垃圾邮件.

**在项目根目录添加 postcss.config.js 文件:**

``` Javascript
module.exports = {
    plugins: [
        [
            "postcss-preset-env",
            {
                // Options
            },
        ],
        require('autoprefixer'),
    ],
};
```

**请注意,这告诉 postcss 对最后两个主要浏览器版本使用 autoprefixer,您可能需要编辑浏览器target以满足您的需要.**

**更多详情可参考 post css 文件:** https://github.com/postcss/postcss

## Installing WebPack
-----------

现在让我们开始深入研究使用 WebPack 5+ 版本构建 React 应用程序的第一个依赖项.  有关 webpack 的参考，您可以访问他们的网站: https://webpack.js.org/concepts/

``` node
yarn add -D webpack@"^5.0.0" webpack-cli
```

### 安装本指南中用到的webpack 插件

| Plugin Name |  Usage  |
| ----------- | ---------- |
| eslint-webpack-plugin | 在webpack 构建过程中启用eslint和热模块更新 |
| tsconfig-paths-webpack-plugin | 解析import语句时参考tsconfig中的路径别名|
| sass-loader | 处理sass,scss 样式文件 |
| less-loader | 处理less 样式文件 |
| postcss-loader | 预处理css 自动添加前缀 |
| css-loader | 处理css 样式 |
| style-loader | 将样式注入页面 |
| terser-webpack-plugin | 压缩静态资源 |
| html-webpack-plugin | 运行模块文件生成index.html |
| webpack-dev-server | 本地dev 服务并支持模块热重载|
| source-map-loader | 用于生成source map文件 |

**下一步: 装插件使用如下命令:**

``` node
yarn add -D eslint-webpack-plugin tsconfig-paths-webpack-plugin sass-loader less-loader postcss-loader css-loader style-loader terser-webpack-plugin html-webpack-plugin webpack-dev-server source-map-loader
```

## 支持 CSS Modules, 支持引入 *.png, *.svg 等格类静态资源
-----------

**src 目录中添加 types.d.ts**

``` Javascript
/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module '*.avif' {
  const src: string;
  export default src;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  > & { title?: string }>;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
```
其中声明模块 '*.module.css', '*.module.scss','*.module.sass','*.module.less' TS中支持以模块形式引入样式文件


## Installing Babel
-----------

接下来我们将添加所有 babel 依赖, 我们使用 babel 7. 您可以在他们的网站上查看 babel：https://babeljs.io/docs/en/
babel的简要说明：它是一个 javascript 转译器，将为我们编译typescript 并处理 polyfill 用于目标浏览器,并确保编译后的 JS 与这些浏览器目标兼容.

**执行以下命令安装 babel 相关的依赖:**

``` node
yarn add -D @babel/core@"^7.15.0" babel-loader@"^8.2.2" @babel/register@"^7.15.3" @babel/preset-env@"^^7.15.0" @babel/preset-typescript@"^7.15.0" @babel/preset-react@"^7.14.5" core-js@"^3.0.0"
```

> 安装的都是些什么?

...

>Babel 是 JS 的转译器, 所以你刚刚安装了 babel core, babel register, preset-env, 以及 core-js version 3+.  Babel Register 允许babel在 node 的require解析时通过.babe.js为后缀的node.js 脚本注入钩子的方式进行babel转译.  这使得可以在npm scripts中使用 exports/imports 等语法.  Preset-env 是一组关于如何借助最新的 core-js 通过 babel 转译 JS 的默认设置(是插件的集合, 它使我们用最新的ES特性写的代码也能运行在目标浏览器上).  Core-JS 包含大量 polyfills 和其他标准，以确保您的 JS 将在您的目标浏览器上运行.  比如IE. 如果目标浏览器是 IE11 并编写了不支持 IE11 的 Javascript，Preset-env 将为您处理从 core-js 中提取最合适的polyfills，并以在 Internet Explorer 11 上运行的方式转换 Javascript.

**现在添加babel配置到 package.json 中 (也可以在根目录添加babel.config.json文件):**

``` JSON
  "babel": {
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": {
            "node": "current"      
          },
          "corejs": "3",
          "useBuiltIns": "usage"
        }
      ]
    ]
  }
```

**注意，这主要是设置 babel在 node.js 脚本中使用方式, 比如我们的构建文件. 之后我们将在webpack配置中定义babel在 typescript loader 中的工作方式.**

## Installing Typescript
-----------

>下一步安装 typescript**运行以下命令:**

``` node
yarn add -D typescript@"4.3.2"
```

**现在我们需要创建 tsconfig.json 到项目根目录, 并定义一些编译选项... 内容如下:**

``` Javascript
{
    "compilerOptions": {
        "target": "ES5",   // 指定编辑输出的 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
        "module": "esnext",   // 指定编辑输出所使用模块解析系统
        "lib": [   // 指定编辑输出代码所要包含哪些新特性(类型检查过程中的标准类型们), 如果不用polyfile,则通常与target相互对应
            "dom",
            "dom.iterable",
            "esnext"
        ],
        "allowJs": true,
        "skipLibCheck": true,   // 类型检查时跳过类型声明文件,比如两个库以不一致的方式定义相同类型的两个副本, TypeScript 不会对所有 d.ts 文件进行类型较准,而是会对您在应用程序源代码中专门引用的代码进行类型检查
        "allowSyntheticDefaultImports": true,  // 允许 import React from "react"; 的写法,否则只能写成 import * as React from "react";
        "esModuleInterop": true, // 兼容Commonjs/AMD/UMD模块, 的命名空空间导出和默认导出语句, 它为true 时 allowSyntheticDefaultImports也得是true
        "strict": true, // 启用此选项等效于启用所有严格模式系列选项, 然后,您可以根据需要关闭个别严格模式系列检查
        "alwaysStrict": true, // 确保您的文件在 ECMAScript 严格模式下解析，每个源文件都启用“use strict”
        "forceConsistentCasingInFileNames": true,  // 兼容大小写敏感的系统与大小写不敏感的系统
        "moduleResolution": "node",  //模块解析策略, 采用node.js 的CommonJS
        "resolveJsonModule": true,   //允许从Json文件中引入模块
        "isolatedModules": false, //将每个文件作为单独的模块, 由于bootstrap.tsx文件不是一个模块,所以这里用false
        "noEmit": true,  //不生成文件, 因为在本指南中启用babel转义而非tsc转义,所以设置为true
        // "emitDeclarationOnly": true,     // 只输出d.ts 文件,它与  noEmit 互斥
        // "declaration": true,       // 生成声明文件(d.ts) 此处不需要
        "jsx": "react", //tsx文件转译为js文件内所调用的React的方法, "react"调用React.createElement函数, React17+可以用React-jsx,它调用_jsx函数
        "rootDir": "./src", // TS源码所在位置
        "baseUrl": "./src", // 别名引入模块搜索的路径起点, 如果设置成"./",那么搜索路径将起点将是tsconfig.json文件所在的目录
        "paths": {  // 添加路径别名
             "#assets/*": [
                "assets/*"
            ],
            "#locales": [
                "locales/i18nInstance.ts"
            ]
        }
    },
    "include": [   // 只编译某些目录
        "src/**/*"
    ], 
    "exclude": [   // 编译某些目录中需要排除的
        "src/menu/*"
    ]
}
```

> 致此 tsconfig.js 文件定义了 typescript 在项目中的行为, 你也可以让它更严格. 有关选项的完整列表，请查看此处的文档: https://www.typescriptlang.org/tsconfig 和 https://jkchao.github.io/typescript-book-chinese/project/compilationContext.html#%E7%BC%96%E8%AF%91%E9%80%89%E9%A1%B9

目前我使用 ES5 作为编译目标, allowJs 为true，它允许您编写 js... 但这里最重要的是 noEmit 为 true.  所以我们不会在这里输出任何文件(.js或.d.ts都没有).  相反，我们使用 typescript 作为 babel 管道中的中间人, babel 会为我们转译 typescript. 此外，我已将rootDir 和 baseUrl 设置为 ./src 并为#assets, #locales设置了路径别名，我将在本文档后面介绍.

## 安装 ESLint
-----------

> 现在开始安装 eslint for the linter 和 typescript 以及 react plugin for eslint
> 执行以下命令

``` node
yarn add -D eslint eslint-plugin-import typescript-eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-import-resolver-typescript eslint-plugin-react eslint-plugin-react-hooks
```

> Note* 在这一步我们还会获取使用eslint 与 typescript 及 react 协同工作相关插件, 之后会设置它们.

### 配置 ESLint

ESLint 文档地址: https://eslint.org/docs/user-guide/configuring/

接下来我们将设置eslint使用typescript的配置文件并添加规则.  您可以添加更多想要的规则, 这里有完整的 ESLint 可用规则列表: https://eslint.org/docs/rules/

TypeScript ESLint 可用规则列表 https://typescript-eslint.io/rules/

linter 的目的是在您编写typescript 和 javascript 实时为您提供有用的警告或错误.  您可以使用 eslint 来强制执行代码标准和以特定方式编写代码.

eslint 共享tsconfig.json中设置的alias 路径可参考: https://stackoverflow.com/questions/57032522/eslint-complains-about-typescripts-path-aliasing

> 根目录添加.eslintrc.js, 或者添加到package.json文件中添加以下内容


``` Javascript
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
            "typescript": {
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
```

> ESLint 配置中要注意 :
我们已添加了react 的插件和 react hooks的规则, 所以在源码中的hooks 调用出错时会有提示.  你可以添加更多的React的规则，它们可以在这里找到: https://github.com/yannickcr/eslint-plugin-react


## 安装 StyleLint
-----------

> 现在开始安装 stylelint 及其插件 stylelint plugin, stylelint-config-standard等
**执行以下命令**

``` node
yarn add -D stylelint stylelint-webpack-plugin stylelint-config-standard stylelint-config-recommended-less stylelint-config-recommended-scss stylelint-less stylelint-scss stylelint-order
```

### 配置 StyleLint
Stylelint 文档地址L:https://stylelint.io/user-guide/get-started
可用规则列表:https://stylelint.io/user-guide/rules/list

> 根目录添加stylelint.config.js, 内容如下

``` Javascript
module.exports = {
    "defaultSeverity": "error",
    "extends": [
        "stylelint-config-standard",
        "stylelint-config-recommended-scss",
        "stylelint-config-recommended-less"
    ],
    "plugins": [
        "stylelint-scss",
        "stylelint-less",
        "stylelint-order"
    ],
    "rules": {
        "max-nesting-depth": null,
        "no-empty-source": null,
        "no-descending-specificity": null,
        "property-no-vendor-prefix": null,
        "selector-max-compound-selectors": null,
        "scss/at-import-partial-extension-blacklist": null,
        "scss/at-import-no-partial-leading-underscore": null,
        "value-no-vendor-prefix": null,
        "color-hex-case": "upper",
        "order/properties-alphabetical-order": true,
        "no-missing-end-of-source-newline": null,
        "at-rule-no-unknown": null,
        "selector-pseudo-class-no-unknown": [
            true,
            {
                "ignorePseudoClasses": ["global"]
            }
        ],
        "unit-no-unknown": null
    }
};
```
> StyleLint 配置中要注意: 我们不是直接检查css, 而是*.scss, *.less, 因此需要使用PostCss语法, 建议扩展一个共享配置，其中包含您首选语言或库的推荐的语法. 
> 所以我们将 stylelint-config-standard-scss 共享配置扩展用于 lint SCSS, stylelint-config-recommended-less共享配置扩展用于 lint LESS.

## 创建项目的目录结构
-----------

> 现在让我们在我们的项目中创建文件夹结构来支持我们的 webpack build.  在这里使用了一个非常基本的示例，但其中一个要点是您的文件夹结构可以是您想要的任何内容.

**添加以下目录与文件:** 

> 注: React 组件文件名应该以大写字母开头，因为 React jsx 组件必须以大写字母开头.  所以在这个例子中，所有组件的文件名都以大写字母开头，以与文件中导出的组件名一致.

- build
- config
  - paths
    - index.js
  - public
    - index.html
  - scripts
    - copy-build-resource.js
  - webpack
    - dev.server.js
    - module.federation.js
    - webpack.common.config.js
    - webpack.dev.babel.js
    - webpack.prod.babel.js
- src
  - api
    - commonApi.ts
    - index.ts
  - assets
    - images
      - 404.png
      - loading.svg
      - logo.svg
      - transwarp.svg
    - public
      - 404.png
      - discover.svg
      - favicon.png
    - scss
      - themes
        - _metroTheme.scss
      - variables
        - _vendorVariables.scss        
      - app.scss
      - vendor.scss
  - locales
    - extractedTranslations
      - en
        - App.json
        - Dashboard.json
        - Error.json
        - Hme.json
      - cn
        - App.json
        - Dashboard.json
        - Error.json
        - Hme.json
      - index.js
    - i18nInstance.ts
  - menu
    - index.tsx
  - pages
    - dashboard
      - index.tsx
    - home
      - home.less
      - home.module.less
      - home.module.scss
      - home.scss
      - index.tsx
    - notFound
      - notFound.scss
      - NotFound.tsx
    - index.tsx
  - routes
    - index.tsx
    - RootRoutes.tsx
- App.tsx
- bootstrap.tsx
- index.tsx
- types.d.ts
- .eslintrc.js
- babel.config.json
- package.json
- postcss.config.js
- README.md
- restart.sh
- stylelint.config.js
- tsconfig.json
  

## 填写配置

### config\paths\index.js

> 首先, 让我们在 config\paths\index.js 文件中创建一个帮助函数来计算我们的路径. 它看起来长这样:

**FileName: config\paths\index.js:**

``` Javascript
import path from 'path';

function paths() {
    this.root = path.resolve(path.join(__dirname), '../../');
    this.src = path.join(this.root, 'src');
    this.styleLintConfig = path.join(this.root, 'stylelint.config.js');
    this.srcIndexEntry = path.join(this.src, 'index.tsx');
    this.srcAssets = path.join(this.src, 'assets');
    this.srcScss = path.join(this.src, 'assets', 'scss');
    this.srcScssEntry = path.join(this.srcScss, 'app.scss');
    this.srcScssVendorEntry = path.join(this.srcScss, 'vendor.scss');    
    this.dst = path.join(this.root, 'build');    
    this.config = path.join(this.root, 'config');
    this.configHtmlTemplates = path.join(this.config, 'public');
    this.configHtmlTemplatesLocalIndex = path.join(this.configHtmlTemplates, 'index.html');
    this.nodemodules = path.join(this.root, 'node_modules');    
}

export default new paths();
```

> 注: 您可以根据需要向 path.js 文件添加更多内容.  目标是你应该在这里编辑所有的路径，而不是把它们放在你的 webpack 配置文件中,如果你以后移动文件或文件夹结构,这将修改路径更加容易.  (使用 CRA 无法轻松完成的事情).

### webpack\webpack.common.config.js

>现在来创建 webpack 配置.... 你可以参考这里的文档来更多地了解这个配置文件: https://webpack.js.org/configuration/#options  但基本上 webpack.config 就是告诉 webpack 该做什么的.  这是您定义项目的入口文件(比如 index.js),以及如何输出的地方. 您还可以添加大量插件，例如 HtmlWebpackPlugin，它可以为您生成包含bundle的 index.html，这样您就不必手动更新脚本链接.  随着我们的继续，我们将为 webpack 安装更多插件.

**在 config/webpack 目录下添加名为 webpack.common.config.js 的文件:**
> 我们将把 webpack 的大部分逻辑放在这里,以便它可以在基于特定环境的构建中使用,我们将从为本地开发搭建的环境开始.

在你的 webpack.common.config.js 中添加以下内容:

``` Javascript
import paths from '../paths'; //*本项目的路径库*
import genModuleFederation from './module.federation';
import webpack from 'webpack';
import chalk from 'chalk';
import HtmlWebpackPlugin from 'html-webpack-plugin'; //docs -> https://webpack.js.org/plugins/html-webpack-plugin/
import tsConfigPathPlugin from 'tsconfig-paths-webpack-plugin'; //docs -> https://www.npmjs.com/package/tsconfig-paths-webpack-plugin
import sass from 'sass'; //docs -> https://sass-lang.com/install
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'; //docs -> https://github.com/TypeStrong/fork-ts-checker-webpack-plugin
import ESLintPlugin from 'eslint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';  // 输出构建进度
import { federationName } from './dev.server';

//根据构建环境获样式loader
function getCssPipelineLoader(env, isCssModule) {
    const cssPipelineLoader = [{
        loader: 'postcss-loader', //docs -> https://github.com/webpack-contrib/postcss-loader
        options: {
            sourceMap: true
        }
    }];
    if (isCssModule) {
        cssPipelineLoader.unshift({
            loader: 'css-loader',
            options: {
                esModule: false,
                sourceMap: true,
                importLoaders: 2,
                modules: {
                    localIdentName: '[folder]-[name]__[local]-[hash:6]',
                }               
            }
        });
    } else {
        cssPipelineLoader.unshift({
            loader: 'css-loader', //docs -> https://www.npmjs.com/package/css-loader
            options: {
                modules: false, //不使用 styled components in react
                esModule: false,  //不使用 es module 语法
                sourceMap: true //是/否生成样式的 source maps 文件
            }
        });
    }
    if (env === 'production') {
        cssPipelineLoader.unshift(MiniCssExtractPlugin.loader);
    } else {
        cssPipelineLoader.unshift(
            {
                //注意, 在生产环境应该用css 抽取插件来处理,  style-loader 可以用在开发环境, 因为它处理速度会更快
                loader: 'style-loader', // docs -> https://webpack.js.org/loaders/style-loader/
                options: {
                    esModule: false,
                    insert: 'head'  // 插入html 的位置是 head 标签, 也可设置为body
                }
            }
        );
    }
    return cssPipelineLoader;
}

//根据构建环境生成不同的webpack配置项
export function getBaseWebPackConfig(env, argv) {
    let config = {};
    // 生成插件集合
    config.plugins = [
        // 将从构建命令行获取的环境变量NODE_ENV, 传递到runtime(源码中可以获取process.env.XXX)
         new webpack.DefinePlugin({
            // 'process.env.NODE_ENV': 'development',  // 设置了mode 后会自动设置 process.env.NODE_ENV, 所以在这里再设置会报冲突
            'process.version': JSON.stringify(require('../../package.json')?.version || '未获取版本信息') ,
            'process.env.commit': JSON.stringify(`${require('child_process').execSync('git --no-pager show -s --format="%h"')}`),
            'process.env.timestamp': JSON.stringify(`${require('child_process').execSync('git --no-pager show -s --format="%ai"')}`),
            'process.env.federationName': JSON.stringify(federationName),
         }),
        new ProgressBarPlugin({ format: `  :msg [:bar] ${chalk.cyanBright.bold(':percent')} (:elapsed s)` }),   // 进度条
        new ForkTsCheckerWebpackPlugin({   // eslint 只负责js语法检查, 此插件负责做TS类型检查
            async: false
        }),
        new HtmlWebpackPlugin({
            title: '项目名',
            fileName: 'index.html', // 这里可以填任何文件名
            template: paths.configHtmlTemplatesLocalIndex,
            inject: 'body', // scripts 注入的位置, body 意味着执行到body的尾部
            base: '/',     // head中添加标签 <base href="/"> 表示获取静态资源的基准路径,publicPath 就可以设置为'auto'
            publicPath: 'auto',  // 基准路径通常设置为 '/',也就是页面中<script> 引入js前缀路径, 注意:使用module ferderation 要设置为 'auto'
            scriptLoading: 'blocking', // SPA 应用可以设置为block, 也可以使用 defer
            hash: true,
            cache: true,
            showErrors: true
        }),
        new ESLintPlugin({
            context: paths.root,
            extensions: ['js', 'jsx', 'ts', 'tsx'],
        })
    ];

    // 添加模块联邦插件
    if (federationName !== 'sophon') {
        config.plugins.push(new webpack.container.ModuleFederationPlugin(genModuleFederation(require('../../package.json').dependencies)));
    }

    //代码拆分，您可以使用此入口对象将您的应用定义为单独的entry chunk，这些chunk相互依赖以优化 webpack 生成包的方式。
    config.entry = {
        //告诉webpack有两个入口需要被拆分为chunk, 以app为入口chunk需要依赖以vendor 为入口的chunk
        //配置 vendor styles (bootstrap/overrides等 到一个单独的chunk)
        vendor: {
            import: paths.srcScssVendorEntry
        },
        app: {
            import: paths.srcIndexEntry,
            dependOn: 'vendor'
        }
    };

    config.output = {
        filename: `${federationName}/[name].js`, //因为不只有一个 chunk, 所以输出的 chunk名基于 chunk名和它的hash值([name].[contenthash].js), hash值在内容变化时会改变(*.css样式文件也与*.js 位于同一层目录)
        path: paths.dst, //打包输出路径
        clean: true, //目标路径如果存在，则先清除
        publicPath: 'auto',
        assetModuleFilename: `${federationName}/assets/[name][ext]` //资源文件存入assets/子目录下
    };


    config.resolve = {
        extensions: ['.less', '.scss', '.js', '.jsx', '.tsx', '.ts'],
        plugins: [
            new tsConfigPathPlugin(), //设置webpack在编辑时使用 tsconfig.json 中的 paths 选项来定义别名，省去了在webpack配置项resolve 中再定义 alias           
        ]
    };

    // rules 设置不同的文件类型匹配特定的处理loader
    config.module = {
        rules: [
            {
                test: /\.(js|ts)x?$/i, //这个正则匹配 ts,js,tsx,jsx
                exclude: /[\\/]node_modules[\\/]/, //忽略 node_modules,其中的代码切用splitChunks单独切分到 vendor chunk, /\\node_modules\\/ 是为了兼容windows系统
                use: [
                    {
                        loader: 'babel-loader', //使用 babel-loader， 现已不推荐使用 ts-loader
                        options: {
                            presets: [
                                '@babel/preset-env', //使用三种预置 env, react, typescript
                                '@babel/preset-react',
                                '@babel/preset-typescript'
                            ],
                            plugins: [
                                [
                                    '@babel/plugin-transform-runtime',  // 缩小打包size, runtime helper 指向一统一代码
                                    {corejs: false }  // 指定 runtime-corejs 的版本
                                    /**
                                     * 配置corejs为3，需要预先安装@babel/runtime-corejs3
                                     * 配置corejs为2，需要预先安装@babel/runtime-corejs2
                                     * 配置corejs为false，需要预先安装@babel/runtime
                                    */
                                ]
                            ]
                        }
                    },
                    {
                        loader: 'source-map-loader',
                        options: {

                        }
                    }
                ]
            },
            {
                // 这里是webpack 5 的新特性，原本在webpack 4 只能靠 file-loader, url-loader 来实现将资源文件打包到输出目录
                test: /\.(woff(2)?|ttf|eot|svg|jpg|jpeg|png|gif|pdf)(\?v=\d+\.\d+\.\d+)?$/,
                type: 'asset/resource',
            },
            { test: /\.ya?ml/, type: 'json', use: 'yaml-loader' },
            {
                test: /\.css$/, //处理 css 文件
                include: [
                    paths.src,
                    paths.nodemodules //项目的 node_modules 也可能提供css样式文件，所以要把它也包含进来
                ],
                use: [ //处理的 loaders 采用倒序，所以最后的 loader 最先执行
                    ...getCssPipelineLoader(env)
                ]
            },
            {
                test: /\.module\.(sa|sc)ss$/,  // 处理 *.modules.sass, *.modules.scss
                include: [
                    paths.src,
                ],
                use: [
                    ...getCssPipelineLoader(env, true),
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            implementation: sass
                        }
                    }
                ]
            },
            {
                test: /\.(scss|sass)$/, //处理 scss 和 sass 文件
                exclude: /\.module\.(sa|sc)ss$/i,
                include: [
                    paths.src,
                ],
                use: [ //处理的 loaders 采用倒序，所以最后的 loader 最先执行
                    ...getCssPipelineLoader(env),
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            implementation: sass
                        }
                    }
                ]
            },
            {
                test: /\.module\.less$/,     // 处理 *.modules.less
                include: [
                    paths.src,
                ],
                use: [
                    ...getCssPipelineLoader(env, true),
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.less$/,     // 处理 *.less
                include: [
                    paths.src,
                ],
                exclude: /\.module\.less$/,
                use: [
                    ...getCssPipelineLoader(env),
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            }
        ]
    };

    // 配置webpack 如何拆分 chunk，并可以为 CSS 创建测试函数，以便 css get 被提取到它自己的chunk中。
    config.optimization = { // docs -> https://webpack.js.org/plugins/split-chunks-plugin/#defaults
        nodeEnv: env,   // nodeEnv的默认值与mode 一致,会利用 webpack.DefinePlugin 自动添加到 process.env.NODE_ENV 中去,所以无需再设置 DefinePlugin 插件
        runtimeChunk: 'single',  // 若不加此项，remote 的portal container 会被init 两次导致js报错, 可以探研一下隐含的原因 
        /**
         *  docs -> https://webpack.js.org/plugins/split-chunks-plugin/#defaults
         *  中文说明 -> https://juejin.cn/post/6992887038093557796
         */
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                default: {   // 多入口情况下,相同模块被从不同入口进入引入超过两次后才会抽取成一个chunk
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                defaultVendors: {  // 源代码中所有引入node_modules的文件打包成为一个大的chunk
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                react: {  // 将react 相关的代码打到一个chunk
                    name: 'ReactVendors',
                    test: /[\\/]react/,
                    priority: 1,
                },
            },
        }
    };

    return config;
}
```

> 注: getCssPipelineLoader 方法中区分了 loader 是否支持 cssModule 的不同配置, 以及是否启用抽取css到单独文件的插件

## 添加本地运行环境的 webpack 配置

现在我们将添加实际的文件，以开发环境为例, 它将成为我们 webpack 的入口点, 本地运行我们使用的叫作 webpack.dev.babel.js 的配置文件.

> 注意这里以 .babel.js 为后缀, 此前在安装babel时提及过 @babel/register.  这使得 ES6 import/export 等用法在webpack 配置文件中可用,以及用babel来处理 webpack 配置.

**继续在 config/webpack 目录下创建名为 webpack.dev.babel.js 的文件, 内容如下:**

``` Javascript
import paths from '../paths'; //*本项目的路径库*
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';  // 构建速度分析
import { getBaseWebPackConfig } from './webpack.common.config';
import { devPort, proxyHeaders, reverseProxy, federationName } from './dev.server';
import { merge } from 'webpack-merge';

function getDevWebPackConfig(env, argv) {
    console.log('evn', env);
    console.log('argv', argv);
    const webpackCommonConfig = getBaseWebPackConfig('development', argv);
    // 这里可以在运行之前更改或覆盖从 getBaseWebPackConfig 取得的 webpack 配置对象
    // 比如可以改变Dev Server, 或路径配置, 以及任务你认为可以不同的设置 

    const webpackDevConfig = {
        mode: 'development', //设置运行模式
        cache: true,  // development mode 下加快二次构建的速度
        devtool: 'source-map',
        devServer: {
            host: 'local-ip', // 自动以ip地址(非localhost)打开页面
            compress: true,   // 不设置时默认值就是true(开启gzip 压缩), 若想关闭,此处置为false, 查看network 的Content-Encoding
            historyApiFallback: true,
            hot: true, //打开模块热更新功 !
            headers: proxyHeaders,
            port: devPort,
            proxy: reverseProxy,
            client: {
                progress: true,
                logging: 'info', //在本地开发模式下,提供记录到客户端的所有信息
                overlay: {
                    warnings: true, // false时 warning 的时候，不做遮挡层处理
                    errors: true
                }
            },
            static: [
                {
                    publicPath: '/',
                    directory: paths.dst
                },
                {
                    publicPath: `/${federationName}`,
                    directory: paths.src
                }
            ],
            https: true,  // 也可以支持传入自签证书文件
        },
        performance: {  //增加weback 报资源太大的阈值, 只有dev环境用
            hints: 'warning',
            maxAssetSize: 20000000, // 整数类型（以字节为单位）
            maxEntrypointSize: 40000000, // 整数类型（以字节为单位）
            assetFilter: function (assetFilename) {
                // 提供资源文件名的断言函数
                return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
            }
        },
        optimization: {
            minimize: false // 默认情况下仅在生产环境不开启 CSS 优化，如果想在开发环境下启用 CSS 优化，请将 optimization.minimize 设置为 true, 且用 MiniCssExtractPlugin.loader 取代 style-loader
        }
    };

    return new SpeedMeasurePlugin().wrap(merge(webpackCommonConfig, webpackDevConfig));
}

module.exports = getDevWebPackConfig;
```

**新建文件 config/public/index.html 加入以下内容:**

``` Html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="Another application built with React.">
  <meta http-equiv="Cache-control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon">
</head>
<body >
  <div id="root"></div>
</body>
</html>
```
## 设置 SCSS

我们将在这里设置一些基本的 SCSS 作为一个粗略的例子.

1. 新建文件 src/assets/scss/themes/_metroTheme.scss 添加以下内容:

```
/* 并不完整, 仅作例子以供参考 */
$spacer: 1rem;
$enable-rounded: false;
$enable-shadows: false;
$enable-gradients: false;
$enable-transitions: false;
$enable-prefers-reduced-motion-media-query: true;
$enable-responsive-font-sizes: true;
```

2. 新建文件 src/assets/variables/_vendorVariables.scss 添加以下内容:

```
@import '../themes/metroTheme';
```

3. 新建文件 src/assets/scss/app.scss 添加以下内容:


```
/* reimport variables so we have them in app scss */
@import './themes/metroTheme';
@import '~/bootstrap/scss/_variables';
```

4. 新建文件 src/assets/scss/vendor.scss 添加以下内容:

```css
$fa-font-path: '~font-awesome/fonts';
@import './variables/vendorVariables';
@import '~bootstrap/scss/bootstrap';
@import '~font-awesome/scss/font-awesome';
```

**新建文件 src/pages/home/index.tsx 添加以下内容:**

``` TSX
mport React, { useEffect, useState } from 'react';
import { lngs } from '#locales';
import logo from '#assets/images/logo.svg';
import styles from './home.module.scss';
import lessStyles from './home.module.less';
import './home.scss';
import './home.less';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../routes/RootRoutes';
import { commonApi } from '../../api';

export const Home = (): React.ReactElement => {
  const [testState, setTestState] = useState<string>('');
  const [user, setUser] = useState<Record<string, any>>();
  const { t, i18n } = useTranslation('Home');

  useEffect(() => {
    setTestState(`在应用代码中获取process.env.NODE_ENV值 = ${process.env.NODE_ENV}\n
        在应用代码中获取模块联邦名process.env.federationName = ${process.env.federationName! === 'sophon' ? '' : process.env.federationName!}`);
  }, []);

  const switchLanguage = (lng: string) => i18n.changeLanguage(lng);

  const getUserProfile = async () => {
    const userProfile = await commonApi.getUserProfile();
    setUser(userProfile);
  };

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <img src={require(`../../assets/images/transwarp.svg`)} />
        <img src={`/${process.env.federationName!}/assets/public/discover.svg`} style={{ width: '256px' }} />  {/* 这里显示图片采用了静态资源的方式, 注意打包后的路径仍要能找到该资源 */}
        <div className="sophon" />
          <button onClick={getUserProfile} >{t('获取用户信息')}</button>
          <h3 className="test2">{`${user?.uid},`}{t('欢迎来到Sophon宇宙')} </h3>
          <h4 className={styles.test}>{testState}</h4>
          <h6 className={lessStyles.test3}>{process.version} | {process.env.commit} {'\n'} {process.env.timestamp}</h6>
        <div>
          <Link to={`${baseUrl}/dashboard`} className={lessStyles.test3}>{t('Dashboard:跳转到Dashboard')}</Link>
          {Object.keys(lngs).map((lng) => (
            <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => switchLanguage(lng)}>
              {lngs[lng].nativeName}
            </button>
          ))}
          <button onClick={() => location.href = `/gateway/user/api/logout?redirect=${encodeURIComponent(window.location.href)}`}>{t('退出登录状态')}</button>
        </div>
      </header>
    </div>
  );
};
```

**新建文件 src/pages/dashboard/index.tsx 添加以下内容:**

``` TSX
import React from 'react';

export const Dashboard = () => {

    return <div>
        <img src={require('../../assets/images/transwarp.svg')} style={{ width: '256px' }} />
    </div>;
};
```

**新建文件 src/pages/notFound/notFound.tsx 添加以下内容:**

``` TSX
import React from 'react';
import { useTranslation } from 'react-i18next';
import './notFound.scss';


export const NotFound  = () => {
  const { t } = useTranslation('Error');

    return (
        <div className="page-error">
          <div className="img-wrapper">
            {/* 这里显示图片采用了静态资源的方式（替代了 require('../../assets/images/public/404.png'), 注意打包后的路径仍要能找到该资源 */}
            <img className="error-image" src={`/${process.env.federationName!}/assets/public/404.png`} /> 
            <h1>{t('页面不存在')}</h1>
          </div>
        </div>
      );
};
```

**新建文件 src/routes/index.tsx 添加以下内容:**

``` TSX
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Home, NotFound, Dashboard } from '../pages';

export const baseUrl = process.env.federationName?.toLocaleLowerCase() !== 'sophon' ? `/${process.env.federationName!}` : '';

export const AppRouter = (): React.ReactElement => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={`${baseUrl}/home`} component={Home} />
                <Route path={`${baseUrl}/dashboard`} component={Dashboard} />
                <Redirect path={`${baseUrl}/`} to={`${baseUrl}/home`} exact />
                <Route path={`${baseUrl}/*`} component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
};
```

**新建文件 src/App.tsx 添加以下内容:**

``` TSX
import React, { Suspense }  from 'react';
import { AppRouter } from './routes';


export default (): React.ReactElement => {
    return (
        <Suspense fallback="loading">
            <AppRouter />
        </Suspense>
    );
};
```



**src下, 添加 bootstrap.tsx (这是准备用于模块联邦的入口文件) 内容如下:**

``` TSX
import React from 'react';
import { render } from 'react-dom';
import App from 'App';

function index() {
    return (
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    );
}

render(index(), document.getElementById('root'));
```

**src下, 添加 index.tsx (入口文件) 内容如下:**

``` TSX
import('./bootstrap');
```

## 在运行 build 之前安装运行时依赖

> 我们即将从头开始设置一个初始的 hello world 应用程序，但首先我们需要安装我们所有的运行时依赖项，如 React、React-Router-dom、@types、Axios 等（或任何您想要的应用程序）

**终端中运行以下命令:**

``` Node
//安装主要的依赖库 React, React-dom 等 

yarn add @popperjs/core font-awesome react@"^17.0.2" react-dom@"^17.0.2" react-router-dom@"5.1.2"

//安装 typescript types 作为依赖
yarn add @types/react @types/react-router-dom@"5.1.2"
```

## 创建 package.json scripts 构建build的脚本:

**添加以下脚本到 package.json:**

``` JSON
 "scripts": {
    "start": "webpack serve --open --config ./config/webpack/webpack.dev.babel.js",
    "build": "webpack --config ./config/webpack/webpack.prod.babel.js",
  }
```

## 添加i18next
-----------
> 现在开始安装 i18next 及其初始化插件 i18next, react-i18next, i18next-browser-languagedetector, i18next-resource-store-loader
> i18next-browser-languagedetector 用于获取当前语言, i18next-resource-store-loader用于加载语言资源文件
i18next 相关文档可以查阅 https://www.i18next.com/
react-i18next 相关文档可以查阅 https://react.i18next.com/

**执行以下命令**

``` node
yarn add i18next react-i18next i18next-browser-languagedetector i18next-resource-store-loader
```

### 支持自动提取代码中的key生成语言资源文件
-------------
> 还需安装 babel插件 babel-plugin-i18next-extract

**执行以下命令**
``` node
yarn add -D babel-plugin-i18next-extract
```
**在 babel.config.json 文件中添加以下内容**
``` JSON
"only": ["config/","src/"],
"plugins": [
        ["i18next-extract", {
            "locales": ["cn", "en"],
            "defaultNS": "App",
            "outputPath": "src/locales/extractedTranslations/{{locale}}/{{ns}}.json",
            "keyAsDefaultValue": true,
            "discardOldKeys": true
        }]
    ]
```
only 表示需要babel解析的目录,
plugins 数组中添加 i18next-extract 插件, 相关文档查阅 https://i18next-extract.netlify.app/#/
> locales 表示支持的语言
> defaultNS 默认名称空间
> outputPath 语言资源文件生成的位置,{{locale}}表示语言, {{ns}}表示名称空间
> keyAsDefaultValue 生成语言文件时, value 默认与key相同
> discardOldKeys 代码中的key若已经删除, 则会自动删语言文件中相应的key

**在src/locales 下添加 i18nInstance.ts 内容如下**

``` TSX
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'; // 探测上次所选择的语言以供默认使用

const resBundle = require('i18next-resource-store-loader!./extractedTranslations/index.js'); // 加载目录extractedTranslations下的所有语言资源文件, index.js 文件可以为空,它仅用于指语言文件根目录
const i18nInstance = i18n.createInstance();
i18nInstance
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'zh',
        defaultNS: 'App',
        fallbackNS: 'App',
        debug: true,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: resBundle,
        react: {
            useSuspense: true
        }
    }, (err, t) => {
        if (err) return console.log('something about i18next went wrong when loading', err);
        t('key'); // -> same as i18next.t
    });

export default i18nInstance;

export const lngs: Record<string, any> = {
    cn: { nativeName: '中文' },
    en: { nativeName: 'English' }
};
```

我们此时可以以 src/pages/home/index.tsx 的代码为例,  const { t, i18n } = useTranslation('Home'); 使用useTranslation 获取t 函数时传入的namespace为'Home', 所以像 t('获取用户信息')和 t('欢迎来到Sophon宇宙') 这样使用时未指定名称空间的语句会把key 提取到 src/locales/extractedTranslations/cn/Home.json 和 src/locales/extractedTranslations/en/Home.json 中去, 但像t('Dashboard:跳转到Dashboard')这样指定了名称空间的语句就会把key提取到 src/locales/extractedTranslations/cn/Dashboard.json 和 src/locales/extractedTranslations/en/Dashboard.json 中去. 若使用useTranslation() 也不传入名称空间,则会提取到采用默认的名称空间,进入 App.json 文件



## 启动本地开发环境 

运行以下命令: 

``` yarn start ```

> 注: dev srever 的运行端口可以在 config/webpack/dev.derver.js 中配置.

您现在已经完成了安装 yarn 和 react,typescript,scss 项目所需的许多依赖项.  你应该有完整的 eslint 运行.  如果在 VSCode 中没有进行 linting，您可能缺少 ESLint 插件，或者您需要在 VSCode 中配置您的用户设置以启用文件扩展名:

### -> settings.json (VSCode)
``` JSON 
        "eslint.validate": [ "javascript", "javascriptreact", "html", "typescriptreact" ]
```

你已经设置了一个本地 webpack 配置. 如果你想为生产环境添加 webpack 配置，你可以将它们添加到 config/webpack 文件夹并在package.json 中为它们添加新的脚本.
