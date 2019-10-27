<template>
    <div class="form-group">
        <label for="year">
            * {{ label }}
            <a
                v-bind:href="'https://www.google.com/search?q=' + title + '+year+released'"
                target="_blank"
            >(search)</a>
        </label>
        <input
            type="number"
            id="year"
            class="form-control"
            min="1900"
            v-bind:max="currentYear"
            v-model="year"
            v-on:change="eventDispatcher.$emit('yearChange', year)"
            required
        />
    </div>
</template>

<script>
    // TODO separate search into separate component? Or pass bool?
    // TODO does this need a default? Or can this and the data in MovieForm just be initialized separately?
    export default {
        props: [
            'default',
            'eventDispatcher',
            'label',
            'title',
        ],

        data() {
            return {
                currentYear: new Date().getFullYear(),
                year: this.default,
            };
        },
    }
</script>

<style scoped>

</style>