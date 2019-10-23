<template>
    <div class="form-group">
        <label for="filename">File</label>
        <select
            id="filename"
            class="form-control"
            v-model="filename"
        >
            <option
                v-for="file in files"
                v-bind:key="file"
                v-bind:value="file"
            >{{ file }}</option>
        </select>
    </div>
</template>

<script>
    export default {
        props: ['files'],

        data() {
            return {
                filename: this.files[0]
            };
        },
    }
</script>

<style scoped>

</style>