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

div.Input {
    position: relative;
    width: fit-content;
    height: fit-content;
    
    label {
        position: absolute;
        top: $border;
        left: $border;
        display: flex;
        align-items: center;
        max-width: calc(100% - 2 * (1em + #{$border}));
        max-height: calc(100% - 2 * (.5em + #{$border}));
        padding: .5em 1em;
        border-radius: 5px;
        background-color: var(--current-theme-background);
        font-size: 1em;
        cursor: text;
        overflow: hidden;
        transition:
            width .3s ease,
            height .3s ease,
            top .3s ease,
            padding .3s ease,
            font-size .3s ease;
        
        &.required::after {
            content: '*';
            margin-left: .3em;
            color: var(--main-color);
        }
    }
    
    input {
        -webkit-appearance: none;
        padding: .5em 1em;
        background-color: transparent;
        border: $border solid var(--inactive-color);
        border-radius: 5px;
        color: var(--current-theme-text);
        font-size: 16px;
        outline: none;
        transition: border-color .3s ease;
        
        &:focus {
            border-color: var(--main-color);
        }
        
        &:not(:focus)::-webkit-input-placeholder {
            color: transparent;
        }
    
        &:focus::-webkit-input-placeholder {
            color: change_color($color: #000, $lightness: 50%);
        }
    
        &:focus + label,
        &:not(:placeholder-shown) + label {
            top: calc(-.5em - .5 * (.5em - #{$border}));
            left: .5em;
            width: fit-content;
            height: fit-content;
            padding: 0 .5em;
            font-size: $font;
        }
    }
}
</style>
