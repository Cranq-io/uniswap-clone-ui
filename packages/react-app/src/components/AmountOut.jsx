import {Input} from "@mui/material";
import {formatUnits} from "ethers/lib/utils";
import React from "react";
import {useAmountsOut} from "../hooks/useAmountsOut";

/**
 * Displays the amountOut
 * @param props {string} Props
 * @return {JSX.Element}
 * @constructor
 */
export function AmountOut(props) {
  const {pairContract, amountIn, fromToken, toToken} = props;
  const amountOut = useAmountsOut(pairContract, amountIn, fromToken, toToken) ?? 0;
  return <Input
    disableUnderline
    sx={{fontSize: "2em"}}
    id="amountOut"
    value={formatUnits(amountOut)}
    disabled
  />;
}