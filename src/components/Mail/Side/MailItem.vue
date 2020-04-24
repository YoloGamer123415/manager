<template>
    <div
        class="MailItem"
        :style="{
            'background-color': $theme.current === 'dark' ? 'var(--current-theme-lighter)' : 'var(--current-theme-darker)'
        }"
        @click="clicked()"
    >
        <p class="subject" v-text="subject" />

        <div v-if="files.length > 0" class="files">
            <span
                v-for="file in files"
                :key="file.id"
                class="file"
            >
                <font-awesome-icon :icon="['far', 'file']" class="icon" />

                {{ file.name }}
            </span>
        </div>

        <p class="received" v-text="formatReveived()" />

        <p
            v-if="preview"
            class="short"
            v-html="`${preview}...`"
        />

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
        received: {
            type: Date,
            required: true
        },
        from: {
            type: Object,
            required: true
        },
        preview: {
            type: String,
            required: false
        },
        files: {
            type: Array,
            required: true
        },
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

    p.subject {
        font-size: 2em;
        font-weight: bold;
    }

    div.files {
        margin: 1em 0;
        font-size: .75em;

        span.file {
            padding: .25em 1em;
            border: .1em solid #aaaaaa;
            border-radius: 100px;

            .icon {
                margin-right: .3em;
            }
        }
    }
}
</style>
