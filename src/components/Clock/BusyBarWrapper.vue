<template>
    <div id="BusyBarWrapper">
        <div class="bar">
            <BusyBar :size="size" :is-today="isToday" />
        </div>

        <div class="day" v-text="day" />
    </div>
</template>

<script>
import BusyBar from "./BusyBar";
export default {
    name: "BusyBarWrapper",
    components: {BusyBar},
    props: {
        size: Number,
        isToday: Boolean,
        day: String
    }
}
</script>

<style lang="scss" scoped>
div#BusyBarWrapper {
    grid-template:
        'bar' auto
        'day' 3em
        / 1fr;

    &:not(:first-of-type) {
        margin-left: 1em;
    }

    div.bar {
        grid-area: bar;
    }

    div.day {
        grid-area: day;
    }
}
</style>