<template>
    <div id="Clock">
        <div class="time">
            <span v-text="$t('time.day', {
                day: $t(`days.${time.day}.long`),
                dayN: time.dayN,
                month: $t(`months.${time.month}.long`),
                year: time.year
            })" />
            
            <br>
            
            <span v-text="$t('time.time', {
                hours: time.hours,
                minutes: time.minutes,
                seconds: time.seconds
            })" />
        </div>
        
        <div class="busy-bars" ref="busyBars"></div>
    </div>
</template>

<script>
import Vue from "vue";
import BusyBarWrapper from "./BusyBarWrapper";
import i18n from "@/plugins/i18n";

export default {
    name: "Clock",
    data() {
        return {
            time: {
                seconds: null,
                minutes: null,
                hours: null,
                day: null,
                dayN: null,
                month: null,
                year: null
            }
        }
    },
    mounted() {
        setInterval(() => {
            this.formatTime(new Date());
        }, 500);

        const ELEMENT = Vue.extend(BusyBarWrapper);
        const DAYS = [
            'days.sunday.letter',
            'days.monday.letter',
            'days.tuesday.letter',
            'days.wednesday.letter',
            'days.thursday.letter',
            'days.friday.letter',
            'days.saturday.letter'
        ];
        const busyBars = this.$refs.busyBars;
        const today = new Date().getDay();

        for (let i = 0; i < 7; i++) {
            let day = (today + i) % 7;

            let instance = new ELEMENT({
                i18n,
                propsData: {
                    hours: 24,
                    isToday: i === 0,
                    day: DAYS[day]
                }
            });
            instance.$mount();
            busyBars.appendChild(instance.$el);
        }
    },
    methods: {
        /**
         * Format the time into a human readable format.
         * @param {Date} time
         */
        formatTime(time) {
            const DAYS = [
                'sunday',
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday'
            ];
            const MONTHS = [
                'january',
                'february',
                'march',
                'april',
                'may',
                'june',
                'july',
                'august',
                'september',
                'october',
                'november',
                'december'
            ];
            
            this.time.day = DAYS[time.getDay()];
            this.time.dayN = time.getDate().toString();
            this.time.month = MONTHS[time.getMonth()];
            this.time.year = time.getFullYear().toString();
            this.time.hours = time.getHours().toString().padStart(2, '0');
            this.time.minutes = time.getMinutes().toString().padStart(2, '0');
            this.time.seconds = time.getSeconds().toString().padStart(2, '0');
        }
    }
}
</script>

<style lang="scss" scoped>
$font-size: 1.5em;

div#Clock {
    display: grid;
    grid-template:
        'time' #{$font-size * 4}
        'bars' auto
        / 1fr;
    color: var(--current-theme-text);
    
    div.time {
        grid-area: time;
        text-align: center;
        font-size: $font-size;
    }
    
    div.busy-bars {
        grid-area: bars;
        display: flex;
        justify-content: center;
    }
}
</style>
