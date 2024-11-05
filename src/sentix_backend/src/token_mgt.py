from kybra import Vec, Principal, update
from models import UserTokens


user_tokens: dict[Principal, UserTokens] = {}

@update
def reward_tokens(buyer: Principal, amount: int) -> str:
    if amount <= 0:
        raise ValueError("Amount must be a positive integer.")
    
    if buyer in user_tokens:
        user_tokens[buyer].tokens += amount
    else:
        user_tokens[buyer] = UserTokens(user=buyer, tokens=amount)
    
    return "Tokens rewarded!"

@update
def get_user_tokens(user: Principal) -> int:
    if user in user_tokens:
        return user_tokens[user].tokens
    return 0  

@update
def spend_tokens(user: Principal, amount: int) -> str:
    if amount <= 0:
        raise ValueError("Amount must be a positive integer.")
    
    if user in user_tokens and user_tokens[user].tokens >= amount:
        user_tokens[user].tokens -= amount
        return "Tokens spent successfully!"
    return "Insufficient tokens or user not found."
