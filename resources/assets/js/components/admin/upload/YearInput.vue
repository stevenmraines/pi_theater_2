<template>
    <div class="form-group">
        <label for="year">
            * {{ label }}
            <a
                v-if="search"
                :href="'https://www.google.com/search?q=' + title + '+year+released'"
                target="_blank"
            >(search)</a>
        </label>
        <input
            type="number"
            id="year"
            class="form-control"
            min="1900"
            :max="max"
            :value="year"
            @change="eventDispatcher.$emit('yearChange', $event.target.value)"
            required
        />
    </div>
</template>

<script>
    export default {
        props: [
            'eventDispatcher',
            'label',
            'search',
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