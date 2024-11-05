from kybra import Principal, Record, nat, query, update, Vec, Opt
from models import Event

events: Vec[Event] = []

@update
def create_event(event_id: int, title: str, description: str, date: str, price: int) -> Event:
    """
    Create a new event with the given details, including an optional poster image.
    The ID must be unique.
    """
    for event in events:
        if event.id == event_id:
            raise ValueError(f"Event ID {event_id} already exists.")

    event = Event(
        id=event_id,
        title=title,
        description=description,
        date=date,
        price=price,
    )
    events.append(event)
    return event


@query
def get_all_events() -> Vec[Event]:
    """
    Retrieve a list of all events.
    """
    print("All Events:", [(type(event)) for event in events])  # Debugging line
    return events

@query
def get_event(title: str) -> Vec[Event]:
    """
    Search for events by their title.
    """
    matching_events = []
    for event in events:
        if title.lower() in event.title.lower():  # Case-insensitive search
            matching_events.append(event)
    
    return matching_events
