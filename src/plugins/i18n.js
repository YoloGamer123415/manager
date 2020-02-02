import Vue from "vue";
import VueI18n from "vue-i18n";
import languages from "@/../public/lang/all";
import en_US from "../../public/lang/en_US";
import nl_NL from "../../public/lang/nl_NL";

let allLangObj = {
    en_US,
    nl_NL
};

Vue.use(VueI18n);

const language = window.localStorage.getItem('manager__language');

const i18n = new VueI18n({
    locale: language
        ? JSON.parse(language).value
        : languages.default
    ,
    fallbackLocale: 'en',
    messages: allLangObj
});

export default i18n;
