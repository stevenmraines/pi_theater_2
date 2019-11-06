<template>
    <file-input
        :eventDispatcher="fileEventDispatcher"
        :label="label"
        :required="required"
        :value="value"
    ></file-input>
</template>

<script>
    export default {
        props: [
            'event',
            'eventDispatcher',
            'label',
            'required',
            'value',
        ],

        data() {
            return {
                fileEventDispatcher: new Vue({}),
            };
        },

        created() {
            this.fileEventDispatcher.$on('input', this.fileChange);
        },

        methods: {
            fileChange: function(fileList) {
                this.eventDispatcher.$emit(this.event, fileList);
            },
        },
    }
</script>