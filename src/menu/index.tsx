import getTranslation from 'portal/getTranslation';

const t = getTranslation(require('./locales.yml'));

const inject2PortalMenu: any[] = [
    {
      // 模块的名字，显示在菜单中
      name: '新模块名',
      module: process.env.federationName,
      path: `/${process.env.federationName}`,
      // 二级菜单，只用定义到二级菜单
      children: [
        {
          name: t('主页'),
          path: '/data/home',
        },
        {
          name: t('总览'),
          path: '/data/dashboard',
        },
      ]
    }
];

export default inject2PortalMenu;
