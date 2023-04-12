import {abis} from "@uniswap-v2-app/contracts";
import {getPairsInfo} from "./getPairsInfo";

export default async function getFactoryInfo(factoryAddress, web3) {
  const factory = new web3.eth.Contract(abis.factory, factoryAddress);

  const factoryInfo = {
    allPairsLength: await factory.methods.allPairsLength().call(),
    allPairs: []
  };

  for (let i = 0; i < factoryInfo?.allPairsLength; ++i) {
    factoryInfo.allPairs[i] = await factory.methods.allPairs(i).call();
  }

  factoryInfo.pairsInfo = await getPairsInfo(factoryInfo.allPairs, web3);
  return factoryInfo;
}