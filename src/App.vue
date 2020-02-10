<template>
    <div
        id="app"
        ref="app"
        :class="{ isHome: $route.name === 'home' }"
    >
        <Notifications />
        
        <Clock class="clock" />

        <div class="side"></div>
        
        <Navigation class="navigation" />
        
        <router-view class="view" />
    </div>
</template>

<script>
import "@/assets/style/colors.scss";
import Navigation from "@/components/Navigation";
import Clock from "./components/Clock/index";
import Notifications from "@/components/Notifications/index";

export default {
    name: 'app',
    components: {
        Notifications,
        Clock,
        Navigation
    },
    created() {
        this.$http.setToken('TestToken');

        if (!this.$ls.get('language')) {
            this.$ls.set('language', this.$i18n.locale);
        }
        
        this.$ls.on('language', newLang => {
            this.$i18n.locale = newLang;
        });
    }
}
</script>

<style lang="scss">
@import "assets/style/mixins";

@import url('https://fonts.googleapis.com/css?family=Open+Sans|Roboto+Slab&display=swap');

$gap: 1em;

::-webkit-scrollbar {
    width: 7px;
    height: 7px;
    background-color: transparent;
}

::-webkit-scrollbar-thumb {
    background-color: var(--current-theme-scrollbar);
    border-radius: 100px;
}

::-webkit-scrollbar-corner {
    display: none;
}

* {
    font-family: 'Open Sans', sans-serif;
    line-height: 1.6;
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
    padding: $gap 0 $gap $gap;

    @include phone {
        &.isHome {
            grid-template:
                'clock' 1fr
                'side' 2fr
                'navigation' auto
                / 100%;
        }
        
        &:not(.isHome) {
            grid-template:
                'view' 1fr
                'navigation' auto
                / 100%;
        }
        
        &.isHome .view {
            display: none;
        }
        
        &:not(.isHome) .clock,
        &:not(.isHome) .side {
            display: none;
        }
    }
    
    @include tablet {
        grid-template:
            'clock view' 1fr
            ' side view' 2fr
            'navigation view' auto
            / 50% 50%;
    }
    
    @include desktop {
        grid-template:
            'clock view' 1fr
            'side view' 2fr
            'navigation view' auto
            / 25% 75%;
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
        padding-right: $gap;
        overflow: auto;
    }

    a {
        color: var(--color-main);
        
        @include desktop {
            text-decoration: none;
            transition: text-decoration .3s ease;
            
            &:hover {
                text-decoration: underline;
            }
        }
    }
}
</style>
