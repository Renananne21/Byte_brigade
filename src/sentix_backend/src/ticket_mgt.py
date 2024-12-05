from kybra import Vec, Principal, update, query, ic, StableBTreeMap, nat64, Opt
from models import Ticket
from token_mgt import reward_tokens

users = StableBTreeMap[Principal, User](
    memory_id=0, max_key_size=38, max_value_size=100_000
)

tickets = StableBTreeMap[Principal, Ticket](
    memory_id=5, max_key_size=80, max_value_size=500
)


@update
def buy_ticket(eventID: nat64, price: nat64) -> Ticket:
    caller_principal = ic.caller()
    
    
    ticketID = tickets.len() + 1
    
    ticket: Ticket = {
        "id": ticketID,
        "event_id": eventID,
        "owner": caller_principal,
        "price": price,
        "resale": False,
        "resale_price": 0,
    }
    
    tickets.insert(ticketID, ticket)
    
    reward_tokens(amount)

    return {"Ok":ticket}


@update
def resale_ticket(ticketID: nat64, resale_price: nat64) -> Opt[Ticket]:
    caller_principal = ic.caller()
    ticket_opt: Opt[Ticket] = tickets.get(ticket_id)

    ticket = ticket_opt.get()  

    if resale_price > ticket.price * 1.25:
        raise ValueError ("Resale price is too high")

    if ticket.owner != caller_principal:
        return None  

    ticket.resale = True
    ticket.resale_price = resale_price
    
    tickets.insert(ticketID, ticket)

    ic.print("Ticket is available for resale")

    return ticket 

@update
def buy_resale_ticket(ticketID: nat64) -> str:
    caller_principal = ic.caller()
    ticket_opt: Opt[Ticket] = tickets.get(ticketID)
    
    if ticket_opt is None:
        return "Ticket not found."
    
    ticket = ticket_opt.get() 

    if not ticket.resale:
        return "Ticket not available for resale."

    # Update ownership and reset resale properties
    ticket.owner = caller_principal
    ticket.resale = False
    ticket.resale_price = 0  
    
    tickets.insert(ticketID, ticket)  
    reward_tokens(caller_principal, 5)  
    
    return "Resale successful"

@query
def get_ticket(ticketID: nat64) -> Opt[Ticket]:
    ticket_opt: Opt[Ticket] = tickets.get(ticketID)
    
    return ticket_opt  
