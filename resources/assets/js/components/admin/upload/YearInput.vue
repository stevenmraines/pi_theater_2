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
            v-bind:max="max"
            v-bind:value="year"
            v-on:change="eventDispatcher.$emit('yearChange', year)"
            required
        />
    </div>
</template>

<script>
    // TODO separate search into separate component? Or pass bool?
    export default {
        props: [
            'eventDispatcher',
            'label',
            'title',
            'year',
        ],

        data() {
            return {
                max: new Date().getFullYear(),
            };
        },
    }
</script>

<style scoped>

</style>