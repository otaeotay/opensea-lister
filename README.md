# opensea-lister

This JS script will list an item for you on OpenSea, assuming that your item has already been minted on the platform.

The OpenSea docs recommend using Node.js version 8.11, but I would use the most current version of Node. The OpenSea api is a bit finnicky, so you may have to experiment with different version of Node.js. Node Version Manager (nvm) is an extremely useful tool to do so.

Then, in your project terminal, run: npm install --save opensea-js

If your project still runs into issues and is not able to find the proper docs, you may have to install using yarn.

The OpenSea docs also recommend this:

"Install web3 too if you haven't already.

If you run into an error while building the dependencies and you're on a Mac, run this:

xcode-select --install # Install Command Line Tools if you haven't already.
sudo xcode-select --switch /Library/Developer/CommandLineTools # Enable command line tools
sudo npm explore npm -g -- npm install node-gyp@latest # (Optional) update node-gyp"

Now you can start configurating the JS file to your specific needs.

Begin by adding your wallet Mnemonic (line 9). DO NOT SHARE THIS INFORMATION WITH ANYBODY. This is extremely private and if anyone has access to this, you will lose access to your wallet.

Then fill in your Node API Key (line 10). You can create a custom account on Infura or Alchemy. They are free to use and both are great platforms.

If you have opted to use Infura, change the boolean value (line 11) to "true"

Then fill in your NFT Contract Address (line 13) with.. well your NFT's contract address. You should be able to find this on OpenSea by looking at your token's details.

Add your wallet address (line 14).

If you are testing on the Rinkeby network, you can leave the value as is. However, if you are listing on the main ETH network, change the value to "mainnet" (line 15).

If you are trying to list multiple at once, you will probably have to request an API key from OpenSea and add it to your code (line 16).

If you are using Alchemy or even another Node provider, add your API Key url (line 41).

Enter your token's unique ID (NOT ADDRESS) (line 64).

Set your start amount in ETH (line 72).

Set an expiration time relative to your start of listing. If expirationTime is 0, there will be no expiration set (line 73).

And finally, set a listing time. If listingTime is 0, your token will be listed at the time your code is ran (line 74).