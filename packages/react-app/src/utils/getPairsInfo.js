import {abis} from "@uniswap-v2-app/contracts";

export async function getPairsInfo(pairAddresses, web3) {
  const pairsInfo = [];
  const pairABI = abis.pair;
  const tokenABI = abis.erc20.abi;

  for (let i = 0; i < pairAddresses.length; ++i) {
    const pairAddress = pairAddresses[i];
    const pair = new web3.eth.Contract(pairABI, pairAddresses[i]);

    const token0Address = await pair.methods.token0().call();
    const token1Address = await pair.methods.token1().call();
    const token0Contract = new web3.eth.Contract(tokenABI, token0Address);
    const token1Contract = new web3.eth.Contract(tokenABI, token1Address);
    const token0Name = await token0Contract.methods.name().call();
    const token1Name = await token1Contract.methods.name().call();
    const reserves = await pair.methods.getReserves().call();

    pairsInfo.push({
      address: pairAddress,
      token0Address,
      token1Address,
      token0Name,
      token1Name,
      reserve0: reserves._reserve0,
      reserve1: reserves._reserve1
    });
  }

  return pairsInfo;
}