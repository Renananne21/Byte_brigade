import { Principal } from '@dfinity/principal';
import React from 'react';
import XtcIDL from '../idls/xtc.did';



export const TTX_CANISTER_ID = 'aanaa-xaaaa-aaaah-aaeiq-cai';


const TRANSFER_XTC_TX = {
  idl: XtcIDL,
  canisterId: TTX_CANISTER_ID,
  methodName: 'transfer',
  args: [{ to: Principal.fromText('7u5d5-3p6nl-uc7nq-wregf-tlb6e-h43zs-7uofu-fucbn-2ceeg-6dmu6-hae'), amount: BigInt(1400000), from: [] }],
  onSuccess: async (res) => {
    console.log('transferred TTX successfully');
  },
  onFail: (res) => {
    console.log('transfer TTX error', res);
  },
};

const BatchTransactionsExample = () => {
  const randomTransfers = async () => {
    console.log('Doing a bunch of transfers');
    await window.ic.plug.batchTransactions([TRANSFER_XTC_TX])
    console.log('Done!');
  }
  return (
    <div className="batch-transactions-container">
      <h2>Batch Transactions Example</h2>
      <button type="button" onClick={randomTransfers}>Random Transactions</button>
    </div>
  )
}
export default BatchTransactionsExample;