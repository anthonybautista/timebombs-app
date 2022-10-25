app.component('GameCard', {
    data: function() {
        return {
            errorMessage: "",
            gameStarted: false,
            remaining: 0,
            timeRemaining: 0,
            timed: false,
            allowHalt: false,
            activeBombs: [],
        }
    },

    props: {
        bombs: {
            type: Array,
            required: true,
        },
        showDash: {
            type: Boolean,
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

    computed: {
        days(){
            let days = this.timeRemaining / MS_PER_DAY;
            return this.timeRemaining > 0 ? Math.floor(days) : Math.abs(Math.ceil(days));
        },
        hours(){
            let hours = (this.timeRemaining % MS_PER_DAY) / MS_PER_HOUR;
            return this.timeRemaining > 0 ? Math.floor(hours) : Math.abs(Math.ceil(hours));
        },
        minutes(){
            let minutes = (this.timeRemaining % MS_PER_HOUR) / MS_PER_MINUTE;
            return this.timeRemaining > 0 ? Math.floor(minutes) : Math.abs(Math.ceil(minutes));
        },
        seconds(){
            let seconds = (this.timeRemaining % MS_PER_MINUTE) / MS_PER_SECOND;
            return this.timeRemaining > 0 ? Math.floor(seconds) : Math.abs(Math.ceil(seconds));
        }
    },

    methods: {
        async halt() {
            this.errorMessage = "Halting Game..."
            try {
                let winningBomb = 0;
                let foundWinner = false;
                let i = 0;
                while (i < this.bombs.length && !foundWinner) {
                    this.activeBombs.forEach(bomb => {
                        if (Number(bomb) === Number(this.bombs[i].tokenId)) {
                            foundWinner = true;
                            winningBomb = Number(this.bombs[i].tokenId);
                        }
                    })
                    i++;
                }
                if (winningBomb > 0) {
                    this.errorMessage = await Bomb.haltGame(this.game, this.wallet, winningBomb);
                } else {
                    this.errorMessage = "You don't have a winning bomb!";
                }
                setTimeout(this.emitUpdate, 2000);
            } catch (e) {
                this.errorMessage = e;
            }
        },
        emitUpdate() {
            this.$emit('update-game');
        },
    },

    watch: {
    },

    mounted: async function () {

        if (Date.now() > this.game.startTime) {
            setInterval(() => {
                // update time remaining
                this.timeRemaining = this.game.startTime - Date.now();
            }, 1000);
        }

        if (!this.game.gameOver) {
            setInterval(this.updateActive, 60000);
            this.allowHalt = this.remaining <= this.game.maxWinners;
        }
        this.gameStarted = Date.now() > this.game.startTime;
        this.allowHalt = this.remaining <= this.game.maxWinners;
    },

    template: `<div class="q-pa-md q-gutter-sm q-mt-xl q-mb-none flex justify-center">
                <q-banner rounded class="bg-accent text-white" :key="startTime">

                    <div id="gameBanner" class="text-center">
                        <div id="gameStartDiv" class="bg-primary q-pa-sm q-mx-xs rounded-borders shadow-5">
                            <p class="q-mb-xs">Time To Start</p>
                            <p v-if="timeRemaining > 0" class="q-mb-none">{{ days }}:{{ hours }}:{{ minutes }}:{{ seconds }}</p>
                            <p v-else class="q-mb-none">STARTED</p>
                        </div>
                        <div id="bombsLeftDiv" class="bg-primary q-pa-sm q-mx-xs rounded-borders shadow-5">
                            <p class="q-mb-xs">Bombs Left</p>
                            <p class="q-mb-none">{{this.remaining}}</p>
                        </div>
                    </div>
                    <div class="bg-primary text-center q-mt-md">
                        <p class="text-negative">{{this.errorMessage}}</p>
                    </div>
                    <div class="flex justify-center">
                        <q-btn v-if="allowHalt && gameStarted" color="negative" label="Halt Game" class="gameButton q-mt-sm shadow-5" @click="halt" :key="gameStarted"></q-btn>
                    </div>
                </q-banner>
            </div>
            <slot></slot>`,
});