<template>
    <div
        class="Option"
        @click="click({ text, value })"
    >
        <div
            class="text"
            v-text="text"
            :data-value="value"
        />
    </div>
</template>

<script>
export default {
    name: "Option",
    props: {
        text: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        },
        click: {
            type: Function,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
$opacity: .25;

div.Option {
    position: relative;
    cursor: pointer;
    padding: .5em 1em;
    background-color: transparent;
    border-bottom: 2px solid var(--main-color);
    
    &:first-of-type {
        border-radius: 5px 5px 0 0;
    }
    
    &:last-of-type {
        border-radius: 0 0 5px 5px;
        border-bottom: none;
    }
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: var(--current-theme-background);
        z-index: -2;
    }
    
    /* TODO: gaan we dit nog anders doen? */
    @media only screen and (min-width: 1200px) {
        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background-color: var(--main-color);
            opacity: 0;
            transition: opacity .3s ease;
            z-index: -1;
        }
        
        &:hover::after {
            opacity: $opacity;
        }
    }
}
</style>
