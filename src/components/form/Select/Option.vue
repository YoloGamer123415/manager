<template>
    <div class="Option">
        <div
            class="text"
            v-text="text"
            :data-value="value"
            @click="click(value)"
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
div.Option {
    cursor: pointer;

    background-color: red;
}
</style>
