from kybra import Vec, Principal, update, query, ic 
from models import Ticket
from token_mgt import reward_tokens
from typing import Dict

tickets: Vec[Ticket] = []
user_ticket_count: Dict[Principal, int] = {}
max_tickets = 10

@update
def buy_ticket(event_id: int, price: int) -> Ticket:
    caller_principal = ic.caller()
    
    if user_ticket_count.get(caller_principal, 0) >= max_tickets:
        raise ValueError("Ticket purchase limit reached.")
    
    ticket_id = len(tickets) + 1
    ticket = Ticket(
        id=ticket_id,
        event_id=event_id,
        owner=caller_principal,
        price=price,
        resale=False,
        resale_price=0  
    )
    tickets.append(ticket)

    
    user_ticket_count[caller_principal] = user_ticket_count.get(caller_principal, 0) + 1
    reward_tokens(caller_principal, 10)  

    return ticket

@update
def resale_ticket(ticket_id: int, resale_price: int) -> str:
    caller_principal = ic.caller()
    for ticket in ticket.items():
        if ticket.id == ticket_id and ticket.owner == caller_principal:
            # Resale price does not exceed 25% of original price
            if resale_price > ticket.price * 1.25:
                raise ValueError("Resale price cannot exceed 25% of the original price.")
            
            ticket.resale = True
            ticket.resale_price = resale_price
            return "Ticket is available for resale"
    return "Ticket not found or you are not the owner"

@update
def buy_resale_ticket(ticket_id: int) -> str:
    caller_principal = ic.caller()
    for ticket in tickets:
        if ticket.id == ticket_id and ticket.resale:
            ticket.owner = caller_principal
            ticket.resale = False
            ticket.resale_price = 0  
            reward_tokens(caller_principal, 5)  
            return "Resale successful"
    return "Ticket not found or not available for resale"

@query
def get_ticket(ticket_id: int) -> Ticket:
    for ticket in tickets:
        if ticket.id == ticket_id:
            return ticket
    raise ValueError("Ticket not found.")
