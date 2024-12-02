from kybra import Record, Principal, nat64, nat8, blob 

class Event(Record):
    id: Principal 
    title: str
    description: str
    date: str
    price: nat64 
    


class Ticket(Record):
    id: Principal
    event_id: Principal 
    owner: Principal
    price: nat64
    resale: bool
    resale_price: nat8

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

class CreateConcert(Variant, total=False):
    Ok: Event
    Err: "CreateEventErr"


class CreateConcertErr(Variant, total=False):
    UserDoesNotExist: Principal

class Image(Record):
    image_id: Principal
    image: blob 

class UploadImageResult(Variant, total=False):
    Ok: Image
    Err: "UploadImageErr"

