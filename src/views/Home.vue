<template>
    <div id="Home">
        <p>Home</p>
        
        <button @click="$notifications.newNotification({
            key: `error.unknown`
        })">yeet</button>
    </div>
</template>

<script>
export default {
    name: "Home"
}
</script>

<style lang="scss" scoped>
div#Home {

}
</style>
