import React, { useEffect, useState } from 'react';
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
  // console.log(aaa);  // 测试 eslint 使用末定义的变量
  const [testState, setTestState] = useState<string>('');
  const [user, setUser] = useState<Record<string, any>>();
  const { t, i18n } = useTranslation('Home');

  useEffect(() => {
    setTestState(`在应用代码中获取process.env.NODE_ENV值 = ${process.env.NODE_ENV}\n
        在应用代码中获取模块联邦名process.env.federationName = ${process.env.federationName! === 'sophon' ? '' : process.env.federationName!}`);
    // 若在i18next 初始化时没有加载语言资源,则 import { loadResourceBundle } from '#locales'; 后执行以下语句加载
    // loadResourceBundle('Home'); 
    // 它也相当于执行以下两行
    // i18n.addResourceBundle('zh', 'Home', require(`../../locales/extractedTranslations/cn/Home.json`));
    // i18n.addResourceBundle('en', 'Home', require(`../../locales/extractedTranslations/en/Home.json`));
  }, []);

  const switchLanguage = (lng: string) => i18n.changeLanguage(lng);

  const getUserProfile = async () => {
    const userProfile = await commonApi.getUserProfile();
    setUser(userProfile);
  };
  // if (testState) { // 测试 eslint hooks 错误
  //     const [oppsState] = useState<boolean>(true);
  // }
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
