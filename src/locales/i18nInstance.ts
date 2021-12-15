import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'; // 探测上次所选择的语言以供默认使用

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
        react: {
            wait: true,
            useSuspense: true
        }
    }, (err, t) => {
        if (err) return console.log('something about i18next went wrong when loading', err);
        t('key'); // -> same as i18next.t
    });

export default i18nInstance;

export const lngs: Record<string, any> = {
    zh: { nativeName: '中文' },
    en: { nativeName: 'English' }
};

export const loadResourceBundle = (i18nInstance: typeof i18n, ns: string) => {
    Object.keys(lngs).forEach((lng) => {
        i18nInstance.addResourceBundle(lng, ns, require(`./extractedTranslations/${lng}/${ns}.json`), true, true);
    });
};

