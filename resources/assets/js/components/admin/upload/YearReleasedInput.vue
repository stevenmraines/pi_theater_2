<template>
    <year-input
        :event="'yearReleasedChange'"
        :eventDispatcher="eventDispatcher"
        :label="'Year Released'"
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