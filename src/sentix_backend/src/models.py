from kybra import Record, Principal, nat64, nat8

class Event(Record):
    id: nat64 
    title: str
    description: str
    date: str
    price: nat64 


class Ticket(Record):
    id: nat8
    event_id: nat8  
    owner: Principal
    price: nat64
    resale: bool
    resale_price: nat8

class UserTokens(Record):
    user: Principal
    tokens: nat8

class Tokens(Record):
    e8s: nat64
