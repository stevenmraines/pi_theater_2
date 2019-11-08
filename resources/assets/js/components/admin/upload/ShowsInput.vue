<template>
    <div class="form-group">
        <label for="show">Show</label>
        <select
            id="show"
            class="form-control"
            :value="value"
            @change="eventDispatcher.$emit('showChange', $event.target.value)"
        >
            <option
                v-for="s in shows"
                :value="s.id"
            >
                {{ s.title }}
            </option>
        </select>
    </div>
</template>

<script>
    export default {
        props: [
            'eventDispatcher',
            'shows',
            'value',
        ],
    }
</script>