import {MenuItem, Select} from "@mui/material";
import React from "react";
import { COIN_NAME } from "../config";

export function CurrencySelector(props) {
  const {value, onSelect, currencies, showEmpty, WETHAddress} = props;

  const overrideTokenName = (token, tokenName) => {
    if(token === WETHAddress) {
      return COIN_NAME;
    }
    return tokenName;
  }

  return <Select
    sx={{width: "24ch"}}
    variant={"standard"}
    disableUnderline={true}
    id="from-token-select"
    value={Object.keys(currencies).includes(value) ? value : ""}
    displayEmpty={!!showEmpty}
    onChange={(e) => typeof onSelect === "function" && onSelect(e.target.value)}
  >
    {showEmpty ? <MenuItem value="">{showEmpty}</MenuItem> : null}
    {
      Object.entries(currencies)
        .map(([token, tokenName], index) => <MenuItem key={index} value={token}>{overrideTokenName(token, tokenName)}</MenuItem>)
    }
  </Select>;
}