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


# class TransferResult(Variant, total=False):
#     Ok: nat64
#     Err: "TransferError"


# class TransferError(Variant, total=False):
#     InsufficientBalance: nat64


# @update
# def transfer(to: Principal, amount: nat64) -> TransferResult:
#     from_ = ic.caller()

#     from_balance = accounts.get(from_) or 0

#     if from_balance < amount:
#         return {"Err": {"InsufficientBalance": from_balance}}

#     to_balance = accounts.get(to) or 0

#     accounts.insert(from_, from_balance - amount)
#     accounts.insert(to, to_balance + amount)

#     return {"Ok": amount}



# token_canister = TokenCanister(Principal.from_str("r7inp-6aaaa-aaaaa-aaabq-cai"))


# class PayoutResult(Variant, total=False):
#     Ok: nat64
#     Err: str


# @update
# def payout(to: Principal, amount: nat64) -> Async[PayoutResult]:
#     call_result: CallResult[TransferResult] = yield token_canister.transfer(to, amount)

#     def handle_transfer_result_ok(transfer_result: TransferResult) -> PayoutResult:
#         return match(
#             transfer_result,
#             {
#                 "Ok": lambda ok: {"Ok": ok},
#                 "Err": lambda err: {"Err": str(err)},
#             },
#         )

#     return match(
#         call_result,
#         {
#             "Ok": handle_transfer_result_ok,
#             "Err": lambda err: {"Err": err},
#         },
#     )
