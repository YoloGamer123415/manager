<template>
    <div id="BusyBarWrapper">
        <div class="bar">
            <BusyBar :busy="busy" :is-today="n === 0" />
        </div>

        <div class="busy" v-text="busy" />

        <div
            v-if="day"
            class="day"
            :class="{ today: n === 0 }"
            v-text="$t(`days.${day}.letter`)"
        />
    </div>
</template>

<script>
import BusyBar from "./BusyBar";
import EventBus from "@/EventBus";

export default {
    name: "BusyBarWrapper",
    components: {BusyBar},
    props: {
        n: Number,
    },
    data() {
        return {
            day: null,
            busy: null,
        }
    },
    created() {
        EventBus.on('busy', nums => {
            this.busy = nums[this.n];
        });

        const DAYS = [
            'sunday',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday'
        ];
        
        let today = ( (new Date).getDate() + this.n ) % 7;

        this.day = DAYS[today];
    }
}
</script>

<style lang="scss" scoped>
$bar-height: 2em;

div#BusyBarWrapper {
    display: grid;
    grid-template:
        'bar' auto //calc(100% - #{$bar-height})
        'busy' #{$bar-height}
        'day' #{$bar-height}
        / 1em;
    float: left;
    height: 100%;
    
    &:not(:first-of-type) {
        margin-left: 1.5em;
    }

    div.bar {
        grid-area: bar;
        display: flex;
        justify-content: center;
    }

    div.busy {
        grid-area: busy;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        font-size: .9em;
    }

    div.day {
        grid-area: day;
        display: flex;
        align-items: flex-end;
        justify-content: center;

        &:not(.today) {
            opacity: .5;
        }
    }
}
</style>
