import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from './en-US';
import zh from './zh-CN';

const resources = {
  en: { translation: en },
  zh: { translation: zh },
};

// 自动检测设备语言
const getLanguage = () => {
  const locales = RNLocalize.getLocales();
  if (Array.isArray(locales)) {
    const lang = locales[0].languageCode;
    return lang === 'zh' ? 'zh' : 'en';
  }
  return 'en';
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4', // 兼容旧版 JSON 的键值结构处理
  resources,
  lng: getLanguage(), // 初始语言
  fallbackLng: 'en', // 找不到语言 fallback
  interpolation: {
    escapeValue: false, // 字符串插值（变量替换）时是否进行HTML转义
  },
});

export default i18n;
