import { LedgerCanister } from "@dfinity/ledger-icp";
import { Actor } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";

// agent will know which is the currently connected wallet
const agent = useAgent()
 

const actor = LedgerCanister.create( {
  agent,
  canisterId: "ryjl3-tyaaa-aaaaa-aaaba-cai",
})
 
const destinationPrincipal = "7u5d5-3p6nl-uc7nq-wregf-tlb6e-h43zs-7uofu-fucbn-2ceeg-6dmu6-hae"
const address = AccountIdentifier.fromPrincipal({
  principal: Principal.fromText(destinationPrincipal),
}).toHex()
 
const transferArgs = {
  to: fromHexString(address),
  fee: { e8s: BigInt(10000) },
  memo: BigInt(0),
  from_subaccount: [],
  created_at_time: [],
  amount: { e8s: BigInt(1000) },
}
const response = await actor.transfer(transferArgs)