<template>
    <div>
        <div class="form-group">
            <label for="poster">Poster Image
                <a
                    v-bind:href="'https://www.google.com/search?q=' + title + '+poster&tbm=isch'"
                    target="_blank"
                >(search)</a>
            </label>
            <input
                type="file"
                id="poster"
                class="form-control-file"
                ref="posterInput"
                v-on:change="posterChange()"
            />
        </div>
        <div class="text-danger mb-3" v-if="false">
            The poster image is required
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'eventDispatcher',
            'title',
        ],

        data() {
            return {
                poster: '',
            };
        },

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