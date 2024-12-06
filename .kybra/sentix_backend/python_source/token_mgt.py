from kybra import Vec, Principal, update, ic
from models import UserTokens

user_tokens: dict[Principal, UserTokens] = {}

@update
def reward_tokens(amount: int) -> str:
    caller_principal = ic.caller()  
    
    if amount <= 0:
        raise ValueError("Amount must be a positive integer.")
    
    if caller_principal in user_tokens:
        user_tokens[caller_principal].tokens += amount
    else:
        user_tokens[caller_principal] = UserTokens(user=caller_principal, tokens=amount)
    
    return "Tokens rewarded!"

@update
def get_user_tokens() -> int:
    caller_principal = ic.caller()  
    
    if caller_principal in user_tokens:
        return user_tokens[caller_principal].tokens
    return 0  

@update
def spend_tokens(amount: int) -> str:
    caller_principal = ic.caller()  
    
    if amount <= 0:
        raise ValueError("Amount must be a positive integer.")
    
    if caller_principal in user_tokens and user_tokens[caller_principal].tokens >= amount:
        user_tokens[caller_principal].tokens -= amount
        ic.print("Tokens spent successfully!")
        return "Tokens spent successfully!"  
    
    return "Insufficient tokens or user not found."