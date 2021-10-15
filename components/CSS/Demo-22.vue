<template>
    <div>
        <div class="box1">Box1</div>
        <div class="box2">Box2</div>
        <div class="box3">Box3</div>
    </div>
</template>

<style scoped>
[class^='box'] {
    width: 200px;
    height: 50px;
    box-sizing: border-box;
    border-style: solid;
}
.box1 {
    border-width: 1px;
}
.box2 {
    border-width: 5px;
}
.box3 {
    border-width: 10px;
}
</style>