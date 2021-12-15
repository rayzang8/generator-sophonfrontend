import paths from '../paths'; //*本项目的路径库*
//plugins for webpack
import chalk from 'chalk';
import HtmlWebpackPlugin from 'html-webpack-plugin'; //docs -> https://webpack.js.org/plugins/html-webpack-plugin/
import tsConfigPathPlugin from 'tsconfig-paths-webpack-plugin'; //docs -> https://www.npmjs.com/package/tsconfig-paths-webpack-plugin
import sass from 'sass'; //docs -> https://sass-lang.com/install
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'; //docs -> https://github.com/TypeStrong/fork-ts-checker-webpack-plugin
import ESLintPlugin from 'eslint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';  // 输出构建进度


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
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': NODE_ENV  // 将从构建命令行获取的环境变量NODE_ENV, 传递到runtime(源码中可以获取process.env.NODE_ENV)
        // }),
        new ProgressBarPlugin({ format: `  :msg [:bar] ${chalk.cyanBright.bold(':percent')} (:elapsed s)` }),   // 进度条
        new ForkTsCheckerWebpackPlugin({   // 此eslint 只负责js语法检查, 此插件负责做TS类型检查
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
        filename: 'sophon/[name].[contenthash].js', //因为不只有一个 chunk, 所以输出的 chunk名基于 chunk名和它的hash值, hash值在内容变化时会改变(*.css样式文件也与*.js 位于同一层目录)
        path: paths.dst, //打包输出路径
        clean: true, //目标路径如果存在，则先清除
        publicPath: 'auto',
        assetModuleFilename: 'sophon/assets/[name][ext]' //资源文件存入assets/子目录下
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
                type: 'asset/resource',
            },
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
