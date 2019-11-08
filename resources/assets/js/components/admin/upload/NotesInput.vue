<template>
    <div class="form-group">
        <label for="notes">Notes</label>
        <input
            id="notes"
            class="form-control font-italic"
            :value="value"
            @change="notesChange"
            @input="notesChange"
        />
    </div>
</template>

<script>
    // TODO figure out how to do labels without IDs
    export default {
        props: [
            'eventDispatcher',
            'value',
        ],

        methods: {
            notesChange(event) {
                this.eventDispatcher.$emit('notesChange', event.target.value);
            },
        },
    }
</script>