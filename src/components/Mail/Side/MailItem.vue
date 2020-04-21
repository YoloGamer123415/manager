<template>
    <div
        class="MailItem"
        :style="{
            'background-color': $theme.current === 'dark' ? 'var(--current-theme-lighter)' : 'var(--current-theme-darker)'
        }"
        @click="clicked()"
    >
        <h1 class="subject" v-text="subject" />

        <p class="received" v-text="formatReveived()" />

        <p class="short" v-text="short" />

        <p class="from" v-html="formatFrom()" />
    </div>
</template>

<script>
import EventBus from "@/EventBus";

/**
 * Make the first letter of the given string uppercase;
 * 
 * @param {String} str The string to convert.
 * @returns {String}
 */
function firstLetterUpper([first, ...last]) {
    return first.toUpperCase() + last.join('');
}

export default {
    name: 'MailItem',
    props: {
        id: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            required: true
        },
        short: {
            type: String,
            required: true
        },
        received: {
            type: Date,
            required: true
        },
        from: {
            type: Object,
            required: true
        }
    },
    methods: {
        formatReveived() {
            const MONTHS = [ 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'november', 'december' ];
            let dayN = this.received.getDate();
            let month = MONTHS[this.received.getMonth()];
            let monthText = this.$t(`months.${month}.short`);

            return this.$t(`time.mail.short`, {
                dayN: dayN,
                month: monthText
            });
        },

        formatFrom() {
            const ELEM_COLOR = `<span style="color: var(--color-main);">X</span>`;
            const DELIM = this.from.name ? ['&lt;', '&gt;'] : ['', ''];
            let res = '';

            res += firstLetterUpper( this.$t('text.mail.from') );
            res += ' ';

            if (this.from.name)
                res += `${ELEM_COLOR.replace(/X/g, this.from.name)} `;

            res += DELIM[0];
            res += ELEM_COLOR.replace(/X/g, this.from.mail);
            res += DELIM[1];

            res += '.';

            return res;
        },

        clicked() {
            EventBus.emit('mail-view', this.id);
        }
    }
}
</script>

<style lang="scss" scoped>
div.MailItem {
    padding: 1em;
    border-radius: .3em;
    cursor: pointer;
}
</style>
