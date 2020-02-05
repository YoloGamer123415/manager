<template>
    <div class="Input">
        <input
            type="text"
            :name="name"
            :id="id"
            :required="required ? 'required' : ''"
            :placeholder="example"
        />
        <label
            v-if="label"
            :for="id"
            v-text="label"
            :class="{ required }"
        />
    </div>
</template>

<script>
export default {
    name: "Input",
    props: {
        name: {
            type: String,
            required: false
        },
        id: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        example: {
            type: String,
            required: false
        },
        required: {
            type: Boolean,
            required: false
        },
    }
}
</script>

<style lang="scss" scoped>
$border: 2px;
$font: .75em;
$padding: .25em;
$time: .2s;

div.Input {
    position: relative;
    min-width: 300px;
    height: fit-content;
    user-select: none;

    label {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        max-width: calc(100% - 2 * (1em + #{$border}));
        max-height: calc(100% - 2 * #{$padding});
        padding: #{$padding} #{$padding * 2};
        border-radius: 5px;
        background-color: var(--current-theme-background);
        font-size: 1em;
        cursor: text;
        overflow: hidden;
        transition:
            width #{$time} ease,
            height #{$time} ease,
            top #{$time} ease,
            padding #{$time} ease,
            font-size #{$time} ease;
        
        &.required::after {
            content: '*';
            margin-left: .3em;
            color: var(--color-main);
        }
    }
    
    input {
        -webkit-appearance: none;
        width: calc(100% - 2 * #{$padding * 2});
        padding: #{$padding} #{$padding * 2};
        background-color: transparent;
        border: none;
        border-bottom: $border solid var(--color-inactive);
        color: var(--current-theme-text);
        font-size: 16px;
        outline: none;
        transition: border-color #{$time} ease;
        
        &:hover,
        &:focus,
        &:not(:placeholder-shown) {
            border-color: var(--color-main);
        }
        
        &:not(:focus)::-webkit-input-placeholder {
            color: transparent;
        }
    
        &:focus::-webkit-input-placeholder {
            color: change_color($color: #000, $lightness: 50%);
        }
    
        &:focus + label,
        &:not(:placeholder-shown) + label {
            top: -1em;
            left: $padding;
            width: fit-content;
            height: fit-content;
            padding: 0 #{$padding};
            font-size: $font;
        }
    }
}
</style>
