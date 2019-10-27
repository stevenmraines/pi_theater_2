<template>
    <div class="form-group">
        <label for="summary">* Summary</label>
        <textarea
            id="summary"
            class="form-control"
            rows="4"
            v-model="summary"
            v-on:change="eventDispatcher.$emit('summaryChange', summary)"
        ></textarea>
        <div class="text-warning mb-3" v-if="false">
            The summary field is empty
        </div>
    </div>
</template>

<script>
    // TODO pass bool for required?
    export default {
        props: ['eventDispatcher'],

        data() {
            return {
                summary: '',
            };
        },
    }
</script>

<style scoped>

</style>