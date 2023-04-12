import {abis} from "@uniswap-v2-app/contracts";
import {ROUTER_ADDRESS} from "../config";

export default async function getRouterInfo(web3) {
  console.log("getRouterInfo: Address: ", ROUTER_ADDRESS)
  const router = new web3.eth.Contract(abis.router02, ROUTER_ADDRESS);
  return {
    factory: await router.methods.factory().call(),
   // WETH: await router.methods.WETH().call()
  };
}