const opensea = require("opensea-js");
const OpenSeaPort = opensea.OpenSeaPort;
const Network = opensea.Network;
const MnemonicWalletSubprovider = require("@0x/subproviders")
  .MnemonicWalletSubprovider;
const RPCSubprovider = require("web3-provider-engine/subproviders/rpc");
const Web3ProviderEngine = require("web3-provider-engine");

const MNEMONIC = "XXX"; // add your wallet mnemonic - DO NOT SHRE THIS WITH ANYONE
const NODE_API_KEY = "XXX"; // this is your node's API key. node providers i.e. infura, alchemy
const isInfura = false; // if you are using infura, change this to true. if not, leave false
// const FACTORY_CONTRACT_ADDRESS = process.env.FACTORY_CONTRACT_ADDRESS;
const NFT_CONTRACT_ADDRESS = "XXX"; // this is your NFT's contract address
const OWNER_ADDRESS = "XXX"; // this is the address of the NFT contract's owner. should be your wallet address
const NETWORK = "Rinkeby"; // this is the network you deploy on. rinkeby for rinkeby, mainnet for mainnet
const API_KEY = "XXX"; // this is optional. if you are sending a larger volume of requests, OpenSea will throttle your code unless you have an API key from OpenSea

if (!MNEMONIC || !NODE_API_KEY || !NETWORK || !OWNER_ADDRESS) {
  console.error(
    "Please set a mnemonic, Alchemy/Infura key, owner, network, API key, nft contract, and factory contract address."
  );
  return;
}

if (!FACTORY_CONTRACT_ADDRESS && !NFT_CONTRACT_ADDRESS) {
  console.error("Please either set a factory or NFT contract address.");
  return;
}

const BASE_DERIVATION_PATH = `44'/60'/0'/0`;

const mnemonicWalletSubprovider = new MnemonicWalletSubprovider({
  mnemonic: MNEMONIC,
  baseDerivationPath: BASE_DERIVATION_PATH,
});
const network =
  NETWORK === "mainnet" || NETWORK === "live" ? "mainnet" : "rinkeby";
const infuraRpcSubprovider = new RPCSubprovider({
  rpcUrl: isInfura
    ? "https://" + network + ".infura.io/v3/" + NODE_API_KEY
    : "XXX", // if you are not using Infura, change this to your node api key address
});

const providerEngine = new Web3ProviderEngine();
providerEngine.addProvider(mnemonicWalletSubprovider);
providerEngine.addProvider(infuraRpcSubprovider);
providerEngine.start();

const seaport = new OpenSeaPort(
  providerEngine,
  {
    networkName:
      NETWORK === "mainnet" || NETWORK === "live"
        ? Network.Main
        : Network.Rinkeby,
    apiKey: API_KEY,
  },
  (arg) => console.log(arg)
)


async function main() {

  const n = "XXX"; // this is your token's unique ID, not address

  console.log("Auctioning an item for a fixed price...");
  const fixedPriceSellOrder = await seaport.createSellOrder({
    asset: {
      tokenId: n,
      tokenAddress: NFT_CONTRACT_ADDRESS,
    },
    startAmount: 0.001, // amount in ETH, NOT wei
    expirationTime: 0, // set this if you would like your auction to expire at a certain time
    listingTime: 0, // set a listing time, in seconds. I would use this website: https://www.epochconverter.com/
    accountAddress: OWNER_ADDRESS,
  });
  console.log(
    `Successfully created a fixed-price sell order! ${fixedPriceSellOrder.asset.openseaLink}\n`
  );
}

main();

