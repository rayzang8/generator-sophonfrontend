const copy = require('recursive-copy');
const chalk = require('chalk');
const path = require('path');

function copyFolders(sourcePath, destPath) {
    copy(sourcePath, destPath, {overwrite: true})   // 复制并覆盖原有文件
    .on(copy.events.COPY_FILE_START, function(copyOperation) {
        console.info(chalk.blueBright('Copying file ' + copyOperation.src + '...'));
    })
    .on(copy.events.COPY_FILE_COMPLETE, function(copyOperation) {
        console.info(chalk.greenBright('Copied to ' + copyOperation.dest));
    })
    .on(copy.events.ERROR, function(error, copyOperation) {
        console.error(chalk.redBright('Unable to copy ' + copyOperation.dest));
    })
    .then(function(results) {
        console.info(chalk.yellowBright(results.length + ' file(s) copied'));
    })
    .catch(function(error) {
        return console.error(chalk.redBright('Copy failed: ' + error));
    });
}

const srcAssets = path.resolve('src/assets/images');
const dst = path.resolve('dist/sophon/assets');
console.info(chalk.yellowBright('复制静态资源到打包目标目录'));
copyFolders(srcAssets, dst);
