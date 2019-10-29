<template>
    <div class="form-group">
        <label for="file">File</label>
        <select
            id="file"
            class="form-control"
            v-model="file"
            @change="eventDispatcher.$emit('fileChange', file)"
        >
            <option
                v-for="f in files"
                :key="f"
                :value="f"
            >{{ f }}</option>
        </select>
    </div>
</template>

<script>
    export default {
        props: ['files', 'eventDispatcher'],

        data() {
            return {
                file: this.files[0],
            };
        },
    }
</script>

<style scoped>

</style>