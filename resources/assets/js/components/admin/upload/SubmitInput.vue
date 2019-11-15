<template>
    <div class="form-group d-flex justify-content-around mt-3 mb-0">
        <button
            class="btn btn-success"
            :class="{ 'btn-disabled': disabled }"
            :disabled="disabled"
            @click.prevent.stop="eventDispatcher.$emit('submit')"
        >
            Submit
        </button>
    </div>
</template>

<script>
    export default {
        props: [
            'disabled',
            'eventDispatcher',
        ],
    }
</script>

<style scoped>
    .btn-disabled {
        cursor: not-allowed;
    }
</style>