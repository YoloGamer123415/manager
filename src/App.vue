<template>
    <div id="app">
        <div class="clock"></div>
        
        <div class="side"></div>
        
        <Navigation class="navigation" />
        
        <router-view class="view" />
    </div>
</template>

<script>
import Navigation from "@/components/Navigation";

export default {
    name: 'app',
    components: {
        Navigation
    }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Raleway|Roboto+Slab&display=swap');

$gap: 1em;
$dark-color: #252525;

* {
    font-family: 'Raleway', sans-serif;
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
    width: calc(100% - 2 * #{$gap});
    height: calc(100% - 2 * #{$gap});
    padding: $gap;
    gap: $gap;
    
    @media only screen and (min-width: 1200px) {
        grid-template:
            'clock view' 1fr
            'side view' 2fr
            'navigation view' auto
            / .25fr .75fr;
    }
    
    .clock {
        grid-area: clock;
        
        background-color: purple;
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
        background-color: blue;
    }
}
</style>
