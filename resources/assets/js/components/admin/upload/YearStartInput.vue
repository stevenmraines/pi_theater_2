<template>
    <year-input
        :event="'yearStartChange'"
        :eventDispatcher="eventDispatcher"
        :label="'Year Start'"
        :max="max"
        :min="min"
        :title="title"
        :value="value"
    ></year-input>
</template>

<script>
    export default {
        props: [
            'eventDispatcher',
            'title',
            'value',
        ],

        data() {
            return {
                max: new Date().getFullYear(),
                min: 1900,
            };
        },
    }
</script>