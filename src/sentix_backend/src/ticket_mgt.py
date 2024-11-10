from kybra import Vec, Principal, update, query, ic, StableBTreeMap, nat64, Opt
from models import Ticket
from token_mgt import reward_tokens


tickets = StableBTreeMap[nat64, Ticket](
    memory_id=5, max_key_size=80, max_value_size=500
)

@update
def buy_ticket(event_id: nat64, price: nat64) -> Ticket:
    caller_principal = ic.caller()
    
    
    ticket_id = tickets.len() + 1
    
    ticket: Ticket = {
        "id": ticket_id,
        "event_id": event_id,
        "owner": caller_principal,
        "price": price,
        "resale": False,
        "resale_price": 0,
    }
    
    tickets.insert(ticket_id, ticket)
    
    reward_tokens(amount)

    return {"Ok":ticket}


@update
def resale_ticket(ticket_id: nat64, resale_price: nat64) -> Opt[Ticket]:
    caller_principal = ic.caller()
    ticket_opt: Opt[Ticket] = tickets.get(ticket_id)

    ticket = ticket_opt.get()  

    if resale_price > ticket.price * 1.25:
        raise ValueError ("Resale price is too high")

    if ticket.owner != caller_principal:
        return None  

    ticket.resale = True
    ticket.resale_price = resale_price
    
    tickets.insert(ticket_id, ticket)

    ic.print("Ticket is available for resale")

    return ticket 

@update
def buy_resale_ticket(ticket_id: nat64) -> str:
    caller_principal = ic.caller()
    ticket_opt: Opt[Ticket] = tickets.get(ticket_id)
    
    if ticket_opt is None:
        return "Ticket not found."
    
    ticket = ticket_opt.get() 

    if not ticket.resale:
        return "Ticket not available for resale."

    # Update ownership and reset resale properties
    ticket.owner = caller_principal
    ticket.resale = False
    ticket.resale_price = 0  
    
    tickets.insert(ticket_id, ticket)  # Update the ticket in storage
    reward_tokens(caller_principal, 5)  # Reward for buying a resale ticket
    
    return "Resale successful"

@query
def get_ticket(ticket_id: nat64) -> Opt[Ticket]:
    ticket_opt: Opt[Ticket] = tickets.get(ticket_id)
    
    return ticket_opt  
