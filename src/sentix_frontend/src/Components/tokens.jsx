import React, { useState } from "react";
import { IcrcLedgerCanister } from "@dfinity/ledger-icrc";

const Transfer = () => {
  const [recipientPrincipal, setRecipientPrincipal] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleTransfer = async (e) => {
    e.preventDefault();
    const ledger = new IcrcLedgerCanister();

    const transferArgs = {
      to: { owner: recipientPrincipal },
      amount: BigInt(amount),
    };

    try {
      const result = await ledger.transfer(transferArgs);
      setMessage(`Transfer successful: ${JSON.stringify(result)}`);
    } catch (error) {
      setMessage(`Transfer failed: ${error.message}`);
    }
  };

  return (
    <div className="transfer-container">
      <h2>Transfer Tokens</h2>
      <form onSubmit={handleTransfer}>
        <div className="form-group">
          <label htmlFor="recipient">Recipient Principal ID:</label>
          <input
            type="text"
            id="recipient"
            value={recipientPrincipal}
            onChange={(e) => setRecipientPrincipal(e.target.value)}
            required
            placeholder="Enter Principal ID"
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder="Enter amount"
          />
        </div>
        <button type="submit" className="transfer-button">
          Transfer
        </button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default Transfer;
