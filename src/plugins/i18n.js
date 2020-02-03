import Vue from "vue";
import VueI18n from "vue-i18n";
import languages from "@/../public/lang/all";

let allLangObj = {};

Vue.use(VueI18n);

const language = window.localStorage.getItem('manager__language');

languages.all.forEach(lang => {
    let langObj = require(`@/../public/lang/${lang}.json`);

    if (langObj)
        allLangObj[lang] = langObj;
});

const i18n = new VueI18n({
    locale: language
        ? JSON.parse(language).value
        : languages.default
    ,
    fallbackLocale: languages.default,
    messages: allLangObj,
    silentTranslationWarn: true
});

export default i18n;
