<template>
    <image-file-input
        :event="'jumbotronChange'"
        :eventDispatcher="eventDispatcher"
        :label="'Jumbotron Image'"
        :required="false"
        :search="false"
        :value="value"
    ></image-file-input>
</template>

<script>
    export default {
        props: [
            'eventDispatcher',
            'value',
        ],
    }
</script>