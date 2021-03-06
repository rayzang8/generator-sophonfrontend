import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'; // 探测上次所选择的语言以供默认使用

const resBundle = require('i18next-resource-store-loader!./extractedTranslations/index.js'); // 加载目录extractedTranslations下的所有语言资源文件, index.js 文件可以为空,它仅用于指语言文件根目录
const i18nInstance = i18n.createInstance();
i18nInstance
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'zh',
        defaultNS: 'App',
        fallbackNS: 'App',
        debug: true,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: resBundle,
        react: {
            useSuspense: true
        }
    }, (err, t) => {
        if (err) return console.log('something about i18next went wrong when loading', err);
        t('key'); // -> same as i18next.t
    });

export default i18nInstance;

export const lngs: Record<string, any> = {
    cn: { nativeName: '中文' },
    en: { nativeName: 'English' }
};

export const loadResourceBundle = (ns = 'App') => {
    Object.keys(lngs).forEach((lng) => {
        i18nInstance.addResourceBundle(lng, ns, require(`./extractedTranslations/${lng}/${ns}.json`));
    });
};

