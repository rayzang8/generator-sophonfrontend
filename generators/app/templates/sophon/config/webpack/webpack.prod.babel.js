import paths from '../paths'; //*本项目的路径库*
import { getBaseWebPackConfig } from './webpack.common.config';
import TerserPlugin from 'terser-webpack-plugin'; //docs -> https://github.com/webpack-contrib/terser-webpack-plugin
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';  // 构建速度分析
import StylelintWebpackPlugin from 'stylelint-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { merge } from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { federationName } from './dev.server';

function getProdWebPackConfig(env, argv) {    
    console.log('evn', env);
    console.log('argv', argv);
    const webpackCommonConfig = getBaseWebPackConfig('production', argv);
    // 这里可以在运行之前更改或覆盖从 getBaseWebPackConfig 取得的 webpack 配置对象
    // 比如可以改变Dev Server, 或路径配置, 以及任务你认为可以不同的设置 

    const webpackPrdConfig = {
        mode: 'production', //设置运行模式
        devtool: 'cheap-module-source-map',  // 'source-map',  在production模式下显示指定
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({parallel: true}),  // 使用TerserPlugin插件后, 只有对devtool为 source-map , inline-source-map, hidden-source-map , nosources-source-map 时才能保留 srouce map, 其它情况会丢失source map
                new CssMinimizerPlugin({parallel: 2}),
            ]
        },
        plugins: [
            // new MiniCssExtractPlugin(),
            new StylelintWebpackPlugin({
                context: 'src',
                configFile: paths.styleLintConfig,
                files: '**/*.(s(c|a)ss|css|less)',
                fix: false
            })
        ],
    };

    const configWithTimeMeasures = new SpeedMeasurePlugin().wrap(merge(webpackCommonConfig, webpackPrdConfig));
    /**
     *  SpeedMeasurePlugin与MiniCssExtractPlugin两个插件当前版本不兼容, 
     *  work around 的方法就是SpeedMeasurePlugin先包裹后再添加MiniCssExtractPlugin
     */
    configWithTimeMeasures.plugins.push(new MiniCssExtractPlugin({
        filename: `${federationName}/[name].[contenthash].css`,
        linkType: 'text/css',
        ignoreOrder: false
    })); 
    if (env.analysis) {
        configWithTimeMeasures.plugins.push(new BundleAnalyzerPlugin()); 
    }

    return configWithTimeMeasures;
}

module.exports = getProdWebPackConfig;


