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

const i18n = new VueI18n({
    locale: window.localStorage.getItem('manager__language')
        ? JSON.parse(window.localStorage.getItem('manager__language')).value
        : languages.default
    ,
    fallbackLocale: window.localStorage.getItem('manager__language')
        ? JSON.parse(window.localStorage.getItem('manager__language')).value
        : languages.default
    ,
    messages: allLangObj
});

export default i18n;
