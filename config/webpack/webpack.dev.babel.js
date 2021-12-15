import paths from '../paths'; //*本项目的路径库*
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';  // 构建速度分析
import { getBaseWebPackConfig } from './webpack.common.config';
import { merge } from 'webpack-merge';


// let NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';

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
            port: 9000,
            client: {
                progress: true,
                overlay: true,
                logging: 'info' //在本地开发模式下,提供记录到客户端的所有信息
            },
            static: [
                {
                    publicPath: '/',
                    directory: paths.dst
                },
                {
                    publicPath: '/',
                    directory: paths.src
                }
            ],
            https: true,  // 如下语句支持传入自签证书文件
            // https: {
            //     ca: './path/to/server.pem',
            //     pfx: './path/to/server.pfx',
            //     key: './path/to/server.key',
            //     cert: './path/to/server.crt',
            //     passphrase: 'webpack-dev-server',
            //     requestCert: true,
            //   },
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
            minimize: false, // 默认情况下仅在生产环境不开启 CSS 优化，如果想在开发环境下启用 CSS 优化，请将 optimization.minimize 设置为 true, 且用 MiniCssExtractPlugin.loader 取代 style-loader
        }
    };

    return new SpeedMeasurePlugin().wrap(merge(webpackCommonConfig, webpackDevConfig));
}

module.exports = getDevWebPackConfig;


