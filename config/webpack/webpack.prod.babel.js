import paths from '../paths'; //*本项目的路径库*
import { getBaseWebPackConfig } from './webpack.common.config';
import TerserPlugin from 'terser-webpack-plugin'; //docs -> https://github.com/webpack-contrib/terser-webpack-plugin
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';  // 构建速度分析
import StylelintWebpackPlugin from 'stylelint-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { merge } from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';

function getProdWebPackConfig(env, argv) {    
    console.log('NODE_ENV', NODE_ENV);
    console.log('evn', env);
    console.log('argv', argv);
    // config.mode = env; //设置运行模式
    const webpackCommonConfig = getBaseWebPackConfig(NODE_ENV, argv);
    // 这里可以在运行之前更改或覆盖从 getBaseWebPackConfig 取得的 webpack 配置对象
    // 比如可以改变Dev Server, 或路径配置, 以及任务你认为可以不同的设置 

    const webpackPrdConfig = {
        mode: 'production',
        devtool: 'cheap-module-source-map',  // 'source-map',  在production模式下显示指定
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({parallel: true}),   // 只有对devtool为 source-map , inline-source-map, hidden-source-map , nosources-source-map 时才能保留 srouce map, 其它情况会丢失source map
                new CssMinimizerPlugin({parallel: 3}),
            ]
        },
        plugins: [
            // new MiniCssExtractPlugin(),
            new StylelintWebpackPlugin({
                context: 'src',
                configFile: paths.styleLintConfig,
                files: '**/*.(s(c|a)ss|css|less)',
                fix: false
            }),
            new BundleAnalyzerPlugin()
        ],
    };

    const configWithTimeMeasures = new SpeedMeasurePlugin().wrap(merge(webpackCommonConfig, webpackPrdConfig));
    configWithTimeMeasures.plugins.push(new MiniCssExtractPlugin());  // SpeedMeasurePlugin与MiniCssExtractPlugin两个插件当前版本不兼容, work around 的方法就是SpeedMeasurePlugin先包裹后再添加MiniCssExtractPlugin

    return configWithTimeMeasures;
}

module.exports = getProdWebPackConfig;


