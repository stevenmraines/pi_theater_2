<template>
    <year-input
        :event="'yearEndChange'"
        :eventDispatcher="eventDispatcher"
        :label="'Year End'"
        :max="max"
        :min="min"
        :search="false"
        :value="value"
    ></year-input>
</template>

<script>
    export default {
        props: [
            'eventDispatcher',
            'value',
        ],

        data() {
            return {
                max: new Date().getFullYear(),
                min: 0,
            };
        },
    }
</script>