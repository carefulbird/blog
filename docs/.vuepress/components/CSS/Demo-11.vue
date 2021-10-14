<<template>
    <div>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
        </ul>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    li:nth-child(n + 2) {
        color: red;
    }
</style>