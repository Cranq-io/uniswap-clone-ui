import {useConfig} from "@usedapp/core";
import {useEffect, useState} from "react";
import Web3 from "web3";
import {ROUTER_ADDRESS} from "../config";
import getFactoryInfo from "../utils/getFactoryInfo";
import getRouterInfo from "../utils/getRouterInfo";


export async function loadPools(providerUrl) {
  const provider = new Web3.providers.HttpProvider(providerUrl);
  const web3 = new Web3(provider);
  const routerInfo = await getRouterInfo(ROUTER_ADDRESS, web3);
  const factoryInfo = await getFactoryInfo(routerInfo.factory, web3);
  return factoryInfo.pairsInfo;
}

export function usePools(mock) {
  const { readOnlyChainId, readOnlyUrls } = useConfig();
  const [loading, setLoading] = useState(true);
  const [pools, setPools] = useState({});
  useEffect(() => {
    if(mock) {
      setPools(mock);
      setLoading(false);
    }
    else {
      loadPools(readOnlyUrls[readOnlyChainId])
        .then((pools) => {
          setPools(pools);
          setLoading(false);
        })
    }

  }, [mock, readOnlyUrls, readOnlyChainId]);

  return [loading, pools];
}
