<template>
    <div id="Home">
    
    </div>
</template>

<script>
export default {
    name: "Home",
    created() {
        this.$http.get(`${this.$apiEndpoint}/news`)
            .then(res => {
                // eslint-disable-next-line no-console
                console.log('wtf', res);
            });
    }
}
</script>

<style lang="scss" scoped>
div#Home {

}
</style>
+