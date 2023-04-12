import {
  Alert, Container,
  Stack
} from "@mui/material";
import {
  useEthers
} from "@usedapp/core";
import React from "react";
import {Exchange} from "./Exchange";
import {WalletButton} from "./WalletButton";
import {POOLS} from "../config";
import {usePoolsWithWETHAddress} from "../hooks/usePoolsWithWETHAddress";

function App() {
  const {account, error} = useEthers();
  const [poolsLoading, pools] = usePoolsWithWETHAddress(POOLS);
  if(error) {
    console.error("Ethers Failed to Load")
    throw error;
  }

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
            ? (poolsLoading ? <Alert severity="info">Loading pools, please wait!</Alert> : <Exchange pools={pools}/>)
            : <Alert severity="info">Please connect your wallet</Alert>}
        </Container>
      </div>
      <Stack justifyContent={"flex-end"} width={"100%"} direction={"row"} sx={{position: "absolute", bottom: 0}}>
      
      </Stack>
    </>
  );
}
export default App;
