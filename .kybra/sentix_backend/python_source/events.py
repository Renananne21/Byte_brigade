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
def create_event(title: str, description: str, date: str, price: nat64) -> Event:
    """
    Create a new event with the given details.
    The event ID must be unique.
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

# @query
# def get_event_by_title(title: str) -> Vec[Event]:
#     """
#     Search for events by their title.
#     """
#     matching_events = [event for event in events.values() if event.title == title]
#     return Vec(matching_events)

@query
def get_event(eventId: nat64) -> Opt[Event]:
    """
    Retrieve an event by its ID.
    """
    return events.get(eventId)
