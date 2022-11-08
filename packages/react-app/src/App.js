import {
  Alert, Container,
  Stack
} from "@mui/material";
import {
  useEthers
} from "@usedapp/core";
import React from "react";
import {CurrentBlockNumber} from "./components/CurrentBlockNumber";
import {Exchange} from "./components/Exchange";
import {WalletButton} from "./components/WalletButton";
import {POOLS} from "./config";
import {usePoolsWithWETHAddress} from "./hooks/usePoolsWithWETHAddress";

function App() {
  const {account} = useEthers();
  const [poolsLoading, pools, WETHAddress] = usePoolsWithWETHAddress(POOLS);

  return (
    <>
      <div>
        <Stack justifyContent="right" direction="row" padding="10px">
          <WalletButton/>
        </Stack>
      </div>
      <div>
        <Container maxWidth={"md"}>
          {account
            ? (poolsLoading ? <Alert severity="info">Loading pools, please wait!</Alert> : <Exchange pools={pools} WETHAddress={WETHAddress}/>)
            : <Alert severity="info">Please connect your wallet</Alert>}
        </Container>
      </div>
      <Stack justifyContent={"flex-end"} width={"100%"} direction={"row"} sx={{position: "absolute", bottom: 0}}>
        <CurrentBlockNumber />
      </Stack>
    </>
  );
}

export default App;
