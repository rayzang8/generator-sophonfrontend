import React, {useEffect, useState} from 'react';
import { lngs, loadResourceBundle } from '#locales';
import logo from '#assets/images/logo.svg';
import styles from './home.module.scss';
import lessStyles from './home.module.less';
import './home.scss';
import './home.less';
import { useTranslation } from 'react-i18next';

export const Home = ():React.ReactElement => {
    // console.log(aaa);  // 测试 eslint 使用末定义的变量
    const [testState, setTestState] = useState<string>('');
    const { t, i18n } = useTranslation('Home');
    // i18n.addResourceBundle('zh', 'Home', require(`./extractedTranslations/zh/Home.json`), true, true);
    // i18n.addResourceBundle('en', 'Home', require(`./extractedTranslations/en/Home.json`), true, true);
    loadResourceBundle(i18n, 'Home');

    useEffect(() => {
        setTestState(`在应用代码中获取process.env.NODE_ENV值 = ${process.env.NODE_ENV}`);
    }, []);

    const switchLanguage = (lng: string) => i18n.changeLanguage(lng);
    // if (testState) { // 测试 eslint hooks 错误
    //     const [oppsState] = useState<boolean>(true);
    // }
    return (
        <div className="app">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <img src={require('../../assets/images/transwarp.svg')} /> 
          <img src="/sophon/assets/transwarp.svg" />  {/* 这里显示图片采用了静态资源的方式, 注意打包后的路径仍要能找到该资源 */}
          <div className="sophon" />
          <p className={styles.test}>
            Edit <code className="test2">src/App.tsx</code> and save to reload.
          </p>
          <a
            className="app-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={lessStyles.test3}>{t('欢迎来到Sophon宇宙')} {testState}</span>
          </a>
          <div>
          {Object.keys(lngs).map((lng) => (
            <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => switchLanguage(lng)}>
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
        </header>
      </div>
    );
};
