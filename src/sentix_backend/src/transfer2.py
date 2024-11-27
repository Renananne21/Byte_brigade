# from kybra import (
#     Async,
#     CallResult,
#     match,
#     nat64,
#     Principal,
#     Service,
#     service_update,
#     update,
#     Variant,
# )
# from kybra.canisters.ledger import Address,Archives,Ledger,TransferResult


# class TokenCanister(Service):
#     @service_update
#     def transfer(self, to: Address, amount: nat64, fee: Opt[nat64]) -> nat64:
#         from_ = ic.caller()

#         from_balance = accounts.get(from_) or 0
#         to_balance = accounts.get(to) or 0

#         accounts.insert(from_, from_balance - amount)
#         accounts.insert(to, to_balance + amount)

#         return amount


# token_canister = TokenCanister(Principal.from_str("ryjl3-tyaaa-aaaaa-aaaba-cai"))


# class PayoutResult(Variant, total=False):
#     Ok: nat64
#     Err: str


# @update
# def payout(to: Address, amount: nat64) -> Async[PayoutResult]:
#     result: CallResult[nat64] = yield token_canister.transfer(
#         {
#                 "memo": 0,
#                 "amount": {"e8s": amount},
#                 "from_subaccount": None,
#                 "to": bytes.fromhex(to),
#                 "created_at_time": None
#                 if fee is None
#                 else {"timestamp_nanos": fee},
#             }
        
#     )

#     return match(result, {"Ok": lambda ok: {"Ok": ok}, "Err": lambda err: {"Err": err}})
