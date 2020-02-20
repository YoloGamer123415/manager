<template>
    <div
        id="Home"
        ref="home"
        :class="{ loading }"
    >
        <Loader ref="loader" />
        
        <div
            class="news-wrapper"
            ref="news"
        />
    </div>
</template>

<script>
import Vue from "vue";
import News from "../components/News";
import Loader from "../components/Loader";

export default {
    name: "Home",
    components: {Loader},
    data() {
        return {
            loading: true
        }
    },
    mounted() {
        if (
            !this.$ls.get('save-data') ||
                this.$ls.get('save-data') === false
        ) {
            const ELEMENT = Vue.extend(News);
    
            // this.$http.get(`/news`)
            this.$news.get()
                .then(news => {
                    let totalNews = news.length;
    
                    for (let i = 0; i < totalNews; i++) {
                        let newsItem = news[i];
                        let elem = document.createElement('div');
    
                        this.$refs.news.appendChild(elem);
    
                        let instance = new ELEMENT({
                            propsData: {
                                image: newsItem.image,
                                title: newsItem.title,
                                text: newsItem.description,
                                url: newsItem.url,
                                author: newsItem.author,
                                source: newsItem.source
                            }
                        });
    
                        instance.$mount(elem);
                    }
                    
                    this.$refs.loader.$emit('stop');
                    this.loading = false;
                })
                .catch(err => {
                    this.$notifications.newNotification({
                        key: 'network',
                        type: 'error'
                    });
                    // eslint-disable-next-line no-console
                    console.error(err);
                });
        } else {
            let elem = document.createElement('div');
            elem.classList.add('save-data');
            elem.style.color = `var(--current-theme-text)`;
            
            elem.style.display = 'flex';
            elem.style.alignItems = elem.style.justifyContent = 'center';
            elem.style.width = elem.style.height = '100%';
            elem.style.textAlign = 'center';
            
            let wrapper = document.createElement('div');
            
            let title = document.createElement('h1');
            title.innerHTML = this.$t('text.save-data.title', [
                `<span style="color: var(--color-main)">${ this.$t('text.save-data.on') }</span>`
            ]);
            
            let text = document.createElement('p');
            text.innerText = this.$t('text.save-data.text');
            
            wrapper.appendChild(title);
            wrapper.appendChild(text);
            
            elem.appendChild(wrapper);
            
            this.$refs.home.appendChild(elem);

            this.$refs.loader.$emit('stop');
            this.loading = false;
        }
    },
    methods: {
        /**
         *
         * @param {number | string} id
         * @return {string}
         */
        parseId (id) {
            //               0123456789
            const LETTERS = 'abcdefghij';
            let ret = '';

            if (typeof id == "number")
                id = id.toString();

            for (let i = 0; i < id.length; i++)
                ret += LETTERS[parseInt(id[i])];

            return ret;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/mixins";

div#Home {
    position: relative;
 
    &:not(.loading) {
        div.news-wrapper {
            width: 100%;
            column-count: 1;
            column-gap: 1em;
            grid-template-columns: 100%;
        
            @include tablet {
                column-count: 2;
            }
        
            @include desktop {
                column-count: 3;
            }
        
            .News {
                display: inline-block;
            }
        }
    }
}
</style>
