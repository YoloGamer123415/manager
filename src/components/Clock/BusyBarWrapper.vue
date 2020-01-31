<template>
    <div id="BusyBarWrapper">
        <div class="bar">
            <BusyBar :hours="hours" :is-today="isToday" />
        </div>

        <div class="day" v-text="$t(day)" />
    </div>
</template>

<script>
import BusyBar from "./BusyBar";

export default {
    name: "BusyBarWrapper",
    components: {BusyBar},
    props: {
        hours: Number,
        isToday: Boolean,
        day: String
    }
}
</script>

<style lang="scss" scoped>
$bar-height: 2em;

div#BusyBarWrapper {
    display: grid;
    grid-template:
        'bar' auto //calc(100% - #{$bar-height})
        'day' #{$bar-height}
        / 1fr;
    float: left;
    height: 100%;
    
    &:not(:first-of-type) {
        margin-left: 1.5em;
    }

    div.bar {
        grid-area: bar;
    }

    div.day {
        grid-area: day;
        display: flex;
        align-items: flex-end;
        justify-content: center;
    }
}
</style>
