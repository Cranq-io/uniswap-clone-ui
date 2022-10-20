import {Goerli} from "@usedapp/core";

/*** UNCOMMENT THE LINES BELOW TO RUN WITH TEST POOL AND ROUTER DATA ***/
// import {TEST_DATA_GOERLI} from "./tests/testDataGoerli";
// export const ROUTER_ADDRESS = TEST_DATA_GOERLI.router
// export const POOLS = TEST_DATA_GOERLI.pools;

/*** UNCOMMENT THE LINES BELOW TO RUN WITH YOUR OWN ROUTER ***/
export const ROUTER_ADDRESS = '0x8d7A20f1E01537ebb540f875D442eE14c69E1E89'
export const POOLS = undefined;  // leave undefined to get pools dynamically from the router

export const DAPP_CONFIG = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [Goerli.chainId]: "https://eth-goerli.g.alchemy.com/v2/U6-dauhf_HHTYSmyoN7U82eVPHbjcp-6"
  },
}

