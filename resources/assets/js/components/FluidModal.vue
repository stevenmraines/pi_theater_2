<template>
    <div class="fluid-modal scrollbar" id="genre-modal" ref="container">
    <!-- <div class="fluid-modal scrollbar" ref="container" v-on:click.stop="hide"> -->
        <div class="fluid-modal-content">
            <div class="fluid-modal-header mb-2">
                <span class="fluid-modal-title">
                    {{ title }}
                </span>
                <button
                    class="fluid-modal-close close"
                    v-on:click="hide"
                >
                    <span>&times;</span>
                </button>
            </div>

            <hr class="fluid-modal-hr" />

            <div class="fluid-modal-poster-container">
                <div class="fluid-modal-inner-poster-container mx-0">
                    <poster-container
                        class="my-3"
                        v-for="content in contents"
                        v-bind:key="content.id"
                        v-bind:id="content.id"
                        v-bind:title="content.title"
                        v-bind:poster="content.poster"
                        v-bind:event-dispatcher="{}"
                    ></poster-container>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['title', 'contents'],

        methods: {
            show() {
                document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
                $(this.$refs.container).fadeIn();
            },

            hide() {
                $(this.$refs.container).fadeOut();
                document.getElementsByTagName('body')[0].classList.remove('overflow-hidden');
            },
        },

        created() {
            Event.listen('showFluidModal', this.show);
            Event.listen('hideModal', this.hide);
        },
    }
</script>
