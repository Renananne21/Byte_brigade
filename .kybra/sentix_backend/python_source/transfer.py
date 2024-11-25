from kybra import query, Principal

@query
def get_pricipal(name: str) -> str:
    caller = Principal.from_str(str(Principal.caller()))
    return f"Hello, {name}! Your PrincipalId is: {caller}"