export default function Troubleshooting() {
    return (
        <div>
            <p>To fix the error, please, double check your setup first</p>
            <ul>
                <li>readOnlyChainId in config.js is set to the id of the ethereum chain you're using</li>
                <li>readOnlyUrl for the readOnlyChainId in config.js is set to a valid URL where a running node is available</li>
                <li>ROUTER_ADDRESS is set to the adress of the Router contract you deployed previously to the network you intend to use</li>
                <li>Metamask extension is installed and enabled in your browser</li>
                <li>Metamask is set to use the same network (same chainId) as set in config.js</li>
            </ul>
            <p>If running on a local chain (Ganache, Hardhat), please also make sure</p>
            <ul>
                <li>the local chanin is started</li>
                <li>Upon first run, if requested by Metamask, you confirmed deployment of the MultiCall contract</li>
                <li>... and as last resort you may need the clear the Local Storage of your browser for the current url</li>
            </ul>
        </div>
    )
};
