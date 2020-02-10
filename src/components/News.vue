<template>
    <a
        class="News"
        :href="url"
    >
        <h1
            v-if="title"
            class="title"
            v-text="title"
        />

        <p
            class="text"
            v-text="text"
        >
            <slot />
        </p>
    </a>
</template>

<script>
export default {
    name: "News",
    props: {
        image: {
            type: String,
            required: false
        },
        title: {
            type: String,
            required: false
        },
        text: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: false
        },
        source: {
            type: String,
            required: false
        }
    }
}
</script>

<style lang="scss" scoped>
a.News {
    color: var(--current-theme-text) !important;

    &:not(:last-of-type) {
        margin-bottom: 1.5em;
    }
}
</style>
