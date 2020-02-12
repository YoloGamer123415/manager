<template>
    <div id="Settings">
        <h1 class="settings">{{ $t('settings.title') }}</h1>
        
        <div class="setting language">
            <div class="option">
                <Select
                    id="language"
                    :label="$t('settings.language') + ':'"
                    @change="languageChange"
                >
                    <option v-for="lang in languages" :key="lang" :value="lang">
                        {{ lang }}
                    </option>
                </Select>
            </div>
        </div>
    
        <div class="setting theme">
            <div class="option">
                <Select
                    id="theme"
                    :label="$t('settings.theme') + ':'"
                    @change="themeChange"
                >
                    <option
                        v-for="(available, index) in $theme.availableThemes"
                        :key="available"
                        :value="available"
                        :initSelectedIndex="available === $theme.mainColor ? index : null"
                    >
                        {{ available }}
                    </option>
                </Select>
            </div>
        </div>
    
        <div class="setting theme">
            <Input
                id="settings-maincolor"
                :label="$t('settings.mainColor')"
                :example="$theme.defaultMainColor"
                :initVal="mainColor"
                @change="mainColorChange"
            />
        </div>
        
        <div class="setting language">
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
import Select from "@/components/form/Select/index";
import Input from "@/components/form/Input";

export default {
    name: "Settings",
    components: {Input, Select},
    data() {
        return {
            languages: languages.all.sort(),
            selectedLanguage: this.$i18n.locale,
            selectedTheme: this.$theme.current,
            mainColor: this.$theme.mainColor,
            fullscreen: this.$fullscreen.isFullscreen
        }
    },
    methods: {
        languageChange (newLanguage) {
            this.selectedLanguage = newLanguage;
            this.$i18n.locale = newLanguage;
            this.$ls.set('language', newLanguage);
            EventBus.emit('change-lang');
        },
        themeChange (newTheme) {
            this.selectedTheme = newTheme;
            this.$theme.current = newTheme;
            this.$ls.set('theme', newTheme);
        },
        mainColorChange (newColor) {
            this.mainColor = newColor;
            this.$theme.mainColor = newColor;
            this.$ls.set('main-color', newColor);
        }
    },
    watch: {
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
