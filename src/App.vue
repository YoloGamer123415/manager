<template>
    <div id="app">
        <Clock />

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
    background-color: $dark-color;
}

#app {
    display: grid;
    grid-template:
        'clock' 1fr
        'side' 2fr
        'navigation' auto
        / 1fr;
    gap: $gap;
    width: calc(100% - 2 * #{$gap});
    height: calc(100% - 2 * #{$gap});
    padding: $gap;
    
    @media only screen and (max-width: 1199px) {
        .view {
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
