<template>
    <div id="Clock">
        <div class="time" v-html="time" />
        
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
            time: null
        }
    },
    mounted() {
        setInterval(() => {
            this.time = this.formatTime(new Date());
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
         * @returns {string}
         */
        formatTime(time) {
            let ret = '';
            const DAYS = [
                'days.sunday.long',
                'days.monday.long',
                'days.tuesday.long',
                'days.wednesday.long',
                'days.thursday.long',
                'days.friday.long',
                'days.saturday.long'
            ];
            const MONTHS = [
                'months.january.long',
                'months.february.long',
                'months.march.long',
                'months.april.long',
                'months.may.long',
                'months.june.long',
                'months.july.long',
                'months.august.long',
                'months.september.long',
                'months.october.long',
                'months.november.long',
                'months.december.long'
            ];
            
            let day = this.$t(DAYS[time.getDay()]);
            let dayN = time.getDate().toString();
            let month = this.$t(MONTHS[time.getMonth()]);
            let year = time.getFullYear().toString();
            let hours = time.getHours().toString().padStart(2, '0');
            let minutes = time.getMinutes().toString().padStart(2, '0');
            let seconds = time.getSeconds().toString().padStart(2, '0');
            
            ret += this.$t('time.day', { day, dayN, month, year });
            ret += '<br>';
            ret += this.$t('time.time', { hours, minutes, seconds });
            
            return ret;
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
    color: #ffffff;
    
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
