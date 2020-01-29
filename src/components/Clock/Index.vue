<template>
    <div id="Clock">
        <div class="time" v-html="time" />
        
        <div class="busy-bars" ref="busyBars">

        </div>
    </div>
</template>

<script>
import Vue from "vue";
import BusyBarWrapper from "./BusyBarWrapper";

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
        const DAYS = [ 'Z', 'M', 'D', 'W', 'D', 'V', 'Z' ];
        const busyBars = this.$refs.busyBars;
        const today = new Date().getDay();

        for (let i = 0; i < 7; i++) {
            let day = (today - 1) % 7;

            let instance = new ELEMENT({
                propsData: {
                    size: 0,
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
            const DAYS = [ 'Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag' ];
            const MONTHS = [ 'januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december' ];
            
            ret += `${DAYS[time.getDay()]} `;
            ret += `${time.getDate().toString()} `;
            ret += `${MONTHS[time.getMonth()]} `;
            ret += time.getFullYear();
            ret += '<br>';
            ret += time.getHours().toString().padStart(2, '0');
            ret += `:${time.getMinutes().toString().padStart(2, '0')}`;
            ret += `:${time.getSeconds().toString().padStart(2, '0')}`;
            
            return ret;
        }
    }
}
</script>

<style lang="scss" scoped>
div#Clock {
    font-size: 1.5em;
    color: #ffffff;
    text-align: center;
}
</style>
