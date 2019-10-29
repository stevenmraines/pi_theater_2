<template>
    <div class="form-group d-flex justify-content-around mt-3 mb-0">
        <button
            class="btn btn-success"
            v-if="true"
            @click.prevent.stop="submit"
        >
            Submit
        </button>
    </div>
</template>

<script>
    export default {
        props: ['eventDispatcher'],

        methods: {
            submit() {
                this.eventDispatcher.$emit('submit');
            },
        },
    }
</script>

<style scoped>

</style>