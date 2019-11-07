<template>
    <div class="form-group d-flex justify-content-around mt-3 mb-0">
        <button
            class="btn"
            :class="{ 'btn-secondary': disabled, 'btn-success': !disabled }"
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