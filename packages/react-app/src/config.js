import {Localhost, Mainnet, DEFAULT_SUPPORTED_CHAINS} from "@usedapp/core";

/*** UNCOMMENT THE LINES BELOW TO RUN WITH TEST POOL AND ROUTER DATA ***/
// import {TEST_DATA_GOERLI} from "./tests/testDataGoerli";
 //export const ROUTER_ADDRESS = TEST_DATA_GOERLI.router
 //export const POOLS = TEST_DATA_GOERLI.pools;

/*** UNCOMMENT THE LINES BELOW TO RUN WITH YOUR OWN ROUTER ***/
export const ROUTER_ADDRESS = '0xd4C0828FC3C50B75eBdcEE209c7423A7398C4d72'
export const POOLS = undefined;  // leave undefined to get pools dynamically from the router


const Europa = {
  chainId: 2046399126,
  chainName: 'Europa Hub',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x918D8F3670c67f14Ff3fEB025D46B9C165d12a23',
  getExplorerAddressLink: (address) => `https://elated-tan-skat.explorer.mainnet.skalenodes.com/address/${address}`,
  getExplorerTransactionLink: (transactionHash) => `https://elated-tan-skat.explorer.mainnet.skalenodes.com/tx/${transactionHash}`,
  // Optional parameters:
  rpcUrl: 'https://mainnet.skalenodes.com/v1/elated-tan-skat',
  blockExplorerUrl: 'https://elated-tan-skat.explorer.mainnet.skalenodes.com/',
  nativeCurrency: {
    name: 'sFUEL',
    symbol: 'sFUEL',
    decimals: 18,
  }
}

/*
export const DAPP_CONFIG = {
  readOnlyChainId: Localhost.chainId,
  readOnlyUrls: {
    [Localhost.chainId]: "http://127.0.0.1:7545"
  },
}
*/
export const DAPP_CONFIG =  {
  readOnlyChainId: Europa.chainId,
  readOnlyUrls: {
    [Europa.chainId]: Europa.rpcUrl,
  },
  networks: [...DEFAULT_SUPPORTED_CHAINS, Europa],
}


 

