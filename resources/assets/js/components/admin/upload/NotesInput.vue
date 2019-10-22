<template>
    <div class="form-group">
        <label for="notes">Notes</label>
        <input
            id="notes"
            class="form-control font-italic"
            name="notes"
            v-model="notes"
        />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                notes: '',
            };
        },
    }
</script>

<style scoped>

</style>