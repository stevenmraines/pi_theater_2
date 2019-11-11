<template>
    <year-input
        :event="'yearEndChange'"
        :eventDispatcher="eventDispatcher"
        :label="'Year End'"
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
    }
</script>