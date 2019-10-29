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
                ref="posterInput"
                @change="posterChange()"
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

        methods: {
            posterChange() {
                var filepath = this.$refs.posterInput.value;

                var tokens = filepath.split('\\');

                this.poster = tokens.pop();

                this.eventDispatcher.$emit('posterChange', this.poster);
            },
        },
    }
</script>

<style scoped>

</style>