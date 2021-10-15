<template>
    <div class="box">
        <slot></slot>
    </div>
</template>

<style scoped>
.box {
    width: 100%;
    padding: 25px 35px;
    background-color: white;
    border: 1px solid #eee;
    box-sizing: border-box;
    border-radius: 3px;
    user-select: none;
}
</style>