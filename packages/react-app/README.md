# @uniswap-v2-app/react-app

This package is a fork of the default app built with [Create React App](https://github.com/facebook/create-react-app).

## Before you start

This project was created for learning purpose. <br />

## Local testing setup
In order to run with local chain with ganache go to the config.js set ROUTER_ADDRESS given by the CRANQ application.
Set the DAPP_CONFIG to localhost:
``` 
export const DAPP_CONFIG = {
  readOnlyChainId: Localhost.chainId,
  readOnlyUrls: {
    [Localhost.chainId]: "http://127.0.0.1:7545"
  },
}
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make changes to the code.<br>
You will see the build errors and lint warnings in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the React documentation on [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

