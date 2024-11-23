import React, { useState, useEffect } from 'react';
import { AuthClient } from "@dfinity/auth-client";
import { createAgent } from "@dfinity/utils";
import { LedgerCanister, AccountIdentifier } from "@dfinity/ledger-icp";

// Ensure Buffer is defined
// import { Buffer } from 'buffer';
// window.Buffer = Buffer; // Make Buffer globally available

const PayComponent = () => {
  const [ledgerCanister, setLedgerCanister] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const initAuth = async () => {
      const authClient = await AuthClient.create();
      const isLoggedIn = await authClient.isAuthenticated();
      setIsAuthenticated(isLoggedIn);

      if (isLoggedIn) {
        await initLedger(authClient);
      }
    };

    initAuth();
  }, []);

  const initLedger = async (authClient) => {
    const identity = await authClient.getIdentity();
    const agent = await createAgent({ identity });
    const ledger = await LedgerCanister.create({ agent });
    setLedgerCanister(ledger);
  };

  const handleLogin = async () => {
    const authClient = await AuthClient.create();
    await authClient.login({
      identityProvider: "http://127.0.0.1:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-ca", 
      onSuccess: async () => {
        setIsAuthenticated(true);
        await initLedger(authClient);
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const amount = BigInt(event.target['icp-amount'].value);
    const destinationHex = event.target.destination.value;

    if (!ledgerCanister) {
      setStatusMessage("Ledger canister not initialized");
      return;
    }

    try {
      
      const destination = AccountIdentifier.fromHex(destinationHex);
      const transferBlockIndex = await ledgerCanister.transfer({
        to: destination.toUint8Array(), 
        fee: { e8s: BigInt(1000) }, 
        memo: 0, 
        from_subaccount: null, 
        created_at_time: null, 
        amount: { e8s: amount }, 
      });

      setStatusMessage(`ICP Transfer successful. Block index: ${transferBlockIndex}`);
    } catch (error) {
      console.error("ICP Transfer failed:", error);
      setStatusMessage(`ICP Transfer failed: ${error.message}`);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="pay-container">
        <h2>Authentication Required</h2>
        <button onClick={handleLogin}>Login with Internet Identity</button>
      </div>
    );
  }

  return (
    <div className="pay-container">
      <h2>Pay for Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="icp-amount">Amount (ICP in motes)</label>
          <input type="number" id="icp-amount" name="icp-amount" placeholder="Enter amount to transfer in motes (1 ICP = 10^8 motes)" required />
        </div>
        <div className="input-group">
          <label htmlFor="destination">Destination Account ID (Hex)</label>
          <input type="text" id="destination" name="destination" placeholder="Enter destination account identifier (hex)" required />
        </div>
        <button type="submit">Transfer ICP</button>
      </form>
      {statusMessage && <div className="status">{statusMessage}</div>}
    </div>
  );
};

export default PayComponent;