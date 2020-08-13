<template>
    <div class="form-group">
        <label for="imdb">IMDb Search</label>
        <select
            id="imdb"
            class="form-control"
            :value="value"
            @change="eventDispatcher.$emit('imdbSearchChange', $event.target.value)"
        >
            <option
                v-for="result in file.imdb.d"
                :key="result.id"
                :value="result.id"
            >
                {{ result.l }} ({{ result.y }})
            </option>
        </select>
    </div>
</template>

<script>
    export default {
        props: [
            'eventDispatcher',
            'file',
            'value',
        ],
    }
</script>