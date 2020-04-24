<template>
    <div class="MailSide">
        <div class="info">
            <div class="read">
                <font-awesome-icon :icon="['far', 'envelope-open']" class="icon" />

                <span v-text="$t('text.mail.mark')" />
            </div>

            <div class="unread" v-html="formatUnread()" />
        </div>

        <div class="items">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: 'MailSide',
    props: {
        unread: {
            type: Number,
            required: true
        }
    },
    methods: {
        formatUnread() {
            let formatted = this.$t('text.mail.unread', {
                total: this.unread
            });

            return formatted.replace(/\d+/g, '<b>$&</b>')
        }
    }
}
</script>

<style lang="scss" scoped>
div.MailSide {
    div.info {
        position: sticky;
        top: 0;
        display: table;
        width: calc(100% - 2 * 1em);
        padding: .5em 1em;
        background-color: var(--current-theme-darker);
        border-radius: .3em;

        div.read {
            float: left;

            .icon {
                margin-right: .5em;
            }
        }

        div.unread {
            float: right;
        }
    }

    div.items {
        margin-top: 1em;

        > *:not(:first-of-type) {
            margin-top: 1em;
        }
    }
}
</style>
