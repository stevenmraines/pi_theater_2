<template>
    <div class="form-group">
        <label for="summary">
            <span v-if="required">{{ '* ' }}</span>Summary
        </label>
        <textarea
            id="summary"
            class="form-control"
            rows="4"
            :value="summary"
            @change="eventDispatcher.$emit('summaryChange', summary)"
            :required="required"
        ></textarea>
        <div class="text-warning mb-3" v-if="required && false">
            The summary field is empty
        </div>
    </div>
</template>

<script>
    // TODO implement required warning
    export default {
        props: [
            'eventDispatcher',
            'required',
            'summary',
        ],
    }
</script>

<style scoped>

</style>