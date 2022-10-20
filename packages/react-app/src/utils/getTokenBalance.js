import {abis} from "@uniswap-v2-app/contracts";

export async function getTokenBalance(accountAddress, tokenAddress, web3) {
  const tokenABI = abis.erc20.abi;
  const token = new web3.eth.Contract(tokenABI, tokenAddress)

  return await token.methods.balanceOf(accountAddress).call()
}