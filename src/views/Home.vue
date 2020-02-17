<template>
    <div id="Home" ref="home">
        <Loader ref="loader" />
    </div>
</template>

<script>
import Vue from "vue";
import News from "../components/News";
import Loader from "../components/Loader";

export default {
    name: "Home",
    components: {Loader},
    created() {
        const ELEMENT = Vue.extend(News);

        // this.$http.get(`/news`)
        this.$news.get()
            .then(news => {
                let totalNews = news.length;

                for (let i = 0; i < totalNews; i++) {
                    let newsItem = news[i];
                    let elem = document.createElement('div');

                    this.$refs.home.appendChild(elem);

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
            })
            .catch(err => {
                this.$notifications.newNotification({
                    key: 'network',
                    type: 'error'
                });
                // eslint-disable-next-line no-console
                console.error(err);
            });
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
div#Home {
    position: relative;
}
</style>
