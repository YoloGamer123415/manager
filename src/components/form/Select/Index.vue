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
    import Option from "./Option";
    import i18n from "@/plugins/i18n";

    export default {
        name: "Select",
        data() {
            return {
                options: [],
                selected: {
                    text: null,
                    value: null
                },
                isSelecting: false,
            }
        },
        mounted() {
            const OPTION = Vue.extend(Option);
            // const realSelect = this.$refs.realSelect;
            const fakeSelect = this.$refs.fakeSelect;
            const selectOptions = this.$refs.options;

            this.selected.text = this.$refs.fakeSelect.options[ this.$refs.fakeSelect.selectedIndex ].text;
            this.selected.value = this.$refs.fakeSelect.options[ this.$refs.fakeSelect.selectedIndex ].value;

            for (let i = 0; i < fakeSelect.options.length; i++)
                this.options.push({
                    value: fakeSelect.options[i].value,
                    text: fakeSelect.options[i].text
                });

            this.options.forEach(option => {
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
            selectedClick: function () {
                this.isSelecting = !this.isSelecting;
            },
            optionClick: function (option) {
                this.isSelecting = !this.isSelecting;
                let selectionIndex = this.findSelectedIndex(option);

                if (selectionIndex >= 0) {
                    this.$refs.fakeSelect.selectedIndex = selectionIndex;
                    this.selected = option;
                }
            },
            findSelectedIndex: function (option) {
                let index = -1;
                
                this.options.forEach((opt, i) => {
                    if (opt.text === option.text && opt.value === option.value)
                        index = i;
                });
                
                return index;
            }
        }
    }
</script>

<style lang="scss" scoped>
    $padding: .5em;
    $border: 2px;
    $height: 2 * $padding + 1.2em; // about one option
    $time: 3s;

    div.Select {
        width: fit-content;
        min-width: 300px;
    
        div.real-select {
            position: relative;
            width: calc(100% - 2 * #{$padding * 2});
            padding: #{$padding} #{$padding * 2};
            background-color: var(--current-theme-background);
            border: $border solid var(--main-color);
            border-radius: 5px;
            cursor: pointer;

            div.selected.isOpen + div.options {
                height: fit-content;
                z-index: 100;
            }

            div.options {
                position: absolute;
                top: -$border;
                left: -$border;
                width: calc(100% + 2 * #{$border});
                height: 0;
                max-height: 6 * $height;
                border: 2px solid var(--main-color);
                border-radius: 5px;
                box-shadow: 1px 3px 5px 0 rgba($color: #000000, $alpha: .25);
                overflow: auto;
                z-index: -1;
            }
        }

        select.fake-select {
            display: none;
        }
    }
</style>
