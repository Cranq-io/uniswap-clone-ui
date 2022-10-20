import {Contract} from "@ethersproject/contracts";
import {useCall, useCalls} from "@usedapp/core";
import {FACTORY_ADDRESS} from "../config";
import { abis } from "@uniswap-v2-app/contracts";

export function useFactoryPairs() {
  const res = useCall({
      contract: new Contract(FACTORY_ADDRESS, abis.factory),
      method: "allPairsLength",
      args: []
    }
  );
  const pairsLength = res?.value ?? 0

  const calls = [];
  for (var i = 0; i < pairsLength; i++) {
    calls.push({
      contract: new Contract(FACTORY_ADDRESS, abis.factory),
      method: "allPairs",
      args: [i]
    });
  }
  const pairResults = useCalls(calls) ?? [];
  pairResults.forEach((result) => {
    if (result && result.error) {
      console.error(result.error.message);
    }
  });
  return pairResults.map(result => result?.value);
}