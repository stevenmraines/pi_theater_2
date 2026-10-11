<template>
    <div class="form-group">
        <label for="season">* Season</label>
        <div id="season" class="input-group mb-3">
            <div class="input-group-prepend">
                <div class="dropdown">
                    <button
                        type="button"
                        class="btn btn-primary dropdown-toggle"
                        data-toggle="dropdown"
                    >
                        Options
                    </button>

                    <div class="dropdown-menu">
                        <a
                            href="javascript:void(0);"
                            class="dropdown-item"
                            v-for="(season, i) in allSeasonsSorted"
                            :key="i"
                            @click="seasonSet(season)"
                        >
                            Season {{ season.number + (season.name ? ` - "${season.name}"` : '') }}
                        </a>
                    </div>
                </div>
            </div>

            <!-- Allow decimal values in case you have something like Taskmaster season 10, New Years Treat, season 11, etc. -->
            <input
                type="number"
                min="0"
                step="1"
                class="form-control"
                :value="value.number"
                @change="numberChange"
            />
            
            <input
                class="form-control"
                :value="value.name"
                @input="nameChange"
                @paste="nameChange"
            />
            
            <div class="input-group-append">
                <button
                    class="btn btn-danger"
                    type="button"
                    @click="seasonRemove"
                >
                    x
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'allSeasons',
            'eventDispatcher',
            'value',
        ],

        computed: {
            allSeasonsSorted() {
                return this.allSeasons.sort((a, b) => {
                    const an = parseFloat(a.number);
                    const bn = parseFloat(b.number);
                    
                    if (an < bn) {
                        return -1;
                    }

                    if (bn < an) {
                        return 1;
                    }

                    return 0;
                });
            },
        },

        methods: {
            change(season) {
                this.eventDispatcher.$emit('seasonChange', { season });
            },

            nameChange(event) {
                this.change({ name: event.target.value, number: this.value.number});
            },

            numberChange(event) {
                this.change({ number: event.target.value, name: ''});
            },

            seasonRemove() {
                this.eventDispatcher.$emit('seasonRemove', { season: this.value });
            },

            seasonSet(season) {
                this.change(season);
            },
        },
    }
</script>