const defaultNetwork = '0xa86a'
//const defaultNetwork = '0xa869'
const { ethereum } = window;
const FIRE ='[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"string","name":"username","type":"string"}],"name":"activate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"username","type":"string"}],"name":"addressFor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"string","name":"username","type":"string"}],"name":"deactivate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"nftNameService","type":"address"},{"internalType":"bool","name":"allowed_","type":"bool"}],"name":"setAllowed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"usernameFor","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]';
const FIRE_ADDRESS = "0x5adCD28C08Fdc5a913982391cebD866b27C717D4";
const GAME = '[{"inputs":[{"internalType":"address","name":"subAddress","type":"address"},{"internalType":"uint64","name":"subscriptionId","type":"uint64"},{"internalType":"address","name":"operator","type":"address"},{"internalType":"address","name":"bombNFT","type":"address"},{"internalType":"bool","name":"useERC20","type":"bool"},{"internalType":"bool","name":"feeERC20","type":"bool"},{"internalType":"uint256","name":"_cost","type":"uint256"},{"internalType":"uint256","name":"_fee","type":"uint256"},{"internalType":"uint256","name":"_maxSupply","type":"uint256"},{"internalType":"uint8","name":"maxPerAddress","type":"uint8"},{"internalType":"uint256","name":"_startTime","type":"uint256"},{"internalType":"uint8","name":"successPercentage","type":"uint8"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"have","type":"address"},{"internalType":"address","name":"want","type":"address"}],"name":"OnlyCoordinatorCanFulfill","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"bomb","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"BombActivated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"bomb","type":"uint256"}],"name":"BombDetonated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"caller","type":"address"},{"indexed":true,"internalType":"uint256","name":"bomb","type":"uint256"},{"indexed":false,"internalType":"bool","name":"successful","type":"bool"}],"name":"BombReset","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"bombsRemaining","type":"uint256"},{"indexed":true,"internalType":"address","name":"caller","type":"address"}],"name":"GameHalted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"winner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"PrizeClaimed","type":"event"},{"inputs":[{"internalType":"uint256","name":"bomb","type":"uint256"}],"name":"activateBomb","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"addressToBombs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"bombToStruct","outputs":[{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"","type":"bytes"}],"name":"checkUpkeep","outputs":[{"internalType":"bool","name":"upkeepNeeded","type":"bool"},{"internalType":"bytes","name":"performData","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"bomb","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyWithdrawERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"flipPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"gameTokenAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getActiveBombs","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"bomb","type":"uint256"}],"name":"getBombInfo","outputs":[{"components":[{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"internalType":"struct Timebomb.BombStruct","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getGameInfo","outputs":[{"components":[{"internalType":"address","name":"gameOperator","type":"address"},{"internalType":"address","name":"bombNFTAddress","type":"address"},{"internalType":"uint256","name":"cost","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"uint256","name":"individualPrize","type":"uint256"},{"internalType":"uint256","name":"maxSupply","type":"uint256"},{"internalType":"uint256","name":"timeInterval","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint16","name":"keeperInterval","type":"uint16"},{"internalType":"uint8","name":"nftPerAddressLimit","type":"uint8"},{"internalType":"uint8","name":"safePercentile","type":"uint8"},{"internalType":"uint8","name":"maxWinners","type":"uint8"},{"internalType":"uint8","name":"bombGroupSize","type":"uint8"},{"internalType":"bool","name":"paused","type":"bool"},{"internalType":"bool","name":"gameOver","type":"bool"},{"internalType":"bool","name":"chargeERC20","type":"bool"},{"internalType":"bool","name":"chargeFeeERC20","type":"bool"}],"internalType":"struct Timebomb.GameStruct","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"bomb","type":"uint256"}],"name":"getTimeLeft","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalActive","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"bomb","type":"uint256"}],"name":"haltGame","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"bomb","type":"uint256"}],"name":"isActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"endIndex","type":"uint256"}],"name":"manualDetonate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"","type":"bytes"}],"name":"performUpkeep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"requestId","type":"uint256"},{"internalType":"uint256[]","name":"randomWords","type":"uint256[]"}],"name":"rawFulfillRandomWords","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"requestCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"bomb","type":"uint256"}],"name":"resetBomb","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"_newAmount","type":"uint8"}],"name":"setBombGroupSize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_newAmount","type":"uint32"}],"name":"setCallbackGasLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newAmount","type":"uint256"}],"name":"setCost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newAmount","type":"uint256"}],"name":"setFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newAddress","type":"address"}],"name":"setGameOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"setGameToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newAmount","type":"uint256"}],"name":"setInterval","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_newAmount","type":"uint16"}],"name":"setKeeperInterval","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_newKeyHash","type":"bytes32"}],"name":"setKeyHash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"_newAmount","type":"uint8"}],"name":"setMaxPerAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"_newAmount","type":"uint8"}],"name":"setMaxWinners","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newAmount","type":"uint256"}],"name":"setStartTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newAddress","type":"address"}],"name":"setSub","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"_newAmount","type":"uint64"}],"name":"setSubId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"subscriptionAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]';
let provider = null,
signer = null,
currentNetwork = null,
nftAddress = "",
gameAddress = "0x9B2434123DF2068AF536C84BfE3D533126Ea9217",
cost = 0,
fee = 0,
maxSupply = 0,
resetInterval = 0,
startTime = 0,
maxPerAddress = 0,
safePercent = 0,
maxWinners = 0,
paused = true,
gameOver = false,
chargeERC20 = false,
feeERC20 = false;

async function getGameData(address) {
    const t = new ethers.providers.JsonRpcProvider(RPC);
    let gameContract = new ethers.Contract(address, GAME, t);
    return await gameContract.getGameInfo();
}

/* web3 code borrowed and modified from ftso.alexdupre.com */
const networks = {
    '0xa86a': {
        chainId: '0xa86a',
        chainName: 'Avalanche',
        nativeCurrency: { decimals: 18, symbol: 'AVAX' },
        rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
        blockExplorerUrls: ['https://snowtrace.io'],
    },
}
/*const networks = {
    '0xa869': {
        chainId: '0xa869',
        chainName: 'Fuji',
        nativeCurrency: { decimals: 18, symbol: 'AVAX' },
        rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
        blockExplorerUrls: ['https://testnet.snowtrace.io'],
    },
}*/
const RPC = 'https://api.avax.network/ext/bc/C/rpc';
const explorer = 'https://snowtrace.io/tx/';

const app = Vue.createApp({
    data(){
        return {
            categories: [
                {label: 'Your Bombs', value: 'Your Bombs'},
                {label: 'Dashboard', value: 'Dashboard'},
                {label: 'Rules', value: 'Rules'},
            ],
            rules: [
                'Activate your bomb(s) to enter the game',
                'Once game starts, reset your bomb(s) every interval or it will automatically detonate.',
                'Resetting your bomb has a chance of detonation!',
                'When there are less-than or equal-to the Max Winners remaining, you can halt the game and claim your prize!',
            ],
            selected: "Your Bombs",
            myBombs : [new Bomb(999999,"/images/no-bomb.png")],
            refreshController: false,
            connected: false,
            alias: "",
            account: "",
            showDash: false,
        }
    },

    methods: {
        show(category) {
            this.showDash = category === 'Dashboard';
        },
        connect: async function () {
            try {
                // connect
                await ethereum.request({ method: 'eth_requestAccounts' });
                await this.checkNetwork();
                await this.checkAccount();
                console.log("Connected.");
                this.connected = true;
            } catch (err) {
                if (err.code === 4001) {
                    // user rejected the connection
                    console.log('Please connect to MetaMask.');
                } else {
                    console.error(err);
                }
            }
        },
        checkWeb3: async function() {
            if (typeof window.ethereum !== 'undefined') {
                console.log('Web3 provider is installed!')
                provider = new ethers.providers.Web3Provider(window.ethereum)
                signer = provider.getSigner()
                try {
                    // check if already connected by getting the wallet address
                    let address = await signer.getAddress();
                    this.account = address;
                    await this.checkNetwork();
                    await this.checkAccount();
                    this.connected = true;
                } catch (err) {
                    console.log(err)
                }
            } else {
                console.log('Please install MetaMask or another web3 provider!')
                alert('Please install MetaMask or another web3 provider!')
            }
        },
        checkNetwork: async function() {
            ethereum.on('chainChanged', this.handleChainChanged);
            let chainId = await ethereum.request({ method: 'eth_chainId' })
            if (networks[chainId] !== undefined) {
                currentNetwork = networks[chainId]
                //await handleChainChanged(chainId)
            } else if (ethereum.isMetaMask) {
                await this.setupNetwork(defaultNetwork)
                if (chainId === await ethereum.request({ method: 'eth_chainId' }))
                    console.log('Please switch to one of the supported networks.')
            } else {
                console.log('Please switch to one of the supported networks.')
            }
        },
        checkAccount: async function() {
            let accounts = await ethereum.request({ method: 'eth_accounts' })
            ethereum.on('accountsChanged', this.handleAccountsChanged)
        },
        setupNetwork: async function(network) {
            try {
                await ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: networks[network].chainId }],
                });
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    try {
                        await ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [networks[network]],
                        });
                    } catch (addError) {
                        if (addError.code === 4001) {
                            console.log('Please approve the Avalanche network.')
                        } else {
                            // handle other "add" errors
                            console.error(addError)
                        }
                    }
                } else if (switchError.code === 4001) {
                    // user rejected the change
                    console.log('Avalanche configuration already present.')
                } else {
                    // handle other "switch" errors
                    console.error(switchError)
                }
            }
            provider = new ethers.providers.Web3Provider(window.ethereum)
            signer = provider.getSigner()
        },
        handleChainChanged: async function(chainId) {
            //window.location.reload()
            console.log("Chain changed to " + chainId)
            currentNetwork = networks[chainId]
            // reload provider and signer on chain change
            provider = new ethers.providers.Web3Provider(window.ethereum)
            signer = provider.getSigner()
            if (currentNetwork !== undefined) {
                // show main section
            } else {
                // reload or ask to change network
                console.log('Please switch to one of the supported networks.')
            }
        },
        handleAccountsChanged: async function(accounts) {
            //window.location.reload()
            console.log('Account changed to ' + accounts)
            this.account = accounts;
            if (accounts.length === 0) {
                // MetaMask is locked or the user has not connected any accounts
            }
        },
        getAlias: async function() {
            const t = new ethers.providers.JsonRpcProvider(RPC);
            let fireContract = new ethers.Contract(FIRE_ADDRESS, FIRE, t);
            let account = await signer.getAddress();
            let fire = await fireContract.usernameFor(account);
            //let fire = "";
            if (fire !== "") {
                this.alias = fire;
            } else {
                this.alias = "..."+ account.substring(34);
            }
        },
        getBombs: function() {
            /*const options = {
                method: 'GET',
                url: 'https://deep-index.moralis.io/api/v2/'+this.account+'/nft',
                params: {
                    chain: '0xa86a',
                    format: 'decimal',
                    token_addresses: this.nftAddress,
                },
                headers: {accept: 'application/json', 'X-API-Key': 'naggQZQHKX2aoWZNsi4ttLcGR0959aM4N93dYjrvmMDRujDY3c7ZBGhUP0Vjg1OU'}
            };*/
            const options = {
                method: 'GET',
                url: 'https://deep-index.moralis.io/api/v2/'+this.account+'/nft',
                params: {
                    chain: '0xa86a',
                    format: 'decimal',
                    token_addresses: nftAddress,
                },
                headers: {accept: 'application/json', 'X-API-Key': 'naggQZQHKX2aoWZNsi4ttLcGR0959aM4N93dYjrvmMDRujDY3c7ZBGhUP0Vjg1OU'}
            };
            let bombs = [];
            axios.request(options).then(function (response) {
                if(response.data.total > 0) {
                    response.data.result.forEach(async item => {
                        let token = item.token_id;
                        let uri = JSON.parse(item.metadata)["image"];
                        if (uri.substring(0,4) === "ipfs") {
                            uri = "https://ipfs.io/ipfs/"+uri.substring(7);
                        }
                        bombs.push(new Bomb(token, uri));
                    });
                } else {
                    bombs.push(new Bomb(99999,"/images/no-bomb.png",0,false));
                }
            }).catch(function (error) {
                console.error(error);
            });
            this.myBombs = bombs;
        },
        test() {
            this.refreshController = !this.refreshController;
        },
        reloadContainer() {
            setTimeout(this.test,1000);
        },
        setUpGame: async function() {
            let data = await getGameData(gameAddress);
            nftAddress = data[1];
            cost = Number(data[2]) / 10**18;
            fee = Number(data[3]) / 10**18;
            maxSupply = Number(data[5]);
            resetInterval = Number(data[6]) * 1000;
            startTime = Number(data[7]) * 1000;
            maxPerAddress = data[9];
            safePercent = data[10];
            maxWinners = data[11];
            paused = data[13];
            gameOver = data[14];
            chargeERC20 = data[15];
            feeERC20 = data[16];
        },
    },


    // computed: values that are updated and cached if dependencies change
    computed: {
    },

    //mounted:  called after the instance has been mounted,
    mounted: async function () {
        await this.setUpGame();
        await this.checkWeb3();
    },

    // watch:   calls the function if the value changes
    // https://travishorn.com/add-localstorage-to-your-vue-app-in-2-lines-of-code-56eb2c9f371b
    watch: {
        selected: {
            handler: function(newSelection) {
                this.show(newSelection);
            },
            immediate: true,
        },
        account: {
            handler: async function(newAccount) {
                await this.getAlias(newAccount);
                await this.getBombs();
            },
        },
    }
})