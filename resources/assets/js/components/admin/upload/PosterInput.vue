<template>
    <div>
        <div class="form-group">
            <label for="poster">* Poster Image
                <a
                    :href="'https://www.google.com/search?q=' + title + '+poster&tbm=isch'"
                    target="_blank"
                >(search)</a>
            </label>
            <input
                type="file"
                id="poster"
                class="form-control-file"
                :value="poster"
                @change="eventDispatcher.$emit('posterChange', $event.target.value)"
                required
            />
        </div>
        <div class="text-danger mb-3" v-if="false">
            The poster image is required
        </div>
    </div>
</template>

<script>
    // TODO implement required warning
    export default {
        props: [
            'eventDispatcher',
            'poster',
            'title',
        ],
    }
</script>

<style scoped>

</style>