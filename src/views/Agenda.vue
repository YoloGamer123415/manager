<template>
    <div id="Agenda" ref="agenda">
        <div
            class="fullscreen"
            ref="fullscreen"
            :style="{
                '--Appointment-color-foreground': color.foreground || color.background,
                '--Appointment-color-background': color.background
            }"
            @click="fullscreen()"
        >
            <div class="fullscreen-inner">
                <h1 v-text="title" />

                <div class="time">
                    <div class="icon">
                        <font-awesome-icon :icon="['far', 'clock']" />
                    </div>

                    <p class="text" v-text="time" />
                </div>

                <div v-if="location" class="location">
                    <div class="icon">
                        <font-awesome-icon icon="map-marker-alt" />
                    </div>

                    <p class="text" v-text="location" />
                </div>

                <div v-if="description" class="description">
                    <div class="i">
                        <font-awesome-icon icon="align-left" />
                    </div>

                    <p class="text" v-text="description" />
                </div>
            </div>
        </div>

        <Column />
        <Column />
        <Column />
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
            title: null,
            description: null,
            location: null,
            time: null,
            color: {
                foreground: null,
                background: null
            }
        }
    },
    mounted() {
        EventBus.on('appointment-fullscreen', this.fullscreen);
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

                this.title = data.title;
                this.description = data.description;
                this.location = data.location;
                this.time = this.formatTime(data.time);
                this.color = data.color;

                this.$keystrokes.register('Escape', () => {
                    this.$keystrokes.remove('Escape');

                    fullscreen.classList.remove('open');
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
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
            width: 35%;
            max-height: 75%;
            padding: 1em 1em 1em 1.2em;
            background-color: var(--current-theme-lighter);
            color: var(--current-theme-text);
            box-shadow: 1px 3px 5px rgba($color: #000000, $alpha: .25);
            border-radius: 0 .2em .2em 0;
            overflow: auto;

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
}
</style>
