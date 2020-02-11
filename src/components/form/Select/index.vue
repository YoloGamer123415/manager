<template>
    <div class="Select">
        <label
            :for="id"
            :class="{
                required
            }"
            v-text="label"
        />
    
        <div
            class="real-select"
            :class="{
                isOpen: isSelecting
            }"
            ref="realSelect"
        >
            <!-- TODO: liever click event op elem hierboven... -->
            <div
                class="selected"
                :data-value="selected.value"
                v-html="selected.text"
                @click="selectedClick"
            />

            <div
                class="options"
                ref="options"
            />
        </div>
    
        <select
            :id="id"
            class="fake-select"
            ref="fakeSelect"
            @input="change"
        >
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
        props: {
            id: {
                type: String,
                required: true
            },
            label: {
                type: String,
                required: true
            },
            required: {
                type: Boolean,
                required: false,
                default: false
            }
        },
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
            },
            change () {
                this.$emit('change', data);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/style/mixins";
    
    $padding: .5em;
    $border: 2px;
    $height: 2 * $padding + 1.2em; // about one option
    $scroll-width: 7px;

    div.Select {
        width: fit-content;
        min-width: 300px;
        user-select: none;
    
        label {
            display: inline-block;
            width: fit-content;
            padding: 0 #{$padding};
            margin-bottom: .25em;
            font-size: .75em;
    
            &.required::after {
                content: '*';
                margin-left: .3em;
                color: var(--color-main);
            }
        }
    
        div.real-select {
            position: relative;
            width: calc(100% - 2 * #{$border});
            background-color: var(--current-theme-background);
            border: $border solid var(--color-inactive);
            border-radius: 5px;
            cursor: pointer;
            
            &::after {
                content: '';
                position: absolute;
                top: 50%;
                right: 1em;
                border: 5px solid transparent;
                border-top-color: var(--color-inactive);
                transform:
                    translateY(-25%)
                    rotate(0deg);
                transition: transform .3s ease;
            }
            
            &.isOpen {
                border-radius: 5px 5px 0 0;
                
                &::after {
                    transform:
                        translateY(calc(-25% - 5px))
                        rotate(180deg);
                }
    
                div.selected + div.options {
                    max-height: 6 * $height;
                    border: 2px solid var(--color-main);
                    z-index: 100;
                }
            }
            
            div.selected {
                padding: #{$padding} #{$padding * 2};
            }
            
            @include desktop {
                transition: border-color .3s ease;
                
                &:hover,
                &.isOpen {
                    border-color: var(--color-main);
                }
            }

            div.options {
                position: absolute;
                top: 100%;
                left: -$border;
                width: 100%;
                max-height: 0;
                border: none;
                border-radius: 0 0 5px 5px;
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
