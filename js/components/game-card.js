async function haltGame(bomb) {
    //provider = new ethers.providers.Web3Provider(window.ethereum);
    //let signer = this.provider.getSigner();
    let gameContract = new ethers.Contract(gameAddress, GAME, signer);
    try {
        if (ethereum) {
            let n = await gameContract.haltGame(bomb);
            await n.wait();
            console.log(`https://snowtrace.io/tx/${n.hash}`);
        } else console.log("Ethereum object doesn't exist!");
    } catch (t) {
        console.log(t);
        return t.data.message;
    }
}

async function getRemaining() {
    const t = new ethers.providers.JsonRpcProvider(RPC);
    let gameContract = new ethers.Contract(gameAddress, GAME, t);
    return await gameContract.getActiveBombs();
}

app.component('GameCard', {
    data: function() {
        return {
            errorMessage: "",
            gameStarted: Date.now() > startTime,
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
                    await haltGame(winningBomb);
                } else {
                    this.errorMessage = "You don't have a winning bomb!";
                }
                setTimeout(this.emitUpdate, 2000);
            } catch (e) {
                this.errorMessage = e;
            }
        },
        async updateActive() {
            this.activeBombs = await getRemaining();
        },
        emitUpdate() {
            this.$emit('update-game');
        }
    },

    watch: {
        activeBombs: {
            handler: async function(newArray) {
                this.remaining = newArray.length;
            },
        },
    },

    mounted: async function () {
        await this.updateActive();
        this.allowHalt = this.remaining <= maxWinners;

        if (Date.now() > startTime) {
            setInterval(() => {
                // update time remaining
                this.timeRemaining = startTime - Date.now();
            }, 1000);
        }
        this.gameStarted = Date.now() > startTime;
        if (!gameOver) {
            setInterval(this.updateActive, 60000);
            this.allowHalt = this.remaining <= maxWinners;
        }
    },

    template: `<div class="q-pa-md q-gutter-sm q-mt-xl q-mb-none flex justify-center">
                <q-banner rounded class="bg-accent text-white" :key="remaining">

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
                        <q-btn v-if="allowHalt" color="negative" label="Halt Game" class="gameButton q-mt-sm shadow-5" @click="halt"></q-btn>
                    </div>
                </q-banner>
            </div>
            <dashboard v-if="showDash" :key="showDash" :bombs="activeBombs"></dashboard>`,
});