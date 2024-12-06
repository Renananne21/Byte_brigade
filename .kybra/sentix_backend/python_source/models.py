from kybra import Record, Principal, nat64, nat8, blob, Vec, Variant

class Event(Record):
    id: Principal 
    title: str
    description: str
    date: str
    price: nat64 
    image: blob 
    


class Ticket(Record):
    id: Principal
    user_id: Principal
    event_id: Principal
    timestamp: nat64
    price: nat64

class TicketResult(Variant, total=False):
    Ok: Ticket
    Err: str

class UserTokens(Record):
    user: Principal
    tokens: nat8

class Tokens(Record):
    e8s: nat64

class User(Record):
    id: Principal
    created_at: nat64
    creating_ids: Vec[Principal]
    username: str


class CreateConcertErr(Variant, total=False):
    UserDoesNotExist: Principal


class CreateConcert(Variant, total=False):
    Ok: Event
    Err: CreateConcertErr


class Image(Record):
    image_id: Principal
    image: blob 

class UploadImageResult(Variant, total=False):
    Ok: Image
    
