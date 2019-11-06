<template>
    <image-file-input
        :event="'posterChange'"
        :eventDispatcher="eventDispatcher"
        :label="'Poster Image'"
        :required="true"
        :search="true"
        :title="title"
        :value="value"
    ></image-file-input>
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