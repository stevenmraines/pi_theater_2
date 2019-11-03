<template>
    <div>
        <div class="form-group">
            <file-input
                :label="'Poster Image'"
                :required="true"
                :value="poster"
            ></file-input>
        </div>
        <a
            :href="'https://www.google.com/search?q=' + title + '+poster&tbm=isch'"
            target="_blank"
        >
            (search)
        </a>
        <div class="text-danger mb-3" v-if="false">
            The poster image is required
        </div>
    </div>
</template>

<script>
    // TODO implement required warning
    // TODO figure out how to do bootstrap labels without IDs
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