<template>
    <div class="form-group">
        <label for="summary">
            <span v-if="required">* </span>Summary
        </label>
        <textarea
            id="summary"
            class="form-control"
            rows="4"
            :value="summary"
            @change="eventDispatcher.$emit('summaryChange', $event.target.value)"
        ></textarea>
    </div>
</template>

<script>
    // TODO figure out how to do labels without IDs
    export default {
        props: [
            'eventDispatcher',
            'required',
            'summary',
        ],
    }
</script>