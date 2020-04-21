<template>
    <div id="Agenda" ref="agenda">
        <div
            class="fullscreen"
            ref="fullscreen"
            :style="{
                '--Appointment-color-foreground': view.color.foreground || view.color.background,
                '--Appointment-color-background': view.color.background
            }"
            @click="fullscreen()"
        >
            <div class="fullscreen-inner">
                <h1 v-text="view.title" />

                <div class="time">
                    <div class="icon">
                        <font-awesome-icon :icon="['far', 'clock']" />
                    </div>

                    <p class="text" v-text="view.time" />
                </div>

                <div v-if="view.location" class="location">
                    <div class="icon">
                        <font-awesome-icon icon="map-marker-alt" />
                    </div>

                    <p class="text" v-text="view.location" />
                </div>

                <div v-if="view.description" class="description">
                    <div class="i">
                        <font-awesome-icon icon="align-left" />
                    </div>

                    <p class="text" v-text="view.description" />
                </div>
            </div>
        </div>

        <Column class="column-1" :appointments="appointments.today" />
        <Column class="column-2" :appointments="appointments.tomorrow" />
        <Column class="column-3" :appointments="appointments.dayAfterTomorrow" />
    </div>
</template>

<script>
import EventBus from "@/EventBus";
import Column from "@/components/Agenda/Column";

export default {
    name: "Agenda",
    components: {Column},
    data() {
        return {
            scrollPos: { locked: false, y: 0 },
            view: {
                title: null,
                description: null,
                location: null,
                time: null,
                color: {
                    foreground: null,
                    background: null
                }
            },
            appointments: {
                today: [],
                tomorrow: [],
                dayAfterTomorrow: []
            },
            selectedCalendars: ['jorambuitenhuis@gmail.com']
        }
    },
    methods: {
        toggleScroll() {
            const agenda = this.$refs.agenda;

            if (this.scrollPos.locked) {
                agenda.classList.remove('fullscreen');
                agenda.scrollTo({
                    top: this.scrollPos.y,
                    left: 0
                });
            } else {
                this.scrollPos.y = agenda.scrollTop;

                agenda.scrollTo({
                    top: 0,
                    left: 0
                });
                agenda.classList.add('fullscreen');
            }

            this.scrollPos.locked = !this.scrollPos.locked;
        },

        formatTime(time) {
            let res = '';

            res += this.$t('time.calendar', {
                hours: time.start.getHours().toString().padStart(2, '0'),
                minutes: time.start.getMinutes().toString().padStart(2, '0')
            });

            res += ' - ';

            res += this.$t('time.calendar', {
                hours: time.end.getHours().toString().padStart(2, '0'),
                minutes: time.end.getMinutes().toString().padStart(2, '0')
            });

            return res;
        },

        fullscreen(data) {
            const fullscreen = this.$refs.fullscreen;

            this.toggleScroll();

            if (!data) {
                fullscreen.classList.remove('open');
            } else {
                fullscreen.classList.add('open');

                this.view.title = data.title;
                this.view.description = data.description;
                this.view.location = data.location;
                this.view.time = this.formatTime(data.time);
                this.view.color = data.color;

                this.$keystrokes.register('Escape', () => {
                    this.$keystrokes.remove('Escape');

                    fullscreen.classList.remove('open');
                });
            }
        }
    },
    async created() {
        // TODO: [API] verander de kleuren. Backcolor van calendar en backcolor van appointment.
        const TODAY = new Date();
        const DAYS = ['today', 'tomorrow', 'dayAfterTomorrow'];

        try {
            // TODO: kijk of het wel echt 3 keer moet (tel enz)
            for (let i = 0; i < 3; i++) {
                let startDate = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + i);
                let endDate = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + i + 1);
                let calendars = await this.$agenda.getAppointments(startDate, endDate);

                // TODO: make filters
                this.appointments[ DAYS[i] ] = calendars.filter(c => this.selectedCalendars.includes(c.id) )[0].appointments;
            }
        } catch (e) {
            // eslint-disable-next-line no-console
            console.warn(e);

            this.$notifications.newNotification({
                type: 'error',
                key: 'unknown'
            });
        }
    },
    mounted() {
        EventBus.on('appointment-fullscreen', this.fullscreen);
        // TODO: voeg het tijdaangeef lijntje toe en scroll er naar toe
    }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/mixins";

div#Agenda {
    position: relative;
    display: flex;
    flex-direction: row;

    &.fullscreen {
        overflow: hidden;
    }

    div.fullscreen {
        display: none;
    
        &.open {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            width: calc(100% - 1em);
            height: 100%;
            z-index: 100;
        }

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background-color: var(--current-theme-background);
            opacity: .5;
            z-index: -1;
        }

        /*
            TODO:
            gekleurde bars niet mee scrollen
            titel width 100%
        */
        div.fullscreen-inner {
            position: relative;
            width: 100%;
            max-height: 100%;
            padding: 1em 1em 1em 1.2em;
            background-color: var(--current-theme-lighter);
            color: var(--current-theme-text);
            box-shadow: 1px 3px 5px rgba($color: #000000, $alpha: .25);
            border-radius: 0 .2em .2em 0;
            overflow: auto;

            @include tabletAndDesktop {
                width: 35%;
                max-height: 75%;
            }

            &::before {
                content: '';
                position: absolute;
                top: -.75em;
                left: -.55em;
                border: .75em solid transparent;
                border-bottom-color: var(--Appointment-color-foreground);
                border-radius: 100%;
                transform: rotate(-45deg);
            }

            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                width: .2em;
                background-color: var(--Appointment-color-background);
            }

            h1 {
                display: table-cell;
                position: sticky;
                top: 0;
                left: 0;
                right: 0;
                background-color: var(--current-theme-lighter);
            }

            div.time,
            div.location,
            div.description {
                display: grid;
                grid-template-columns: 1.5em auto;
            }
        }
    }

    div.column-1 {
        display: block;
    }

    div.column-2,
    div.column-3 {
        display: none;
    }

    @include tablet {
        div.column-2 {
            display: block;
        }
    }

    @include desktop {
        div.column-2,
        div.column-3 {
            display: block;
        }
    }
}
</style>
