<template>
    <div class="form-group">
        <label for="notes">Notes</label>
        <input
            id="notes"
            class="form-control font-italic"
            :value="notes"
            @change="eventDispatcher.$emit('notesChange', $event.target.value)"
        />
    </div>
</template>

<script>
    // TODO figure out how to do labels without IDs
    export default {
        props: [
            'eventDispatcher',
            'notes',
        ],
    }
</script>

<style scoped>

</style>