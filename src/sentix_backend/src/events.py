from kybra import ic, nat64, query, Record, StableBTreeMap, update, Vec, Opt
from models import Event
# Define the Event record
# class Event(Record):
#     id: nat64
#     title: str
#     description: str
#     date: str
#     price: nat64

events = StableBTreeMap[nat64, Event](
    memory_id=0, max_key_size=80, max_value_size=1000
)


@update
def create_user(username: str) -> User:
    id = generate_id()
    user: User = {
        "id": id,
        "created_at": ic.time(),
        "creating_ids": [],
        "username": username,
    }

    users.insert(user["id"], user)

    return user



@update
def create_event(eventId: nat64, title: str, description: str, date: str, price: nat64) -> Event:
    """
    Create a new event with the given details.
    """
    # if events.contains(event_id):
    #     raise ValueError(f"Event ID {event_id} already exists.")

    event: Event = {
        "id": eventId,
        "title": title,
        "description": description,
        "date": date,
        "price": price,
        
    }

    events.insert(eventId, event)
    return event

@query
def get_all_events() -> Vec[Event]:
    """
    Retrieve a list of all events.
    """
    return events.values()




@query
def get_event(eventId: nat64) -> Opt[Event]:
    """
    Retrieve an event by its ID.
    """
    return events.get(eventId)
