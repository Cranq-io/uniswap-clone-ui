import {Contract} from "@ethersproject/contracts";
import {Alert, Box, Button, FormGroup, FormHelperText, Stack} from "@mui/material";
import {abis} from "@uniswap-v2-app/contracts";
import {ERC20, useContractFunction, useEthers, useTokenAllowance, useTokenBalance} from "@usedapp/core";
import {ethers} from "ethers";
import {formatUnits, parseUnits} from "ethers/lib/utils";
import React, {useState} from "react";
import {ROUTER_ADDRESS} from "../config";
import {AmountIn} from "./AmountIn";
import {AmountOut} from "./AmountOut";
import {CurrencySelector} from "./CurrencySelector";

const getAvailableTokens = pools => pools.reduce((prev, curr) => {
    prev[curr.token0Address] = curr.token0Name;
    prev[curr.token1Address] = curr.token1Name;
    return prev;
  }
  , {});

const getCounterpartTokens = (pools, fromToken) => pools
  .filter((cur) => cur.token0Address === fromToken || cur.token1Address)
  .reduce((prev, curr) => {
    if (curr.token0Address === fromToken) {
      prev[curr.token1Address] = curr.token1Name;
    } else if (curr.token1Address === fromToken) {
      prev[curr.token0Address] = curr.token0Name;
    }
    return prev;
  }, {});

const findPoolByTokens = (pools, fromToken, toToken) => {
  if(!Array.isArray(pools) || !fromToken || !toToken) {
    return undefined;
  }
  return pools.find((cur) =>
    (cur.token0Address === fromToken && cur.token1Address === toToken)
    || (cur.token1Address === fromToken && cur.token0Address === toToken)
  );
}

const isOperationPending = operationState => operationState.status === "PendingSignature" || operationState.status === "Mining";
const isOperationFailed = operationState => operationState.status === "Fail" || operationState.status === "Exception";
const isOperationSucceeded = operationState => operationState.status === "Success";


const getFailureMessage = (swapApproveState, swapExecuteState) => {
  if (isOperationPending(swapApproveState) || isOperationPending(swapExecuteState)) {
    return undefined;
  }
  if (isOperationFailed(swapApproveState)) {
    return "Approval failed - " + swapApproveState.errorMessage;
  }
  if (isOperationFailed(swapExecuteState)) {
    return "Swap failed - " + swapExecuteState.errorMessage;
  }
  return undefined;
};

const getSuccessMessage = (swapExecuteState, swapApproveState) => {
  if(isOperationPending(swapExecuteState) || isOperationPending(swapApproveState)) {
    return undefined
  }
  if(isOperationSucceeded(swapExecuteState)) {
    return "Swap executed successfully";
  }
  if(isOperationSucceeded(swapApproveState)) {
    return "Approval successful";
  }
  return undefined;
};
  
const getBalance = (token, tokenBalance) => formatUnits(
  tokenBalance
  ?? parseUnits("0")
);

const getSwapFunction = () => {
 
    return "swapExactTokensForTokens";
};

export function Exchange(props) {
  const {pools} = props;
  const {account} = useEthers();

  const initialFromToken = pools[0].token0Address;
  const initialToToken = pools[0].token1Address;

  


  const [fromValue, setFromValue] = useState("0");// aqua default swap size 


  const [fromToken, setFromToken] = useState(initialFromToken);
  const [toToken, setToToken] = useState(initialToToken);

  const fromValueBigNumber = parseUnits(fromValue || "0");
  console.log("Exchange: fromValue", fromValueBigNumber, " amount to be approved", fromValue )


  const availableTokens = getAvailableTokens(pools);
  console.log("Exchange: availableTokens", availableTokens)

  const counterpartTokens = getCounterpartTokens(pools, fromToken);
  const pairAddress = findPoolByTokens(pools, fromToken, toToken)?.address ?? "";
  

  const routerContract = new Contract(ROUTER_ADDRESS, abis.router02);
  const fromTokenContract = new Contract(fromToken, ERC20.abi);
  const fromTokenBalance = useTokenBalance(fromToken, account);
  const toTokenBalance = useTokenBalance(toToken, account);
  

  const tokenAllowance = useTokenAllowance(fromToken, account, ROUTER_ADDRESS) || parseUnits("0");
  const approvedNeeded = fromValueBigNumber.gt(tokenAllowance) ;

  
  const formValueIsGreaterThan0 = fromValueBigNumber.gt(parseUnits("0.00000001"));

  const {state: swapApproveState, send: swapApproveSend} = useContractFunction(fromTokenContract, "approve", {
    transactionName: "onApproveRequested",
    gasLimitBufferPercentage: 99
  });

  

  const swapFunction = getSwapFunction();//fromToken, toToken, WETHAddress

  const {
    state: swapExecuteState,
    send: swapExecuteSend
  } = useContractFunction(routerContract, swapFunction, {
    transactionName: swapFunction,
    gasLimitBufferPercentage: 99
  });

  

  const hasEnoughBalance = fromValueBigNumber.lte(fromTokenBalance ?? parseUnits("0"));

  
  const isApproving = isOperationPending(swapApproveState);
  const isSwapping = isOperationPending(swapExecuteState);
  const canApprove = !isApproving && approvedNeeded;
  const canSwap = !approvedNeeded && !isSwapping && formValueIsGreaterThan0 && hasEnoughBalance;

  const successMessage = getSuccessMessage(swapExecuteState, swapApproveState);
  const failureMessage = getFailureMessage(swapApproveState, swapExecuteState);

  const onApproveRequested = () => {
    swapApproveSend(ROUTER_ADDRESS, ethers.constants.MaxUint256);
  };

  

  const onSwapRequested = () => {
    switch(swapFunction) {
      case "swapExactETHForTokens":
        swapExecuteSend(
            0,
            [fromToken, toToken],
            account,
            Math.floor(Date.now() / 1000) + 60 * 20,
            {value: fromValueBigNumber}
            )
          .then(_ => {
            setFromValue("0");
          });
      break;
      case "swapExactTokensForETH":
      swapExecuteSend(
          fromValueBigNumber,
          0,
          [fromToken, toToken],
          account,
          Math.floor(Date.now() / 1000) + 60 * 20)
        .then(_ => {
          setFromValue("0");
        });
      break;
      default: 
        swapExecuteSend(
            fromValueBigNumber,
            0,
            [fromToken, toToken],
            account,
            Math.floor(Date.now() / 1000) + 60 * 20)
          .then(_ => {
            setFromValue("0");
          });
      }    
    };

    

  const onFromValueChange = value => {
    
    const trimmedValue = value.trim();
    try {
      trimmedValue && parseUnits(value);
      setFromValue(value);
      
    } catch (e) {
    }
  };

  const onFromTokenChange = async value => {
    
    setFromToken(value);
  };

  const onToTokenChange = async value => {
   
    setToToken(value);
  };

  // conditions 
    // canApprove 
    // approvedNeeded 
    // isSwapping

    console.error(" can Approve :",canApprove , " approve needed", approvedNeeded , " is approving: ", isApproving)

    console.error(" can Swap :",canSwap , " hasEnoughBalance", hasEnoughBalance , " is swapping: ", isSwapping, " formValueIsGreaterThan0 ", formValueIsGreaterThan0)

  return (
    <div className={"exchange"}>
      <Box className={"rounded filled background"}>
        <Stack spacing={2} direction="column" justifyContent="center">
          <FormGroup row={true} className={"rounded filled group centerContent"}>
            <AmountIn value={fromValue} onChange={onFromValueChange}/>
            <CurrencySelector 
              value={fromToken} 
              onSelect={onFromTokenChange} 
              currencies={availableTokens}/>
          </FormGroup>
          <FormHelperText id = "outlined-weight-helper-text" > {
            fromTokenBalance ? `Balance: ${getBalance(fromToken,  fromTokenBalance)}` : ""
          } </FormHelperText>
          <FormGroup row={true} className={"rounded filled group centerContent"}>
            <AmountOut fromToken={fromToken}
              toToken={toToken}
              amountIn={fromValueBigNumber}
              pairContract={pairAddress} />
            <CurrencySelector value={toToken}
              onSelect={onToTokenChange}
              currencies={counterpartTokens}
              showEmpty={"Select currency"}/>
          </FormGroup>
          <FormHelperText id = "outlined-weight-helper-text" > 
            {toTokenBalance ? `Balance: ${getBalance(toToken,  toTokenBalance)}` : ""}
          </FormHelperText>
        </Stack>

        <Stack alignContent="center" justifyContent="center" spacing={2} direction="row" sx={{paddingTop: "1em"}}>
          {approvedNeeded && !isSwapping
            ?
            <Button variant="contained"
              disabled={!canApprove}
              onClick={onApproveRequested}>{isApproving ? "Approving..." : "Approve"}</Button>
            :
            <Button variant="contained"
              disabled={!canSwap}
              onClick={onSwapRequested}>{isSwapping ? "Swapping..." : (hasEnoughBalance ? "Swap" : `Insufficient balance`)}</Button>
          }
        </Stack>

        {failureMessage ?
          <Alert severity="error">{failureMessage}</Alert>
          : (successMessage ?
            <Alert severity="success">{successMessage}</Alert> : "")}
      </Box>
    </div>
  );
}