<template>
    <div id="Settings">
        <h1 class="settings">{{ $t('settings.title') }}</h1>
        
        <div class="setting language">
            <label for="language">{{ $t('settings.language') }}:</label>
            <select id="language" v-model="selectedLanguage">
                <option v-for="lang in languages.all" :key="lang" :value="lang">
                    {{ lang }}
                </option>
            </select>
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
            languages,
            selectedLanguage: this.$i18n.locale
        }
    },
    created() {
        this.$watch('selectedLanguage', newLang => {
            this.$i18n.locale = newLang;
            this.$ls.set('language', newLang);
            EventBus.emit('change-lang');
        });
    }
}
</script>

<style lang="scss" scoped>
div#Settings {
    color: #ffffff;
}
</style>
