import { federationName, portalServer } from './dev.server';

const genModuleFederation = (deps) => ({
  name: federationName,
  filename: `${federationName}/container.js`,
  exposes: {   // 导出路由和菜单组件给portal
    './routes': './src/routes',
    './menu': './src/menu',
  }, 
  remotes: {
    portal: `portal@${portalServer}/portal/container.js`,
    uc: `uc@${portalServer}/uc/container.js`,
    settings: `settings@${portalServer}/settings/container.js`
  },
  shared: [
    {
      react: {
        eager: true,
        singleton: true,
        requiredVersion: deps.react
      },
      'react-dom': {
        eager: true,
        singleton: true,
        requiredVersion: deps['react-dom']
      },
      'react-router-dom': {
        eager: true,
        requiredVersion: deps['react-router-dom']
      },
      'react-i18next': {
        eager: true,
        requiredVersion: deps['react-i18next']
      },
      i18next: {
        eager: true,
        requiredVersion: deps.i18next
      }
    }
  ]
});

export default genModuleFederation;
