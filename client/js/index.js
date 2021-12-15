import {ethers} from "./ether.js";
import {nftAddress, nftAbi, mintCost} from "./data.js";

let accounts; 
let provider;
let signer;

async function buy() {
    await connectMetamask();
    accounts = await ethereum.request({method: 'eth_requestAccounts'});
    let account = accounts[0];
    //let tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider).connect(signer);
    //await tokenContract.approve(nftAddress, mintCost+"0");
    let nftContract = new ethers.Contract(nftAddress, nftAbi, provider).connect(signer);
    await nftContract.buy({value: mintCost});
}

async function connectMetamask() {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
}

async function init() {
    if(window.ethereum != undefined) {
        accounts = await ethereum.request({method: 'eth_requestAccounts'});
    }
}
init();

window.buy = buy;