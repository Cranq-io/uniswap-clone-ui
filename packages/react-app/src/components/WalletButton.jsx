import {Button} from "@mui/material";
import {shortenAddress, useEthers, useLookupAddress} from "@usedapp/core";
import React, {useEffect, useState} from "react";

export function WalletButton() {
  const [rendered, setRendered] = useState("");

  const {ens} = useLookupAddress();
  const {account, activateBrowserWallet, deactivate} = useEthers();

  useEffect(() => {
    if (ens) {
      console.log(ens);
      setRendered(ens);
    } else if (account) {
      setRendered(shortenAddress(account));
    } else {
      setRendered("");
    }
  }, [account, ens, setRendered]);

  return (
    <Button variant="contained"
      onClick={() => {
        if (!account) {
          activateBrowserWallet();
        } else {
          deactivate();
        }
      }}
    >
      {rendered === "" && "Connect Wallet"}
      {rendered !== "" && rendered}
    </Button>
  );
}