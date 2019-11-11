<template>
    <year-input
        :event="'yearStartChange'"
        :eventDispatcher="eventDispatcher"
        :label="'Year Start'"
        :search="true"
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
    }
</script>