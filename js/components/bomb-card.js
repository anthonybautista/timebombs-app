async function resetBomb(bomb) {
    //provider = new ethers.providers.Web3Provider(window.ethereum);
    //let signer = this.provider.getSigner();
    let gameContract = new ethers.Contract(gameAddress, GAME, signer);
    try {
        if (ethereum) {
            let n = await gameContract.resetBomb(bomb);
            await n.wait();
            console.log(`https://snowtrace.io/tx/${n.hash}`);
            return "Updating Bomb... This takes about 30 seconds.";
        } else console.log("Ethereum object doesn't exist!");
    } catch (t) {
        console.log(t);
        return t.data.message;
    }
}

async function activateBomb(bomb) {
    //provider = new ethers.providers.Web3Provider(window.ethereum);
    //let signer = this.provider.getSigner();
    let gameContract = new ethers.Contract(gameAddress, GAME, signer);
    try {
        if (ethereum) {
            let amount = 0;
            if (chargeERC20 && !feeERC20) {
                amount = fee;
            } else if (!chargeERC20 && !feeERC20) {
                amount = cost + fee;
            } else if (!chargeERC20 && feeERC20) {
                amount = cost;
            }
            let n = await gameContract.activateBomb(bomb, { value: ethers.utils.parseEther(amount.toString()) });
            await n.wait();
            console.log(`https://snowtrace.io/tx/${n.hash}`);
            return "Updating Bomb...";
        } else console.log("Ethereum object doesn't exist!");
    } catch (t) {
        console.log(t);
        return t.data.message;
    }
}

async function bombInfo(token) {
    const t = new ethers.providers.JsonRpcProvider(RPC);
    let gameContract = new ethers.Contract(gameAddress, GAME, t);
    return await gameContract.getBombInfo(token);
}

function wait() {
    console.log("wait finished.");
}

app.component('BombCard', {
    data: function() {
        return {
            gameStarted: Date.now() > startTime,
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
    },

    methods: {
        async reset() {
            this.errorMessage = "Resetting Bomb..."
            try {
                this.errorMessage = await resetBomb(this.bomb.tokenId);
                setTimeout(this.updateInfo, 30000);
            } catch (e) {
                this.errorMessage = e;
            }

        },

        async updateInfo() {
            await bombInfo(this.bomb.tokenId).then(async result => {
                console.log("after call")
                console.log(result);
                this.info = result;
            });
            setTimeout(this.refreshBomb, 2000);
        },

        refreshBomb() {
            this.active = this.info[2];
            this.timestamp = Number(this.info[1]) * 1000;
            if (this.active) {
                this.errorMessage = "Success!";
            } else {
                this.errorMessage = "BOOM!";
            }
        },

        async act() {
            this.errorMessage = "Activating Bomb..."
            this.errorMessage = await activateBomb(this.bomb.tokenId);
            let info = await bombInfo(this.bomb.tokenId);
            this.active = info[2];
            this.timestamp = Number(info[1]) * 1000;
        },
    },

    watch: {
    },

    mounted: async function () {
        let data = await bombInfo(this.bomb.tokenId);
        this.info = data;
        this.active = data[2];
        this.timestamp = Number(data[1]) * 1000;
    },

    template: `<q-card class="my-card q-ma-md bombCard" :key="timestamp">
                    <q-img :src="bomb.pic" class="nft"></q-img>

                    <q-card-section class="q-pa-none bg-secondary">
                        <div class="text-h6">Bomb #{{bomb.tokenId}}</div>
                    </q-card-section>
                    
                    <timer :bomb-timestamp="timestamp" :active="active"></timer>
                    <p class="text-negative q-ma-none bg-secondary errorText">{{this.errorMessage}}</p>
                    <q-card-section v-if="!gameStarted && !active" class="bg-secondary">
                        <q-btn class="bg-primary text-white" @click="act">Activate</q-btn>
                    </q-card-section>
                    <q-card-section v-else-if="gameStarted && active" class="bg-secondary">
                        <q-btn class="bg-primary text-white" @click="reset">Reset Bomb</q-btn>
                    </q-card-section>
                    <q-card-section v-else-if="!gameStarted && active" class="bg-secondary">
                        <q-btn class="bg-primary text-white">Not Started</q-btn>
                    </q-card-section>
                    <q-card-section v-else class="bg-secondary">
                        <q-btn class="bg-primary text-white">Not  Active</q-btn>
                    </q-card-section>
                </q-card>`,
});