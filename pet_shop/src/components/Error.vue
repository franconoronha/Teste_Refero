<template>
    <div id="error">
        <p>{{ errorMsg }}</p>
    </div>
</template>

<script>
export default {
    name: "Error",
    props: ["errorMsg"]
}
</script>

<style lang="scss" scoped>
    #error {
        font-family: 'Verdana';
        margin-bottom: 5px;
        border-radius: 10px;
        border: 2px solid red;
        padding: 20px;
    }
</style>