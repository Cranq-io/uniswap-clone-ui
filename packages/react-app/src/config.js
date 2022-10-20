import {Localhost} from "@usedapp/core";

/*** UNCOMMENT THE LINES BELOW TO RUN WITH TEST POOL AND ROUTER DATA ***/
// import {TEST_DATA_GOERLI} from "./tests/testDataGoerli";
// export const ROUTER_ADDRESS = TEST_DATA_GOERLI.router
// export const POOLS = TEST_DATA_GOERLI.pools;

/*** UNCOMMENT THE LINES BELOW TO RUN WITH YOUR OWN ROUTER ***/
export const ROUTER_ADDRESS = '0x832d668a89556A055c04d941245356EF23dCD9dc'
export const POOLS = undefined;  // leave undefined to get pools dynamically from the router
export const COIN_NAME = "BNB";

export const DAPP_CONFIG = {
  readOnlyChainId: Localhost.chainId,
  readOnlyUrls: {
    [Localhost.chainId]: "http://127.0.0.1:7545"
  },
}

