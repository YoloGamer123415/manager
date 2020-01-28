<template>
    <div id="Clock">
        <div class="time" v-html="time"></div>
    </div>
</template>

<script>
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
    font-size: 2em;
}
</style>
