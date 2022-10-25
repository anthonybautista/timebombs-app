app.component('Dashboard', {
    data: function() {
        return {
            gameStarted: Date.now() > this.game.startTime,
            selectedBomb: null,
            bombTimer: null,
            activeBombs: [],
        }
    },

    props: {
        game: {
            type: Object,
            required: true,
        },
    },

    methods: {
        async getTime(id) {
            this.selectedBomb = Number(id);
            let info = await Bomb.bombInfo(this.game, Number(id));
            this.bombTimer = (Number(info[1]) * 1000) - Date.now();
        },
    },

    computed: {
        days(){
            let days = this.bombTimer / MS_PER_DAY;
            return this.bombTimer > 0 ? Math.floor(days) : Math.abs(Math.ceil(days));
        },
        hours(){
            let hours = (this.bombTimer % MS_PER_DAY) / MS_PER_HOUR;
            return this.bombTimer > 0 ? Math.floor(hours) : Math.abs(Math.ceil(hours));
        },
        minutes(){
            let minutes = (this.bombTimer % MS_PER_HOUR) / MS_PER_MINUTE;
            return this.bombTimer > 0 ? Math.floor(minutes) : Math.abs(Math.ceil(minutes));
        },
        seconds(){
            let seconds = (this.bombTimer % MS_PER_MINUTE) / MS_PER_SECOND;
            return this.bombTimer > 0 ? Math.floor(seconds) : Math.abs(Math.ceil(seconds));
        },
        updateActive: async function() {
            const t = new ethers.providers.JsonRpcProvider(this.game.RPC);
            let gameContract = new ethers.Contract(this.game.gameAddress, this.game.ABI, t);
            this.activeBombs = await gameContract.getActiveBombs();
        },
    },

    watch: {
        activeBombs: {
            handler: async function(newArray) {
                this.remaining = newArray.length;
            },
        },
    },

    mounted: async function () {

        setTimeout(await this.updateActive(),2000);

    },

    template: `<div class="flex justify-center q-ma-l q-pa-md text-center bg-primary" id="itemContainer2">
                <q-banner rounded class="bg-accent text-white">
                    <p>Active Bombs</p>
                    <div id="gameBanner2" class="text-center">
                        <div id="bombTimerDiv" class="bg-primary q-pa-sm q-mx-xs rounded-borders shadow-5">
                            <p class="q-mb-xs">Bomb Timer</p>
                            <p v-if="bombTimer > 0" class="q-mb-none">{{ days }}:{{ hours }}:{{ minutes }}:{{ seconds }}</p>
                            <p v-else-if="bombTimer===null" class="q-mb-none">SELECT BOMB</p>
                            <p v-else class="q-mb-none">DETONATED</p>
                        </div>
                        <div id="bombSelectorDiv" class="bg-primary q-pa-sm q-mx-xs rounded-borders shadow-5">
                            <p class="q-mb-xs">Bomb #</p>
                            <p class="q-mb-none">{{selectedBomb}}</p>
                        </div>
                    </div>
                    <div class="smolBombContainer bg-accent flex justify-center q-ma-l q-pa-md text-center rounded-borders">
                        <q-img src="/timebombs-app/images/bomb.png" class="smolBomb" v-for="bomb in activeBombs" @click="getTime(bomb)">
                            <p class="text-white flex flex-center bombText">
                                {{Number(bomb)}}
                            </p>
                        </q-img>
                    </div> 
                </q-banner>               
            </div>
            `,
});