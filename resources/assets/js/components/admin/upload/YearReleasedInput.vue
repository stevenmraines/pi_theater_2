<template>
    <year-input
        :event="'yearReleasedChange'"
        :eventDispatcher="eventDispatcher"
        :label="'Year Released'"
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