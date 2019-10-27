<template>
    <div class="form-group">
        <label for="notes">Notes</label>
        <input
            id="notes"
            class="form-control font-italic"
            name="notes"
            v-model="notes"
            v-on:change="eventDispatcher.$emit('notesChange', notes)"
        />
    </div>
</template>

<script>
    export default {
        props: ['eventDispatcher'],

        data() {
            return {
                notes: '',
            };
        },
    }
</script>

<style scoped>

</style>