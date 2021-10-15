<template>
    <div>
        <div>div标签</div>
        <h1>一级标题</h1>
        <h2>二级标题</h2>
        <p>段落p</p>
        <ul>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
        </ul>
        <ol>
            <li>首先</li>
            <li>接着</li>
            <li>最终</li>
        </ol>

        <span>span标签</span>
        <a href="#">a标签</a>
        <code>code标签</code>
        <label for="#">label标签</label>
    </div>
</template>

<style scoped>
ul, ol, li {
    padding: 0;
    margin: 0;
}
div, h1, h2, p, ul, ol, li {
    display: inline;
}
span, a, code, label {
    display: block;
}
</style>