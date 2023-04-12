import {MenuItem, Select} from "@mui/material";
import React from "react";

export function CurrencySelector(props) {
  const {value, onSelect, currencies, showEmpty} = props;

  const overrideTokenName = (token, tokenName) => {
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