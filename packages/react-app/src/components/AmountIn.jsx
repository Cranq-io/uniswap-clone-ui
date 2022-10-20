import {Input} from "@mui/material";
import React from "react";

export function AmountIn(props) {
  const {value, onChange} = props;

  return <Input
    sx={{fontSize: "2em"}}
    disableUnderline={true}
    autoComplete={"off"}
    id="outlined-adornment-weight"
    value={value}
    onChange={(e) => typeof onChange === "function" && onChange(e.target.value)}
  />;
}