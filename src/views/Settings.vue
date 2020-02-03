<template>
    <div id="Settings">
        <h1 class="settings">{{ $t('settings.title') }}</h1>
        
        <div class="setting language">
            <label for="language">{{ $t('settings.language') }}:</label>
            <select id="language" v-model="selectedLanguage">
                <option v-for="lang in languages" :key="lang" :value="lang">
                    {{ lang }}
                </option>
            </select>
    
            <br>
            
            <label for="theme">{{ $t('settings.theme') }}:</label>
            <select id="theme" v-model="selectedTheme">
                <option v-for="available in $theme.availableThemes" :key="available" :value="available">
                    {{ available }}
                </option>
            </select>
            
            <br>
    
            <label for="main-color">{{ $t('settings.mainColor') }}:</label>
            <input type="text" id="main-color" v-model="mainColor" :placeholder="$theme.defaultMainColor">
            
            <br>
            
            <label for="fullscreen">{{ $t('settings.fullscreen') }}:</label>
            <input type="checkbox" id="fullscreen" v-model="fullscreen">
            
            <br>
            <br>
            <br>
            
            <router-link to="/">Test page</router-link>
        </div>
    </div>
</template>

<script>
import languages from "@/../public/lang/all";
import EventBus from "@/EventBus";

export default {
    name: "Settings",
    data() {
        return {
            languages: languages.all.sort(),
            selectedLanguage: this.$i18n.locale,
            selectedTheme: this.$theme.current,
            mainColor: this.$theme.mainColor,
            fullscreen: this.$fullscreen.isFullscreen
        }
    },
    watch: {
        selectedLanguage: function (newLang) {
            this.$i18n.locale = newLang;
            this.$ls.set('language', newLang);
            EventBus.emit('change-lang');
        },
        selectedTheme: function (newTheme) {
            this.$theme.current = newTheme;
            this.$ls.set('theme', newTheme);
        },
        mainColor: function (newColor) {
            this.$theme.mainColor = newColor;
            this.$ls.set('main-color', newColor);
        },
        fullscreen: function (isFullscreen) {
            this.$fullscreen.toggle(true, isFullscreen);
        }
    }
}
</script>

<style lang="scss" scoped>
div#Settings {
    color: var(--current-theme-text);
}
</style>
