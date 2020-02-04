<template>
    <div class="Select">
        <div class="real-select" ref="realSelect">
            <div
                class="selected"
                :class="{
                    isOpen: isSelecting
                }"
                :data-value="selected.value"
                v-html="selected.text"
                @click="selectedClick"
            />

            <div
                class="options"
                ref="options"
            />
        </div>

        <select class="fake-select" ref="fakeSelect">
            <slot/>
        </select>
    </div>
</template>

<script>
    import Vue from "vue";
    import { TimelineLite } from "gsap";
    import Option from "./Option";
    import i18n from "@/plugins/i18n";

    export default {
        name: "Select",
        data() {
            return {
                selected: {
                    text: null,
                    value: null
                },
                isSelecting: false,
                timeline: new TimelineLite({ paused: true })
            }
        },
        mounted() {
            const OPTION = Vue.extend(Option);
            // const realSelect = this.$refs.realSelect;
            const options = this.$refs.options;
            const fakeSelect = this.$refs.fakeSelect;
            const selectOptions = this.$refs.options;
            let options = [];

            this.timeline.fromTo(
                options,
                1,
                {

                }, {

                }
            );

            this.selected.text = this.$refs.fakeSelect.options[ this.$refs.fakeSelect.selectedIndex ].text;
            this.selected.value = this.$refs.fakeSelect.options[ this.$refs.fakeSelect.selectedIndex ].value;

            for (let i = 0; i < fakeSelect.options.length; i++)
                options.push({
                    value: fakeSelect.options[i].value,
                    text: fakeSelect.options[i].text
                });

            options.forEach(option => {
                let instance = new OPTION({
                    i18n,
                    propsData: {
                        text: option.text,
                        value: option.value,
                        click: this.optionClick
                    }
                });

                instance.$mount();
                selectOptions.appendChild(instance.$el);
            });
        },
        methods: {
            selectedClick: function() {
                // eslint-disable-next-line no-console
                console.log("Selected click");

                this.isSelecting = !this.isSelecting;
            },
            optionClick: function (option) {
                // eslint-disable-next-line no-console
                console.log(`Option ${option} click`);
            }
        }
    }
</script>

<style lang="scss" scoped>
    $time: 3s;

    div.Select {
        div.real-select {
            cursor: pointer;

            background-color: blue;

            div.selected {


                &.isOpen + div.options {
                    max-height: fit-content;
                    padding: 0 1em;
                }
            }

            div.options {
                max-height: 0;
                padding: 0 1em;
                overflow: hidden;
                transition:
                    max-height #{$time} ease,
                    padding #{$time} ease;

                background-color: green;
            }
        }

        select.fake-select {
            display: none;
        }
    }
</style>
