import {Typography} from "@mui/material";
import {useBlockNumber} from "@usedapp/core";

export function CurrentBlockNumber() {
  const blockNumber = useBlockNumber();
  return (
    <Typography variant={"caption"}>
      {blockNumber}
    </Typography>
  );
}