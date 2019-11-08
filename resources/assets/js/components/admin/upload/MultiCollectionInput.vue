<template>
    <div class="form-group">
        <label for="collections">Collections</label>
        <collection-input
            id="collections"
            v-for="(collection, index) in collections"
            :allCollections="allCollections"
            :eventDispatcher="eventDispatcher"
            :index="index"
            :key="index"
            :value="collection"
        ></collection-input>
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