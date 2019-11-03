<template>
    <div>
        <label for="collections">Collections</label>
        <div id="collections">
            <collection-input
                v-for="(collection, index) in collections"
                :allCollections="allCollections"
                :collection="collection"
                :eventDispatcher="eventDispatcher"
                :index="index"
                :key="index"
            ></collection-input>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'allCollections',
            'collections',
            'eventDispatcher',
        ],
    }
</script>

<style scoped>

</style>