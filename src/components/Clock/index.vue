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
        
        <!-- <div class="busy-bars" ref="busyBars" /> -->

        <div class="busy-bars">
            <BusyBarWrapper
                v-for="n in 7"
                :key="n"
                :n="n - 1" 
            />
        </div>
    </div>
</template>

<script>
import EventBus from "@/EventBus";
import BusyBarWrapper from "./BusyBarWrapper";

export default {
    name: "Clock",
    components: {BusyBarWrapper},
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
    created() {
        setInterval(() => {
            this.formatTime(new Date());
        }, 500);

        this.$agenda.getBusy()
            .then(hours => {
                EventBus.emit('busy', hours);
            })
            .catch(err => {
                //eslint-disable-next-line no-console
                console.warn(err);

                this.$notifications.newNotification({
                    type: 'error',
                    key: 'unknown'
                });
            });
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
