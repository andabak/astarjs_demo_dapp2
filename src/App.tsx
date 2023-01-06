import React from 'react';
import logo from './logo.svg';
import './App.css';

import '@polkadot/api-augment';

import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { options } from '@astar-network/astar-api';
import { stringToHex } from "@polkadot/util";
import { web3Accounts, web3Enable, web3FromSource, web3FromAddress } from '@polkadot/extension-dapp';


function App() {
  const connect = async () => {
    //const endpointURL = 'ws://localhost:9944';
    //const endpointURL = 'wss://shiden.api.onfinality.io/public-ws';
    //const endpointURL = 'wss://rpc.shiden.astar.network';
    const endpointURL = 'wss://rpc.shibuya.astar.network';
    console.log("Opening connection to %s", endpointURL);    
    const provider = new WsProvider(endpointURL);
    const api = new ApiPromise(options({ provider }));
    await api.isReady;

    console.log("hello here");
    
    // Use the api
    // For example:
    console.log((await api.rpc.system.properties()).toHuman());
    console.log(api.consts.balances.existentialDeposit.toNumber());
    console.log("hello there");




    // Retrieve the chain name
    //const chain = await api.rpc.system.chain();
    //const lastHeader = await api.rpc.chain.getHeader();
    //console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);



    const DEV_ACC_1 = '5HGnBkBFu5T8Psb2GswBc6FNjAmpGaRNYZxpZ4orS8u5tYig'; // Andabak Dev Account (Green) 
    //Shibuya encoding: b9Nd39LgK6EchcrmBPJdkQepDUwEo87ZmTxnn1iJVu3UnFc
    const DEV_ACC_2 = '5GNPhLX6AXw7QKLgrUTXppYnh8Qf431qAa3RuEosMTxFaVMv'; // Andabak Dev Account //2
    //Shibuya encoding: b9Nd39LgK6EchcrmBPJdkQepDUwEo87ZmTxnn1iJVu3UnFc
  

    //GET BALANCE
    const now = await api.query.timestamp.now();
    // Retrieve the account balance & nonce via the system module
    const { nonce, data: balance } = await api.query.system.account(DEV_ACC_1);
    console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);
    const { data: balance2 } = await api.query.system.account(DEV_ACC_2);
    console.log(`${now}: balance of ${balance2.free}`);
    

    // returns an array of all the injected sources
    // (this needs to be called first, before other requests)
    const allInjected = await web3Enable('My 1st dApp');

    // returns an array of { address, meta: { name, source } }
    // meta.source contains the name of the extension that provides this account
    const allAccounts = await web3Accounts();

    
    // finds an injector for an address
    const injector = await web3FromAddress(DEV_ACC_1);

    // sign and send our transaction - notice here that the address of the account
    // (as retrieved injected) is passed through as the param to the `signAndSend`,
    // the API then calls the extension to present to the user and get it signed.
    // Once complete, the api sends the tx + signature via the normal process
    api.tx.balances
      .transfer(DEV_ACC_2, 5000000)
      .signAndSend(DEV_ACC_1, { signer: injector.signer }, (status) => {
        console.log(`Submitted and status is...`);
    /*     if (status.isInBlock) {
          console.log(`Completed at block hash #${status.asInBlock.toString()}`);
        } else {
          console.log(`Current status: ${status.type}`);
        }
     */  }).catch((error: any) => {
        console.log(':( transaction failed', error);

      });




/* 
    const txHash = await api.tx.balances
      .transfer(DEV_ACC_1, 12345)
      .signAndSend(DEV_ACC_1);
    // Show the hash
    console.log(`Submitted with hash ${txHash}`);
    
 */
    console.log(`.::End of action::.`);
    
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={connect}> Connect</button>
      </header>
    </div>
  );
}

export default App;
