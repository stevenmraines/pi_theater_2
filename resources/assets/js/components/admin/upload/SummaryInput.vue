<template>
    <div class="form-group">
        <label :for="id">
            <span v-if="required">* </span>Summary
        </label>
        <textarea
            :id="id"
            class="form-control"
            rows="4"
            :value="value"
            @change="summaryChange"
            @input="summaryChange"
        ></textarea>
    </div>
</template>

<script>
    // TODO figure out how to do labels without IDs
    export default {
        props: [
            'eventDispatcher',
            'required',
            'value',
        ],

        data() {
            return {
                id: null
            }
        },

        mounted() {
            this.id = this._uid;
        },

        methods: {
            summaryChange(event) {
                this.eventDispatcher.$emit('summaryChange', event.target.value);
            },
        },
    }
</script>