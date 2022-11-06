function Bomb(tokenId, pic) {
    this.tokenId = tokenId;
    this.pic = pic;
}

Bomb.bombInfo = async function (game, token) {
    const t = new ethers.providers.JsonRpcProvider(game.RPC);
    let gameContract = new ethers.Contract(game.gameAddress, game.ABI, t);
    return await gameContract.getBombInfo(token);
}

Bomb.resetBomb = async function (game, signer, bomb) {
    //provider = new ethers.providers.Web3Provider(window.ethereum);
    //let signer = this.provider.getSigner();
    console.log(signer)
    let gameContract = new ethers.Contract(game.gameAddress, game.ABI, signer);
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

Bomb.activateBomb = async function (game, wallet, bomb) {
    //provider = new ethers.providers.Web3Provider(window.ethereum);
    //let signer = this.provider.getSigner();
    let gameContract = new ethers.Contract(game.gameAddress, game.ABI, wallet.signer);
    try {
        if (ethereum) {
            let amount = 0;
            if (game.chargeERC20 && !game.feeERC20) {
                amount = game.fee;
            } else if (!game.chargeERC20 && !game.feeERC20) {
                amount = game.cost + game.fee;
            } else if (!game.chargeERC20 && game.feeERC20) {
                amount = game.cost;
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

Bomb.haltGame = async function (game, wallet, bomb) {
    //provider = new ethers.providers.Web3Provider(window.ethereum);
    //let signer = this.provider.getSigner();
    let gameContract = new ethers.Contract(game.gameAddress, game.ABI, wallet.signer);
    try {
        if (ethereum) {
            let n = await gameContract.haltGame(bomb);
            await n.wait();
            console.log(`https://snowtrace.io/tx/${n.hash}`);
            return `https://snowtrace.io/tx/${n.hash}`;
        } else console.log("Ethereum object doesn't exist!");
    } catch (t) {
        console.log(t);
        return t.data.message;
    }
}

function Game(nftAddress,
              gameAddress,
              RPC,
              ABI,
              cost,
              fee,
              maxSupply,
              resetInterval,
              startTime,
              maxPerAddress,
              safePercent,
              maxWinners,
              paused,
              gameOver,
              chargeERC20,
              feeERC20) {
    this.RPC = RPC;
    this.ABI = ABI;
    this.gameAddress = gameAddress;
    this.nftAddress = nftAddress;
    this.cost = cost;
    this.fee = fee;
    this.maxSupply = maxSupply;
    this.resetInterval = resetInterval;
    this.startTime = startTime;
    this.maxPerAddress = maxPerAddress;
    this.safePercent = safePercent;
    this.maxWinners = maxWinners;
    this.paused = paused;
    this.gameOver = gameOver;
    this.chargeERC20 = chargeERC20;
    this.feeERC20 = feeERC20;
}

Game.setUpGame = async function (address, RPC, ABI) {
    const t = new ethers.providers.JsonRpcProvider(RPC);
    let gameContract = new ethers.Contract(address, ABI, t);
    let data = await gameContract.getGameInfo();

    return new Game(data[1],
        address,
        RPC,
        ABI,
        Number(data[2]) / 10**18,
        Number(data[3]) / 10**18,
        Number(data[5]),
        Number(data[6]) * 1000,
        Number(data[7]) * 1000,
        data[9],
        data[10],
        data[11],
        data[13],
        data[14],
        data[15],
        data[16])
}

function Wallet(connected,
                alias,
                account,
                provider,
                signer,
                currentNetwork) {
    this.connected = connected;
    this.alias = alias;
    this.account = account;
    this.provider = provider;
    this.signer = signer;
    this.currentNetwork = currentNetwork;
}


