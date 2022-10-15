app.component('BombContainer', {
    data: function() {
        return {
            gameStarted: Date.now() > startTime,
        }
    },

    props: {
        bombs: {
            type: Array,
            required: true,
        },
    },

    methods: {
        reload() {
            this.$emit('reload');
        },
        reset(id) {
            this.$emit('reset', id);
        }
    },

    watch: {
        bombs: {
            handler: async function() {
                this.reload();
            },
        },
    },

    mounted: function () {
    },

    template: `<div class="flex justify-center q-ma-l q-pa-md text-center bg-primary" id="itemContainer">
                <bomb-card v-if="bombs.length > 0" class="my-card q-ma-md" v-for="item in bombs" :key="item.tokenId" :bomb="item" @reset="reset">
                </bomb-card>
                <div v-else>
                <div class="buffer q-mt-xl"></div>
                    <p class="text-white">If bombs don't load after a few seconds, click button.</p>
                    <q-btn class="bg-accent text-white" @click="reload">Load Bombs</q-btn>
                </div>
            </div>`,
});