<template>
    <div class="row" v-if="drive > 0">
        <div class="col">
            <form novalidate>
                <!-- Year Start -->
                <year-input
                    :eventDispatcher="eventDispatcher"
                    :label="'Year Start'"
                    :max="yearMax"
                    :min="yearMin"
                    :search="true"
                    :title="show.title"
                    :value="show.yearStart"
                ></year-input>

                <!-- Year End -->
                <year-input
                    :eventDispatcher="eventDispatcher"
                    :label="'Year End'"
                    :max="yearMax"
                    :min="yearMin"
                    :search="false"
                    :value="show.yearEnd"
                ></year-input>

                <div class="alert alert-warning mb-2" role="alert" v-if="startGreaterThanEnd()">
                    <strong>Warning: </strong>The Year Start field should be less than the Year End
                </div>

                <!-- Submit -->
                <submit-input
                    :eventDispatcher="eventDispatcher"
                    :disabled="submitDisabled"
                ></submit-input>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'drive',
            'driveEventDispatcher',
        ],

        data() {
            return {
                eventDispatcher: new Vue({}),
                show: {
                    summary: '',
                    title: '',
                    yearStart: this.yearMax,
                    yearEnd: this.yearMax,
                },
                yearMax: new Date().getFullYear(),
                yearMin: 1900,
            };
        },

        computed: {
            submitDisabled() {
                return !this.valid();
            },
        },

        created() {

        },

        methods: {
            startGreaterThanEnd() {
                return this.yearStart > this.yearEnd;
            },

            valid() {
                return !this.startGreaterThanEnd();
            },
        },
    }
</script>