<template>
    <div
        id="app"
        ref="app"
        :class="{ isHome: $route.name === 'home' }"
    >
        <Clock class="clock" />

        <div class="side"></div>
        
        <Navigation class="navigation" />
        
        <router-view class="view" />
    </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import Clock from "./components/Clock/Index";

export default {
    name: 'app',
    components: {
        Clock,
        Navigation
    },
    mounted() {
        if (!this.$ls.get('language')) {
            this.$ls.set('language', this.$i18n.locale);
        }
        
        this.$ls.on('language', newLang => {
            this.$i18n.locale = newLang;
        })
    }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans|Roboto+Slab&display=swap');

$gap: 1em;
$main-color: #00E6E6;
$dark-color: #252525;

:root {
    --main-color: #{$main-color};
    --theme-light-text: #{$dark-color};
    --theme-light-background: #ffffff;
    --theme-dark-text: #ffffff;
    --theme-dark-background: #{$dark-color};
    --current-theme-text: var(--theme-dark-text);
    --current-theme-background: var(--theme-dark-background);
}

* {
    font-family: 'Open Sans', sans-serif;
    line-height: 1.4;
    margin: 0;
    padding: 0;
}

@for $i from 1 through 6 {
    h#{$i} {
        font-family: 'Roboto Slab', serif;
    }
}

html, body {
    width: 100vw;
    height: 100vh;
    background-color: var(--current-theme-background);
    transition: background-color .3s ease;
}

#app {
    display: grid;
    
    gap: $gap;
    width: calc(100% - 2 * #{$gap});
    height: calc(100% - 2 * #{$gap});
    padding: $gap;
    
    @media only screen and (max-width: 1199px) {
        &.isHome {
            grid-template:
                'clock' 1fr
                'side' 2fr
                'navigation' auto
                / 1fr;
        }
        
        &:not(.isHome) {
            grid-template:
                'view' 1fr
                'navigation' auto
                / 1fr;
        }
        
        &.isHome .view {
            display: none;
        }
        
        &:not(.isHome) .clock,
        &:not(.isHome) .side {
            display: none;
        }
    }
    
    @media only screen and (min-width: 1200px) {
        grid-template:
            'clock view' 1fr
            'side view' 2fr
            'navigation view' auto
        / .25fr .75fr;
    }
    
    .clock {
        grid-area: clock;
    }
    
    .side {
        grid-area: side;
        
        background-color: green;
    }
    
    .navigation {
        grid-area: navigation;
    }
    
    .view {
        grid-area: view;
    }
}
</style>
