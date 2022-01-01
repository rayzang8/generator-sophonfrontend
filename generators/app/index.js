const Generator = require('yeoman-generator');
const chalk = require('chalk');
const extend = require('lodash/extend');
const pkg = require('../../package.json');

// enable install tasks (yeoman v4 backwards compatibility)
extend(Generator.prototype, require('yeoman-generator/lib/actions/install'));

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    /**
     *  此处初始化命令行参数 this.option('import-portal');
     *  接收的参数 输入时为 --import-portal
     *  下面就可以用 this.options['import-portal'] 判断是否有此参数
     */
    // this.option('import-portal');  
  }

  _writeFile(templatePath, destinationPath, params) {
    // if (!this.fs.exists(destinationPath)) {
      this.fs.copyTpl(templatePath, destinationPath, params);
    // }
  }

  _filterDependencies(dep, excludes) {
    excludes.forEach((depKey) => {
      delete dep[depKey];
    });
    return dep;
  }

  prompting() {
    const promptQA = [
      {
        type: 'input',
        name: 'applicationName',
        required: true,
        message: '请输入项目名称? (会新建以此命名的目录)'
      },
      {
        type: 'input',
        name: 'devPort',
        message: 'devServer运行的端口? (默认 9000)'
      },
      {
        type: 'input',
        name: 'proxyUrl',
        message: '后台api服务地址:端口? (默认 http://172.26.0.130:8700)'
      },
      {
        type: 'input',
        name: 'websocketPort',
        message: '后台websocket端口? (默认 8720)'
      },
    ];

    promptQA.push({
      type: 'input',
      name: 'installMethod',
      // required: true,
      message: '使用Yarn来安装? (yarn/npm/直接回车跳过安装)'
    });
    return this.prompt(promptQA).then((data) => {
      this.data = data;
    });
  }

  writing() {
    const { applicationName, devPort, proxyUrl, websocketPort, federationName, portalServer, yarn = 'yarn' } = this.data;
  
    const isYarn = yarn.toLowerCase() === 'yarn';

    // 新建的项目排除yeoman相关的依赖
    const depExcludes = [
      'mem-fs',
      'mem-fs-editor',
      'yeoman-assert',
      'yeoman-environment',
      'yeoman-generator',
      'yeoman-test'
    ];
    const devDepExcludes = [
      'chalk',
      'lodash',
    ];

    // 设置交互问题的默认值
    const variables = {
      applicationName,
      cmd: isYarn ? 'yarn' : 'npm run',
      dependencies: this._filterDependencies(pkg.dependencies, depExcludes),
      devDependencies: this._filterDependencies(pkg.devDependencies, devDepExcludes),
      nodeVersion: '14.17.0',
      packageManager: isYarn ? 'yarn' : 'npm',
      packageManagerVersion: isYarn ? '1.22.4' : '6.14.7',
      devPort: devPort || '9000', 
      proxyUrl: proxyUrl || 'http://172.26.0.130:8700' ,
      websocketPort: websocketPort || '8720',
      federationName: federationName || 'sophon',
    };

    this.fs.copy(
      this.templatePath(`sophon/**/*`),
      this.destinationPath(applicationName),
      {
        globOptions: {
          dot: true,
          ignore: [
            '**/node_modules',
            '**/package.json',
            '**/package-lock.json',
            '**/yarn.lock',
            '**/index.html',
            '**/README.md',
            '**/.gitignore',
            '**/.npmignore'
          ]
        }
      }
    );

    const configFiles = [
      '.eslintrc.js',
      'tsconfig.json',
      'postcss.config.js',
      'babel.config.json',
      'stylelint.config.js'
    ];

    configFiles.forEach((file) => {
      this.fs.copy(
        this.templatePath('rootConfigs', file),
        this.destinationPath(applicationName, file)
      );
    });

    this.fs.copy(
      this.templatePath('rootConfigs', 'gitignore'),
      this.destinationPath(applicationName, '.gitignore')
    );

    this._writeFile(
      this.templatePath('rootConfigs/restart.sh.template'),
      this.destinationPath(applicationName, 'restart.sh'),
      variables
    );

    this._writeFile(
      this.templatePath('rootConfigs/package.json.template'),
      this.destinationPath(applicationName, 'package.json'),
      variables
    );

    this._writeFile(
      this.templatePath('rootConfigs/README.md.template'),
      this.destinationPath(applicationName, 'README.md'),
      variables
    );

    this._writeFile(
      this.templatePath('rootConfigs/index.html.template'),
      this.destinationPath(applicationName, 'config', 'public', 'index.html'),
      variables
    );

    this._writeFile(
      this.templatePath('rootConfigs/config/webpack/dev.server.js.template'),
      this.destinationPath(applicationName, 'config', 'webpack', 'dev.server.js'),
      variables
    );

  }

  install() {
      const { applicationName, installMethod } = this.data;

      let method;
      if (installMethod?.toLowerCase() === 'yarn') {
        method = 'yarnInstall';
      } else if (installMethod?.toLowerCase() === 'npm') {
        method = 'npmInstall';
      }

      if (!method) return;

      this.log(
        chalk.cyan(`\nInstalling dependencies with ${installMethod}...\n`)
      );

      this[method](null, {}, { cwd: applicationName });
  }

  end() {
    const { applicationName } = this.data;

    this.log(chalk.cyan('\nSetup complete. Happy coding!\n'));
    this.log(
      chalk.yellow(
        `Tip: Build instructions can be found in the ${applicationName}/README.md file.\n`
      )
    );
  }
};
