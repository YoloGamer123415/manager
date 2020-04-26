<template>
    <div class="SideAppointment">
        <div
            v-if="current && currentText"
            class="current"
            v-html="currentText"
        />

        <div class="next">
            <p v-if="!next" v-text="$t('text.calendar.no-next')" />

            <div v-else class="next-inner">
                <div class="text" v-html="nextText" />

                <div class="appointment">
                    <p class="title" v-text="next.title" />

                    <div class="time">
                        <div class="icon">
                            <font-awesome-icon :icon="['far', 'clock']" />
                        </div>

                        <p class="text" v-text="getTimeStartEnd()" />
                    </div>

                    <div v-if="next.location" class="location">
                        <div class="icon">
                            <font-awesome-icon icon="map-marker-alt" />
                        </div>

                        <p class="text" v-text="next.location" />
                    </div>

                    <div v-if="next.description" class="description">
                        <div class="i">
                            <font-awesome-icon icon="align-left" />
                        </div>

                        <p class="text" v-html="next.description" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SideAppointment',
    data() {
        return {
            current: null,
            next: null,
            currentText: null,
            nextText: null,
            timer: null
        }
    },
    methods: {
        getTimeStartEnd() {
            let res = '';

            res += this.$t('time.calendar.time', {
                hours: this.next.time.start.getHours().toString().padStart(2, '0'),
                minutes: this.next.time.start.getMinutes().toString().padStart(2, '0')
            });

            res += ' - ';

            res += this.$t('time.calendar.time', {
                hours: this.next.time.end.getHours().toString().padStart(2, '0'),
                minutes: this.next.time.end.getMinutes().toString().padStart(2, '0')
            });

            return res;
        },
    },
    async created() {
        // TODO: add correct calendar id
        this.current = await this.$agenda.getCurrent('jorambuitenhuis@gmail.com');
        this.next = await this.$agenda.getNext('jorambuitenhuis@gmail.com');

        this.timer = setInterval(() => {
            let d = new Date();

            let title = this.current.title;
            let endTimeMinutes = this.current.time.end.getHours() * 60 + this.current.time.end.getMinutes();
            let nowTimeMinutes = d.getHours() * 60 + d.getMinutes();
            let deltaTotalMinutes = endTimeMinutes - nowTimeMinutes;
            let deltaHours = ~~(deltaTotalMinutes / 60);
            let deltaMinutes = deltaTotalMinutes % 60;
            let time = deltaHours <= 0 ? 'minutes' : 'hours';

            this.currentText = this.$t(`time.calendar.current.${time}`, {
                appointment: `<i>${title}</i>`,
                hours: `<b>${deltaHours}</b>`,
                minutes: `<b>${deltaMinutes}</b>`
            });

            let startTimeMinutes = this.next.time.start.getHours() * 60 + this.current.time.start.getMinutes();
            let nextDeltaTotalMinutes = startTimeMinutes - nowTimeMinutes;
            let nextDeltaHours = ~~(nextDeltaTotalMinutes / 60);
            let nextDeltaMinutes = nextDeltaTotalMinutes % 60;
            let nextTime = nextDeltaHours <= 0 ? 'minutes' : 'hours';

            this.nextText = this.$t(`time.calendar.next.${nextTime}`, {
                hours: `<b>${nextDeltaHours}</b>`,
                minutes: `<b>${nextDeltaMinutes}</b>`
            });
        }, 1000);
    },
    beforeDestroy() {
        clearInterval(this.timer);
    }
}
</script>

<style lang="scss" scoped>
$padding: 1em;

div.SideAppointment {
    div.current {
        margin-bottom: 1em;
        text-align: center;
        font-size: 1.5em;
    }

    div.next {
        div.next-inner {
            div.text {
                font-size: 1.5em;
                text-align: center;
            }

            div.appointment {
                padding: $padding / 2 $padding;
                color: var(--current-theme-text);
                background-color: var(--current-theme-lighter);
                border-radius: .3em;
                cursor: pointer;

                p.title {
                    background-color: var(--current-theme-lighter);
                    font-size: 1.5em;
                    font-weight: bold;
                }

                div.time,
                div.location,
                div.description {
                    display: grid;
                    grid-template-columns: 1.5em auto;

                    margin-top: .25em;
                }
            }
        }
    }
}
</style>
