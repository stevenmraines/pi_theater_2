<template>
    <div class="form-group">
        <label for="year-released">Year Released
            <a
                v-bind:href="'https://www.google.com/search?q=' + title + '+year+released'"
                target="_blank"
            >(search)</a>
        </label>
        <input
            type="number"
            id="year-released"
            class="form-control"
            min="1900"
            v-bind:max="currentYear"
            v-model="yearReleased"
            required
        />
    </div>
</template>

<script>
    export default {
        props: ['yearReleased', 'title'],

        data() {
            return {
                currentYear: new Date().getFullYear()
            };
        }
    }
</script>

<style scoped>

</style>