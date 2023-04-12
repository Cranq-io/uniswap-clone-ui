import {useConfig} from "@usedapp/core";
import {useEffect, useState} from "react";
import Web3 from "web3";
import getFactoryInfo from "../utils/getFactoryInfo";
import getRouterInfo from "../utils/getRouterInfo";


export async function loadPoolsWithWETHAddress(providerUrl) {
  const provider = new Web3.providers.HttpProvider(providerUrl);
  const web3 = new Web3(provider);
  
  const routerInfo = await getRouterInfo(web3);
  const factoryInfo = await getFactoryInfo(routerInfo.factory, web3);
  
  return {
    pools: factoryInfo.pairsInfo,
   //
  };
}

export function usePoolsWithWETHAddress(mock) {
  const { readOnlyChainId, readOnlyUrls } = useConfig();
  const [loading, setLoading] = useState(true);
  const [pools, setPools] = useState({});
  //const [WETHAddress, setWETHAddress] = useState("");
  const [, setError] = useState();

  

  useEffect(() => {
    if(mock) {
      setPools(mock);
      setLoading(false);
    }
    else {
      loadPoolsWithWETHAddress(readOnlyUrls[readOnlyChainId])
        .then((data) => {
          setPools(data.pools);
        //  setWETHAddress(data.WETHAddress)
          setLoading(false);
        })
        .catch((error) => {
          // rethrow error in setError to be catchable by ErrorBoundary
          setError(() => {
            throw error;
          });
        })
    }
  }, [mock, readOnlyUrls, readOnlyChainId]);

  return [loading, pools];//, WETHAddress
}
