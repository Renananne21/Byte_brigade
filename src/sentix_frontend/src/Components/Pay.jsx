import React, { useState } from 'react';
import { Artemis } from 'artemis-web3-adapter';

const connectObj = {
  whitelist: ['ryjl3-tyaaa-aaaaa-aaaba-cai'], // Adjust as needed
  host: 'https://icp0.io/', // Ensure this URL is correct
};

const artemisAdapter = new Artemis(connectObj); // Initialize the adapter

const TransferICPComponent = () => {
  const [amount, setAmount] = useState(1000); // Default amount
  const [destinationPrincipal, setDestinationPrincipal] = useState(''); // Destination principal

  const handleTransfer = async () => {
    if (!destinationPrincipal || !amount) {
      alert("Please enter a valid destination principal and amount.");
      return;
    }

    try {
      // Attempt to connect to the wallet
      await artemisAdapter.connect();

      // Use the requestICPTransfer method for the transfer
      const response = await artemisAdapter.requestICPTransfer({
        to: destinationPrincipal,
        amount: amount,
      });

      console.log("Transfer successful:", response);
      alert("Transfer successful!");
    } catch (error) {
      console.error("Transfer failed:", error);
      alert("Transfer failed: " + error.message);
    }
  };

  return (
    <div className="transfer-icp">
      <h1>Transfer ICP Tokens</h1>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="destination">Destination Principal:</label>
        <input
          type="text"
          id="destination"
          value={destinationPrincipal}
          onChange={e => setDestinationPrincipal(e.target.value)}
        />
      </div>
      <button onClick={handleTransfer}>Transfer ICP</button>
    </div>
  );
};

export default TransferICPComponent;