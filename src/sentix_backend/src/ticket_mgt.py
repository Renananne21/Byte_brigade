from kybra import Vec, Principal, update, query, ic, StableBTreeMap, nat64, Opt
from models import Ticket, User, Event
# from token_mgt import reward_tokens

users = StableBTreeMap[Principal, User](
    memory_id=0, max_key_size=38, max_value_size=100_000
)

tickets = StableBTreeMap[Principal, Ticket](
    memory_id=5, max_key_size=80, max_value_size=500
)

events = StableBTreeMap[Principal, Event](memory_id=1, max_key_size=38, max_value_size=5_000)

def generate_id() -> Principal:
    return Principal.from_str(str(ic.id()))

@update
def buy_ticket(event_id: Principal, price: nat64) -> TicketResult:
    user_id = ic.caller()

    user = users.get(user_id)
    
    if user is None:
        return {"Err": "User does not exist"}

    event = events.get(event_id)
    if event is None:
        return {"Err": "Event does not exist"}

    if payment_amount < event["price"]:
        return {"Err": f"Insufficient payment. Required: {event['price']}, Provided: {payment_amount}"}

    for ticket in tickets.values():
        if ticket["user_id"] == user_id and ticket["event_id"] == event_id:
            return {"Err": "You have already booked this event"}

    ticket_id = generate_id()
    
    ticket: Ticket = {
        "id": ticket_id,
        "user_id": user_id,
        "event_id": event_id,
        "timestamp": ic.time(),
    }
    
    tickets.insert(ticket['id'], ticket)

    #Keep track of a users tickets
    new_user: User = {
        **user,
        "booking_ids": [*user["booking_ids"], ticket_id],
    }
    users.insert(user_id, new_user)

    return {"Ok":ticket}


@update
def resale_ticket(ticket_id: Principal, resale_price: nat64) -> Opt[Ticket]:
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
    
    tickets.insert(ticket_id, ticket)  
    reward_tokens(caller_principal, 5)  
    
    return "Resale successful"

@query
def get_ticket(ticket_id: Principal) -> Opt[Ticket]:
    ticket_opt: Opt[Ticket] = tickets.get(ticket_id)
    
    return ticket_opt  
