import {Contract} from "@ethersproject/contracts";
import {abis} from "@uniswap-v2-app/contracts";
import {useCall} from "@usedapp/core";
import {parseUnits} from "ethers/lib/utils";
import {ROUTER_ADDRESS} from "../config";

/**
 *
 * @param pairAddress {string} Address of the pair contract
 * @param amountIn {BigNumber} Amount of token to give in
 * @param fromToken string Address of the token to give in
 * @param toToken string Address of the token to get out
 * @return {BigNumber} The calculated amountOut
 */
export function useAmountsOut(pairAddress, amountIn, fromToken, toToken) {
  const isValidAmountIn = amountIn.gt(parseUnits("0"));
  const areParamsValid = !!(pairAddress && isValidAmountIn && fromToken && toToken);

  const {error, value} = useCall(areParamsValid && {
    contract: new Contract(ROUTER_ADDRESS, abis.router02),
    method: "getAmountsOut",
    args: [amountIn, [fromToken, toToken]]
  }
  ) ?? {};
  return error ? parseUnits("0") : value?.amounts[1];
}