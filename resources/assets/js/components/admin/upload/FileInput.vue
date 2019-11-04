<template>
    <input
        type="file"
        @change="fileChange"
    />
</template>

<script>
    export default {
        props: {
            eventDispatcher: {
                type: Object,
                default: () => {},
            },
            value: {
                type: Array,
                default: () => [],
            },
        },

        methods: {
            fileChange(event) {
                var dataTransfer = event.dataTransfer || event.target;
                this.eventDispatcher.$emit('input', dataTransfer.files);
            },
        },
    }
</script>