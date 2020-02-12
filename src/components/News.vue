<template>
    <a
        class="News"
        target="_blank"
        :href="url"
        :title="title"
    >
        <img
            v-if="image"
            :src="image"
            :alt="title"
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
@import "src/assets/style/mixins";

a.News {
    position: relative;
    display: inline-block;
    padding: 1em;
    background-color: var(--current-theme-lighter);
    color: var(--current-theme-text) !important;
    border-radius: 5px;
    
    @include desktop {
        box-shadow: 0 0 0 0 rgba(#000000, 0.5);
        transition: box-shadow .3s ease;
        
        &:hover {
            text-decoration: none !important;
            box-shadow: 1px 3px 5px 0 rgba(#000000, 0.5);
        }
    }
    
    &:nth-child(even) {
        background-color: var(--current-theme-darker);
    }

    &:not(:last-of-type) {
        margin-bottom: 1.5em;
    }
}
</style>
