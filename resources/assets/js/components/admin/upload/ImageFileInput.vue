<template>
    <div>
        <div class="form-group">
            <label for="video-file">
                <span v-if="required">* </span>
                {{ label }}
            </label>
            <file-input
                id="video-file"
                class="form-control-file"
                :eventDispatcher="fileEventDispatcher"
                :required="required"
                :value="value"
            ></file-input>
        </div>
        <div class="text-danger mb-3" v-if="false">
            The poster image is required
        </div>
    </div>
</template>

<script>
    // TODO implement required warning message
    // TODO implement optional search with title
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