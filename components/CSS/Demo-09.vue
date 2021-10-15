<template>
    <div>
        <a href="http://www.bilibili.com" target="_blank">bilibili</a>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    a:link {
        /* 未访问时，颜色为红色 */
        color: red;
    }
    a:visited {
        /* 访问之后，颜色为绿色 */
        color: green;
    }
    a:hover {
        /* 鼠标放上去时，颜色为粉色 */
        color: pink;
    }
    a:active {
        /* 鼠标点击不放的过程中，颜色为蓝色 */
        color: blue;
    }
</style>