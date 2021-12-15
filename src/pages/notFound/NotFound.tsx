import React from 'react';
import './notFound.scss';


export const NotFound  = () => {

    return (
        <div className="page-error">
          <div className="img-wrapper">
            {/* 这里显示图片采用了静态资源的方式（替代了 require('../../assets/images/404.png'), 注意打包后的路径仍要能找到该资源 */}
            <img className="error-image" src="/sophon/assets/404.png" /> 
            <h1>{'Page not found'}</h1>
          </div>
        </div>
      );
};
