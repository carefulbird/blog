<template>
    <div>
        <div class="box1">Box1</div>
        <div class="box2">Box2</div>
        <div class="box3">Box3</div>
        <div class="box4">Box4</div>
    </div>
</template>

<style scoped>
[class^='box'] {
    width: 200px;
    height: 50px;
}
.box1 {
    border-style: solid;
}
.box2 {
    border-style: dashed;
}
.box3 {
    border-style: dotted;
}
.box4 {
    border-style: double;
}
</style>