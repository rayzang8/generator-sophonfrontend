# 从零开始创建一个 React App - Webpack@5, TypeScript@4+, React@17+

## 简介

作为React开发者一定很熟悉 CRA (Create React App) 它使开发者可以讯速构建出React应用并开始书写业务代码.  然而 CRA 也有许多缺点.  如下:

- 为多个环境构建多个输出包变得团难.  比如, 你可以在应用代码中添加一些代码以便读写一些特定环境的文件, 但如果想在build流程中控制它，那么起码需要弹出(eject)应用配置文件或利用配置重载dependencies

- CRA 使用较早的依赖包,并不第一时间使用最新版本的特性 (在结稿时, CRA 仍然在使用 webpack 4.41.2 其实webpack 5 早已发布一年有余.)

- 无法使用路径别名, 比如 ```import { ITruck, ICar, IVehicle } from '@models'``` .  无法在 tsconfig， eslint plugin 以及 webpack plugin 3个上下文中一同使用 (type script design time, webpack compile time, eslint design time.)  所以要做到所有的上下文件用统一的路径别名这样层度的控制, 还是要弹出(eject)应用配置.

- 使用CRA而过于依赖CRA的话，一旦被迫弹出(eject)基于CRA的应用程序，就不一定知道如何修复问题.  了解 CRA 底层的工具对于自己编写 react app有很多价值.  例如，遇到依赖关系中的错误，可以利用 yarn 临时应用补丁，再在插件作者修复该错误时继续. 

> 值得注意的是, webpack 5 对 webpack 4 进行了重大更改包含了breaking change, 这也是CRA 迟迟不升级级的原因, 如果想使用最新的功能, 这也是退出CRA 的一大原因.  如果想知道 Webpack 5 中有什么新东西以及为什么会要使用它，你可以参考 webpack.js.org 的发行说明在这里: https://webpack.js.org/blog/2020-10-10-webpack-5-release/

除了使用 CRA 的缺点之外，也许您只是想更好地了解您正在使用的工具及其工作原理.  在本文中，我将向您展示如何从一个空命令行开始，使用 VSCode 和 Node.js 在 Typescript 中创建一个 Hello World React 应用程序，同时从头开始配置它. 同时将给出涵盖每个依赖项资源的链接.

> 前置条件,您已经安装了 vscode 和 node.js 并且知道如何操作 VSCode.
安装了最新版本的 npm, 如果不没有请执行以下语句升级 `npm install -g npm@latest` 因为尽管安装了新版本的node, 但如果您在非常旧的 npm 版本上运行，这可能会导致问题.

-----------

## Git Resource:
You can clone the git repository here to already have all these steps: https://github.com/rmannjbs/WP5ReactTSFromScratch.git

```
cd somePath
git clone https://github.com/rmannjbs/WP5ReactTSFromScratch.git ./
```
If you want to just examine the repo you can install yarn globally and just run "yarn install" on the project to install all the depedencies.

要从头开始使用本指南，请继续.
## 初始化项目

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

## Installing SCSS and PostCss

> 我们将在本教程中使用 SCSS,自动前缀处理使用 post css. 首先我们需要安装一些依赖...

**执行以下命令:**

``` node
yarn add -D postcss sass@1.32 postcss-preset-env autoprefixer
```

>请注意,我在这里使用 sass@1.32 是因为最新版本的 sass 已经弃用了警告 scss 作者准备 sass@2.0.0 中的破坏性更改,并且一些像 font-awesome 这样的库还没有更新他们对 /（除法 ) 运算符到新的数学库. 所以为了不收到弃用警告的垃圾邮件,在这个项目中,我使用添加警告之前的最后一个 sass 版本. 如果您不需要 SASS,这无关紧要. 如果您的依赖项都没有在其 scss 文件中使用 / 运算符进行除法,那么您可以使用最新版本而不会收到来自库的过时警告的垃圾邮件.

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

**请注意,这告诉 postcss 对最后两个主要浏览器版本使用 autoprefixer,您可能需要编辑浏览器目标以满足您的需要.**

**更多详情可参考 post css 文件:** https://github.com/postcss/postcss

## Installing WebPack

现在让我们开始深入研究使用 WebPack 5+ 版本构建 React 应用程序的第一个依赖项.  有关 webpack 的参考，您可以访问他们的网站: https://webpack.js.org/concepts/

``` node
yarn add -D webpack@"^5.0.0" webpack-cli
```

### 安装本指南中用到的webpack 插件

| Plugin Name |  Usage  |
| ----------- | ---------- |
| eslint-webpack-plugin | used to enable eslint in the webpack build process and Hot Module Replacement |
| tsconfig-paths-webpack-plugin | used to resolve imports from tsconfig path aliases |
| sass-loader | used to process Syntactically Awesome Style Sheets |
| postcss-loader | used to post process css files to apply auto prefixer |
| css-loader | used to process css to be output |
| style-loader | used to inject css to the page |
| terser-webpack-plugin | used to minify assets |
| html-webpack-plugin | used to tell webpack to generate an index.html for our project from a template html file |
| webpack-dev-server | used to run our react app locally with hot module reloading |
| source-map-loader | lets webpack load source maps for files |

**下一步: 装插件使用如下命令:**

``` node
yarn add -D eslint-webpack-plugin tsconfig-paths-webpack-plugin sass-loader postcss-loader css-loader style-loader terser-webpack-plugin html-webpack-plugin webpack-dev-server source-map-loader
```

## 支持 CSS Modules, 支持引入 *.png, *.svg 等格类静态资源
 
-> src 目录中添加 types.d.ts 

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


## Installing Babel

接下来我们将添加所有 babel 依赖, 我们使用 babel 7. 您可以在他们的网站上查看 babel：https://babeljs.io/docs/en/
babel的简要说明：它是一个 javascript 转译器，将为我们编译typescript 并处理 polyfill 用于目标浏览器,并确保编译后的 JS 与这些浏览器目标兼容.

**执行以下命令安装 babel 相关的依赖:**

``` node
yarn add -D @babel/core@"^7.0.0" babel-loader@"^8.0.0" @babel/register@"^7.0.0" @babel/preset-env@"^7.0.0" @babel/preset-typescript@"^7.0.0" @babel/preset-react@"^7.0.0" core-js@"^3.0.0"
```

> 安装的都是些什么?

...

>Babel 是 JS 的转译器, 所以你刚刚安装了 babel core, babel register, preset-env, 以及 core-js version 3+.  Babel Register 允许babel在 node 的require解析时通过.babe.js为后缀的node.js 脚本注入钩子的方式进行babel转译.  这使得可以在npm scripts中使用 exports/imports 等语法.  Preset-env 是一组关于如何借助最新的 core-js 通过 babel 转译 JS 的默认设置(是插件的集合, 它使我们用最新的ES特性写的代码也能运行在目标浏览器上).  Core-JS 包含大量 polyfills 和其他标准，以确保您的 JS 将在您的目标浏览器上运行.  比如IE. 如果目标浏览器是 IE11 并编写了不支持 IE11 的 Javascript，Preset-env 将为您处理从 core-js 中提取最合适的polyfills，并以在 Internet Explorer 11 上运行的方式转换 Javascript.

**现在添加babel配置到 package.json 中 (用babel.config.json替代也可以):**

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

>下一步安装 typescript
**Run the following command:**

``` node
yarn add -D typescript@"^4.0.0"
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
        "skipLibCheck": true,     // 类型检查时跳过类型声明文件,比如两个库以不一致的方式定义相同类型的两个副本, TypeScript 不会对所有 d.ts 文件进行类型较准,而是会对您在应用程序源代码中专门引用的代码进行类型检查
        "allowSyntheticDefaultImports": true,  // 允许 import React from "react"; 的写法,否则只能写成 import * as React from "react";
        "esModuleInterop": true, // 兼空了Commonjs/AMD/UMD模块, 的命名空空间导出和默认导出语句, 它为true 时 allowSyntheticDefaultImports也得是true
        "strict": true, // 启用此选项等效于启用所有严格模式系列选项, 然后,您可以根据需要关闭个别严格模式系列检查。
        "alwaysStrict": true, // 确保您的文件在 ECMAScript 严格模式下解析，每个源文件都启用“use strict”
        "forceConsistentCasingInFileNames": true,  // 兼容大小写敏感的系统与大小写不敏感的系统
        "moduleResolution": "node",  //模块解析策略, 采用node.js 的CommonJS
        "resolveJsonModule": true,   //允许从Json文件中引入模块
        "isolatedModules": false, //将每个文件作为单独的模块, 由于bootstrap.tsx文件不是一个模块,所以这里用false
        "noEmit": true,  //不生成文件, 在启用babel转义而非tsc转义时需要设置为true
        "jsx": "react", //tsx文件转译为js文件内所调用的React的方法, "react"调用React.createElement函数, React17+可以用React-jsx,它调用_jsx函数
        "rootDir": "./src", // TS源码所在位置
        "baseUrl": "./src", // 别名引入模块搜索的路径起点, 如果设置成"./",那么搜索路径将起点将是tsconfig.json文件所在的目录
        "paths": {  // 添加路径别名
            "@routes/*": [
                "components/routes/*"
            ]

        }
    },
    "include": [  //只编译某些目录
        "src"
    ]
}
```

> 此 tsconfig.js 文件定义了 typescript 在项目中的行为, 你也可以让它更严格. 有关选项的完整列表，请查看此处的文档: https://www.typescriptlang.org/tsconfig 和 https://jkchao.github.io/typescript-book-chinese/project/compilationContext.html#%E7%BC%96%E8%AF%91%E9%80%89%E9%A1%B9

目前我使用 ES5 作为编译目标, allowJs 为true，它允许您编写 js... 但这里最重要的是 noEmit 为 true.  所以我们不会在这里输出任何文件(.js或.d.ts都没有).  相反，我们使用 typescript 作为 babel 管道中的中间人, babel 会为我们转译 typescript. 此外，我已将rootDir 和 baseUrl 设置为 ./src 并为@routes 设置了一个路径别名，我将在本文档后面介绍.

## Installing ESLint

> 现在开始安装 eslint for the linter 和 typescript 以及 react plugin for eslint
> 执行以下命令

``` node
yarn add -D eslint eslint-plugin-import typescript-eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-import-resolver-typescript eslint-plugin-react eslint-plugin-react-hooks
```

> Note* 在这一步我们还会获取使eslint 与 typescript 及 react 协同工作相关插件, 之后会设置它们.

### 配置 ESLint

ESLint 文档地址: https://eslint.org/docs/user-guide/configuring/

接下来我们将设置eslint使用typescript的配置文件并添加规则.  您可以添加更多想要的规则, 这里有完整的 ESLint 可用规则列表: https://eslint.org/docs/rules/

TypeScript ESLint 可用规则列表 https://typescript-eslint.io/rules/

linter 的目的是在您编写typescript 和 javascript 实时为您提供有用的警告或错误.  您可以使用 eslint 来强制执行代码标准和以特定方式编写代码.

eslint 共享tsconfig.json中设置的alias 路径可能参考: https://stackoverflow.com/questions/57032522/eslint-complains-about-typescripts-path-aliasing

> 根目录添加.eslintrc.js


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
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2019,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }      
    },
    "plugins": [
        "@typescript-eslint",
        "react",
        "react-hooks",
        "import"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended"
    ],
    "ignorePatterns": [".eslintrc.js"],
    "rules": {
        "import/no-unresolved": "warn",
        "prefer-rest-params": "off",
        "prefer-spread": "off",
        "eol-last": 2,
        "no-undef": 2,
        "quotes": [2, "single", { "avoidEscape": true, "allowTemplateLiterals": true }],
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
    "settings": {
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
        }
    }
};
```

> ESLint 配置中要注意 :
我们已添加了react 的插件和 react hooks的规则, 所以在源码中的hooks 调用出错时会有提示.  你可以添加更多的React的规则，它们可以在这里找到: https://github.com/

yannickcr/eslint-plugin-react


## Installing StyleLint

> 现在开始安装 stylelint 及其插件 stylelint plugin, stylelint-config-standard等
> 执行以下命令

``` node
yarn add -D stylelint stylelint-webpack-plugin stylelint-config-standard stylelint-config-recommended-less stylelint-config-recommended-scss stylelint-less stylelint-scss stylelint-order
```

### 配置 StyleLint
Stylelint 文档地址L:https://stylelint.io/user-guide/get-started
可用规则列表:https://stylelint.io/user-guide/rules/list

> 根目录添加stylelint.config.js

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
> StyleLint 配置中要注意: 我们不是检查css, 面是*.scss, *.less, 因此需要使用PostCss语法, 建议扩展一个共享配置，其中包含您首选语言或库的推荐的语法. 
> 所以我们将 stylelint-config-standard-scss 共享配置扩展用于 lint SCSS, stylelint-config-recommended-less共享配置扩展用于 lint LESS.

## 创建项目的目录结构

> 现在让我们在我们的项目中创建文件夹结构来支持我们的 webpack build.  我在这里使用了一个非常基本的示例，但其中一个要点是您的文件夹结构可以是您想要的任何内容.

**添加以下目录与文件:** 

> 注: React 组件文件名应该以大写字母开头，因为 React jsx 组件必须以大写字母开头.  所以在这个例子中，所有组件的文件名都以大写字母开头，以与文件中导出的组件名一致.

- config
  - paths
    - index.js
  - webpack
    - webpack.common.config.js
    - webpack.dev.babel.js
  - public
    - index.html
- dist
- src
  - assets
    - scss
      - themes
        - _metroTheme.scss
      - variables
        - _vendorVariables.scss        
      - app.scss
      - vendor.scss
  - components
    - routes
      - home
        - HomeRoute.tsx
        - index.tsx
      - index.tsx
    - App.tsx
- index.tsx
## 填写配置

### config\paths\index.js

> 首先，让我们在 config\paths\index.js 文件中创建一个帮助函数来计算我们的路径. 它看起来长这样:

**FileName: config\paths\index.js:**

``` Javascript
import path from 'path';

function paths() {
    this.root = path.resolve(path.join(__dirname), '../../');
    this.src = path.join(this.root, 'src');
    this.srcIndexEntry = path.join(this.src, 'index.tsx');
    this.srcScss = path.join(this.src, 'assets', 'scss');
    this.srcScssEntry = path.join(this.srcScss, 'app.scss');
    this.srcScssVendorEntry = path.join(this.srcScss, 'vendor.scss');
    
    this.dst = path.join(this.root, 'dist');
    
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
import HtmlWebpackPlugin from 'html-webpack-plugin'; //docs -> https://webpack.js.org/plugins/html-webpack-plugin/
import tsConfigPathPlugin from 'tsconfig-paths-webpack-plugin'; //docs -> https://www.npmjs.com/package/tsconfig-paths-webpack-plugin
import TerserPlugin from 'terser-webpack-plugin'; //docs -> https://github.com/webpack-contrib/terser-webpack-plugin
import sass from 'sass'; //docs -> https://sass-lang.com/install
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'; //docs -> https://github.com/TypeStrong/fork-ts-checker-webpack-plugin
import ESLintPlugin from 'eslint-webpack-plugin';

const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';

//根据构建环境获取插件
function getPlugins(env) {
    return [
        new ForkTsCheckerWebpackPlugin({   // 此eslint 只负责js语法检查, 此插件负责做TS类型检查
            async: true
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
        }),
    ];
}

//根据构建环境生成不同的webpack配置项
export function getBaseWebPackConfig(env, argv) {
    console.log('NODE_ENV', NODE_ENV);
    console.log('evn', env);
    console.log('argv', argv);
    let config = {};
    config.mode = NODE_ENV; //设置模式
    const isLocalDev = argv.env.localdev ? true : false;

    //调用 getPlugins helper 生成插件集合
    config.plugins = getPlugins(env);

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
        filename: '[name].[contenthash].js', //因为不只有一个 chunk, 所以输出的 chunk名基于 chunk名和它的hash值, hash值在内容变化时会改变
        path: paths.dst, //打包输出路径
        clean: true, //目村路径如果存在，则先清除
        publicPath: 'auto',
        assetModuleFilename: 'assets/[name][ext]' //资源文件存入assets/子目录下
    };


    config.resolve = {
        extensions: ['.scss', '.js', '.jsx', '.tsx', '.ts'],
        plugins: [
            new tsConfigPathPlugin() //设置webpack在编辑时使用 tsconfig.json 中的 paths 选项来定义别名，省去了在webpack配置项resolve 中再定义 alias
        ]
    };


    // rules 设置不同的文件类型匹配特定的处理loader
    config.module = {
        rules: [
            {
                test: /\.(js|ts)x?$/i, //这个正则匹配 ts,js,tsx,jsx
                exclude: /[\\/]node_modules[\\/]/, //忽略 node_modules,其中的代码切单独切分到 vendor chunk
                use: [
                    {
                        loader: 'babel-loader', //使用 babel loader， 现已不推荐使用 ts-loader
                        options: {
                            presets: [
                                '@babel/preset-env', //使用三种预置 env, react, typescript
                                '@babel/preset-react',
                                '@babel/preset-typescript'
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
                type: 'asset/resource'
            },
            {
                test: /\.(scss|sass)$/, //处理 scss 和 sass 文件
                include: [
                    paths.src,
                    paths.nodemodules //项目的 node_modules 也可能提供样式文件，所以要把它也包含进来
                ],
                use: [ //处理的 loaders 采用倒序，所以最后的 loader 最先执行
                    {
                        //注意, 在生产环境应该用css 抽取插件来处理,  style-loader 可以用在开发环境, 因为它处理速度会更快
                        loader: 'style-loader', // docs -> https://webpack.js.org/loaders/style-loader/
                        options: {
                            esModule: false,
                            insert: 'head'   // 最后执行
                        }
                    },
                    {
                        loader: 'css-loader', //docs -> https://www.npmjs.com/package/css-loader
                        options: {
                            modules: false, //不使用 styled components in react
                            esModule: false,  //不使用 es module 语法
                            sourceMap: true //是/否生成样式的 source maps 文件
                        }
                    },
                    {
                        loader: 'postcss-loader', //docs -> https://github.com/webpack-contrib/postcss-loader
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            implementation: sass
                        }
                    }
                ]
            }
        ]
    };

    // 配置webpack 如何拆分 chunk，并可以为 CSS 创建测试函数，以便 css get 被提取到它自己的chunk中。
    config.optimization = { // docs -> https://webpack.js.org/plugins/split-chunks-plugin/#defaults
        nodeEnv: NODE_ENV,   // nodeEnv的默认值与mode 一致,会利用 webpack.DefinePlugin 自动添加到 process.env.NODE_ENV 中去,所以无需再设置 DefinePlugin 插件
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
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    };

    config.performance = {  //增加weback 报资源太大的阈值, production 环境不用加
        hints: 'warning',
        maxAssetSize: 20000000, // 整数类型（以字节为单位）
        maxEntrypointSize: 40000000, // 整数类型（以字节为单位）
        assetFilter: function(assetFilename) {
          // 提供资源文件名的断言函数
          return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
     };


    // 命令行带有 localdev, 就运行本地开发Server
    if (isLocalDev) {
        console.log('DEV SERVER');
        config.devtool = 'source-map';
        config.devServer = {
            host: 'local-ip', // 自动以ip地址(非localhost)打开页面
            historyApiFallback: true,
            hot: true, //打开模块热更新功 !
            port: 9000,
            client: {
                progress: true,
                overlay: true,
                logging: 'info' //在本地开发模式下,提供记录到客户端的所有信息
            },
            static: {
                publicPath: 'auto',
                directory: paths.dst
            }
        };
    } else {
        config.devtool = 'cheap-module-source-map';
    }

    return config;
}
```
## 添加本地运行环境的 webpack 配置

现在我们将添加实际的文件，它将成为我们 webpack 的入口点, 本地运行我们使用的叫作 webpack.dev.babel.js 的配置文件.

> 注意这里以 .babel.js 为后缀, 此前在安装babel时提及过 @babel/register.  这使得 ES6 import/export 等用法在webpack 配置文件中可用,以及用babel来处理 webpack 配置.

**继续在 config/webpack 目录下创建名为 webpack.dev.babel.js 的文件, 内容如下:**

``` Javascript
import { getBaseWebPackConfig } from './webpack.common.config';

function getLocalWebPackConfig(env, argv) {    
    const webPackConfig = getBaseWebPackConfig(env, argv);
    // 这里可以在运行之前更改或覆盖从 getBaseWebPackConfig 取得的 webpack 配置对象
    // 比如可以改变Dev Server, 或路径配置, 以及任务你认为可以不同的设置 
    return webPackConfig;
}

module.exports = getLocalWebPackConfig
```

**新建文件 config/public/index.html 加入以下内容:**

``` Html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
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

```
$fa-font-path: '~font-awesome/fonts';
@import './variables/vendorVariables';
@import '~bootstrap/scss/bootstrap';
@import '~font-awesome/scss/font-awesome';
```

**新建文件 src/components/routes/home/HomeRoute.tsx 添加以下内容:**

``` TSX
import React, { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

export const HomeRoute = () : React.ReactElement => {
    const [testState] = useState<boolean>(true);
    if (testState) {
        const [oppsState] = useState<boolean>(false); //broken on purpose to show linting errors.
    }
    return (
        <Container fluid className="gx-0">
            <Row>
                <Col xs={12}>
                    <h1 className="bg-primary text-center">Hello World!</h1>
                </Col>
            </Row>
        </Container>
    )
}
```

**新建文件 src/components/routes/home/index.tsx 添加以下内容:**

``` TSX
export * from './HomeRoute'; //导出所有 HomeRoute.tsx 所导出的内容
```

**新建文件 src/components/routes/index.tsx 添加以下内容:**

``` TSX
export * as Home from './home'; //导出所有 /home 目录下 index.tsx 导出的内容
```

**新建文件 src/components/App.tsx 添加以下内容:**

``` TSX
import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { HomeRoute } from '@routes/home'; //之前提及的TSConfig中的别名路径  @routes, 这里就是使用别名路径的例子. 这是一个捷径，因此您不必在整个应用程序中使用 ../../ 等进行文件夹钻孔.

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>                              
                <Route path="/home" element={<Outlet />}>
                    <Route path="/" element={(<HomeRoute />)} />                    
                </Route>                
                <Route path="*" element={<Navigate to="/home" /> } />
            </Routes>
        </BrowserRouter>
    )
}
```

> 如果您对索引文件的用途感到困惑... Imports in es6/typescript 自动以不同的后缀名(.js or .ts or .jsx or .tsx)查找 index 文件.  所以当使用 ```import thing from 'somepath'``` import语句角析不光查找 "somepath" 文件, 同时也查找 "somepath" 目录下名叫 index 的文件, 然后加载它.  因此，通过从index中导出所有内容，它可以让您从一个路径导入许多内容，从而节省导入语句中的样板，因此您可以执行以下操作:

```
import { Animal, Dog, Cat, Cow, Horse, Pig } from '@models' // @models 是一个路径别名 
// 在 tsconfig.json 中配置了 @models 指向一个内有index文件的目录, 此index 又导出了所有模块 .
```

**src下, 添加 index.tsx (这是入口文件) 内容如下:**

```
import React from 'react';
import { render } from 'react-dom';
import { App } from './components/App';

function index() {
    return (
        <React.StrictMode>
            <App />
        </React.StrictMode>
    )
}

render(index(), document.getElementById('root'));
```
## 在运行 build 之前安装运行时依赖

> 我们即将从头开始设置一个初始的 hello world 应用程序，但首先我们需要安装我们所有的运行时依赖项，如 React、React-Router、@types、Luxon、Bootstrap 等（或任何您想要的应用程序）

**终端中运行以下命令:**

``` Node
//安装主要的依赖库 React, React-dom 等 

//注 - react-router 和 react-bootstrap 用了beta版
yarn add @popperjs/core bootstrap@"^5.0.0" font-awesome history react@"^17.0.0" react-dom@"^17.0.0" react-bootstrap@"^2.0.0-beta.5" react-router-dom@"^6.0.0-beta.2" react-router@"^6.0.0-beta.2"

//安装 typescript types 作为依赖
yarn add @types/react @types/react-bootstrap @types/react-dom @types/react-router @types/react-router-dom
```

## 创建 package.json scripts 构建build的脚本:

**添加以下脚本到 package.json:**

``` JSON
  "scripts": {
    "build": "NODE_ENV=production webpack --config ./config/webpack/webpack.dev.babel.js",
    "start": "NODE_ENV=development webpack serve --open --config ./config/webpack/webpack.dev.babel.jss --env=localdev",
  }
```

> 注: --env 标志的是传入 webpack config 的运行环境, 在这里,我们传递了一个名为 localdev 的环境标志

## Run the build

现在让我们测试构建的输出，看看它是否按预期运行并生成 lint 错误:

```
yarn build
```

Your output should resemble: 
![](https://github.com/rmannjbs/WP5ReactTSFromScratch/blob/master/blogAssets/images/yarnBuildLintError.png?raw=true)

Let's fix the lint errors:

Change App.tsx to the following:

```
import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { HomeRoute } from '@routes/home'; //earlier I talked about the @routes path alias in the TSConfig, this is an example of using it.  It's a short cut so you don't have to folder drill with ../../ etc all over your app.

export const App = (): React.ReactElement => {
    return (
        <BrowserRouter>
            <Routes>                              
                <Route path="/home" element={<Outlet />}>
                    <Route path="/" element={(<HomeRoute />)} />                    
                </Route>                
                <Route path="*" element={<Navigate to="/home" /> } />
            </Routes>
        </BrowserRouter>
    )
}
```

**Change HomeRoute.tsx to the following** 
```
import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

export const HomeRoute = () : React.ReactElement => {
    return (
        <Container fluid className="gx-0">
            <Row>
                <Col xs={12}>
                    <h1 className="bg-primary text-center">Hello World!</h1>
                </Col>
            </Row>
        </Container>
    )
}
```

**re-run yarn build and your lint errors should go away and you should have a dist folder with output files in it**


## Run the local server and work on the code locally

Run the following command: 

``` yarn start ```

dev srever 会运行在 9000 端口.
## Wrapping up Part 1

您现在已经完成了安装 yarn 和 react,typescript,scss 项目所需的许多依赖项.  你应该有完整的 eslint 运行.  如果在 VSCode 中没有进行 linting，您可能缺少 ESLint 插件，或者您需要在 VSCode 中配置您的用户设置以启用文件扩展名:

### -> settings.json (VSCode)
``` JSON 
        "eslint.validate": [ "javascript", "javascriptreact", "html", "typescriptreact" ]
```

你已经设置了一个带有环境标志的本地 webpack 配置。 如果你想为特定环境添加 webpack 配置，你可以将它们添加到 config/webpack 文件夹并在package.json 中为它们添加新的脚本.

## -> 1.添加插件抽取样式生成独立的样式文件
## -> 2.添加插件fork-ts-checker-webpack-plugin作类型检查
## -> 3.添加less的支持
## -> 4.添加sass moduless, less modules 的支持
## -> 5.添加stylelint 可对样式进行 autofix
## -> 6.将babel, eslint 的全局配置从package.json中分离到单独的配置文件中去
## -> 7.添加types(.d.ts)文件以支持在源代码中import引入*.png, *.svg 等文件,也要支作为静态资源在页面中引入 
## -> 8.更合理得分离dev与prod 的webpack配置,生产环境需要压缩js, 最后检查不同环境source map的生成情况
## -> 9.完善模块文件(包括起更语义化的名字)以支持yeoman-generator生成的项目可以独立运行(需测试build出来的bundle 是否可用)
## -> 10.添加dev server 支持https
## -> 11.启动脚本通过--env参数区别开发与产品环境, 以及是否启用webpack-bundle-analyzer插件分析打包大小
## -> 12.添加跳转到错误页
## -> 13.页面中可以直接访问静态资源图片
## -> 14.集成i18next
## 15.支持模块联邦,引入portal,注意输出文件的路径号与模块联邦歉容,结合sophon-cli的配置和项目结构做成兼容的yeoman-generator
## 16.命令行传入port, dev server 的proxy, 模块联邦的template模板文件
## 17.引入.npmrc到模板文件,gitlab.yml, dockerfile 等公司内部文件
## 18.treeshaking 副作用定义
## 19.添加husky