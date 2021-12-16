import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { loadResourceBundle } from '#locales';
import './notFound.scss';


export const NotFound  = () => {
  const { t } = useTranslation('Error');
  useEffect(() => loadResourceBundle('Error'), []);
  

    return (
        <div className="page-error">
          <div className="img-wrapper">
            {/* 这里显示图片采用了静态资源的方式（替代了 require('../../assets/images/404.png'), 注意打包后的路径仍要能找到该资源 */}
            <img className="error-image" src="/sophon/assets/404.png" /> 
            <h1>{t('页面不存在')}</h1>
          </div>
        </div>
      );
};
