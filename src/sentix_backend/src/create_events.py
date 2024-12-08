from kybra import ic, nat64, query, Record, StableBTreeMap, update, Vec, Opt, Principal, blob , nat8, Tuple 
from models import Event, User, CreateConcert, CreateConcertErr
import secrets 
from images import upload_image, get_images

events = StableBTreeMap[Principal, Event](
    memory_id=7, max_key_size=80, max_value_size=5_000
)

users = StableBTreeMap[Principal, User](
    memory_id=3, max_key_size=38, max_value_size=100_000
)


def generate_id() -> Principal:
    random_bytes = secrets.token_bytes(29)

    return Principal.from_hex(random_bytes.hex())

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
def create_event(title: str, description: str, date: str, price: nat64, image: Vec[nat8]) -> CreateConcert:
    """
    Create a new event with the given details.
    """

    image = get_images()
    # user_id = ic.caller()

    # user = users.get(user_id)

    # if user is None:
    #     return {"Err": {"UserDoesNotExist": user_id}}
    
    id = generate_id()

    concert: Event = {
        "id": id,
        "title": title,
        "description": description,
        "date": date,
        "price": price,
        "image": image,
        
    }
    

    events.insert(concert['id'], concert)
    ic.print(f"Event ID: {concert['id']}, Data: {concert}")

    # new_user: User = {
    #     "id": user["id"],
    #     "created_at": user["created_at"],
    #     "username": user["username"],
    #     "creating_ids": [*user["creating_ids"], concert["id"]],
    # }

    # users.insert(new_user["id"], new_user)

    return {"Ok": concert}

#Fetch all the events defined in the dictionary.
@query
def get_events() -> Vec[Event]:
    data = events.values()
    ic.print(f"Retrieved events: {data}")
    return data 

#Fetch all the users. 
@query
def get_users() -> Vec[User]:
    return users.values()


@query
def get_all_events() -> Vec[Event]:
    """
    Retrieve a list of all events.
    """
    return events.values()




@query
def get_event_by_id(id: Principal) -> Opt[Event]:
    """
    Retrieve an event by its ID.
    """
    return events.get(id)