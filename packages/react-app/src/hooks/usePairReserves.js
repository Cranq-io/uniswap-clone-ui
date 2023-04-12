import {Contract} from "@ethersproject/contracts";
import {abis} from "@uniswap-v2-app/contracts";
import {useCall} from "@usedapp/core";

export function usePairReserves(pairAddress) {
  
  const res = useCall({
    contract: new Contract(pairAddress, abis.pair),
    method: "getReserves",
    args: []
    });

  if (res?.value) {
    return {
      reserve0: res.value[0],
      reserve1: res.value[1]
    }
  }
 
}