<template>
    <form action="">
        <p><input type="text" class="username"></p>
        <p><input type="password"></p>
        <p><input type="button" value="click me" class="btn"></p>
    </form>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    [class^="user"] {
        color: red;
    }

    [type$="word"] {
        color: green;
    }

    [class*="b"] {
        color: blue;
    }
</style>