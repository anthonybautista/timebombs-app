app.component('BombCard', {
    data: function() {
        return {
            gameStarted: Date.now() > this.game.startTime,
            errorMessage: "",
            provider: null,
            timestamp: 0,
            active: false,
            info: [],
        }
    },

    props: {
        bomb: {
            type: Object,
            required: true,
        },
        game: {
            type: Object,
            required: true,
        },
        wallet: {
            type: Object,
            required: true,
        },
    },

    methods: {
        async reset() {
            this.errorMessage = "Resetting Bomb..."
            try {
                this.errorMessage = await Bomb.resetBomb(this.game, this.wallet.signer, this.bomb.tokenId);
                setTimeout(this.updateInfo, 30000);
            } catch (e) {
                this.errorMessage = e;
            }

        },

        async updateInfo() {
            this.info = await Bomb.bombInfo(this.game, this.bomb.tokenId);
            setTimeout(this.refreshBomb, 2000);
        },

        refreshBomb() {
            this.active = this.info[2];
            this.timestamp = Number(this.info[1]) * 1000;
            if (this.active && (this.timestamp + this.game.resetInterval) > Date.now()) {
                this.errorMessage = "Success!";
            } else {
                this.errorMessage = "BOOM!";
            }
        },

        async act() {
            this.errorMessage = "Activating Bomb..."
            this.errorMessage = await Bomb.activateBomb(this.game, this.wallet, this.bomb.tokenId);
            let info = await Bomb.bombInfo(this.game, this.bomb.tokenId);
            this.active = info[2];
            this.timestamp = Number(info[1]) * 1000;
        },
    },

    watch: {
    },

    mounted: async function () {
        let data = await Bomb.bombInfo(this.game, this.bomb.tokenId);
        this.info = data;
        this.active = data[2];
        this.timestamp = Number(data[1]) * 1000;
    },

    template: `<q-card class="my-card q-ma-md bombCard bg-secondary" :key="timestamp">
                    <q-img :src="bomb.pic" class="nft"></q-img>

                    <q-card-section class="q-pa-none">
                        <div class="text-h6">Bomb #{{bomb.tokenId}}</div>
                    </q-card-section>
                    
                    <timer :bomb-timestamp="timestamp" :active="active" :game="game"></timer>
                    <p class="text-negative q-ma-none errorText">{{this.errorMessage}}</p>
                    <q-card-section v-if="!gameStarted && !active">
                        <q-btn class="bg-primary text-white" @click="act">Activate</q-btn>
                    </q-card-section>
                    <q-card-section v-else-if="gameStarted && active">
                        <q-btn class="bg-primary text-white" @click="reset">Reset Bomb</q-btn>
                    </q-card-section>
                    <q-card-section v-else-if="!gameStarted && active">
                        <q-btn class="bg-primary text-white">Not Started</q-btn>
                    </q-card-section>
                    <q-card-section v-else>
                        <q-btn class="bg-primary text-white">Not  Active</q-btn>
                    </q-card-section>
                </q-card>`,
});