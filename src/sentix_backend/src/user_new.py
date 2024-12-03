# from kybra import ic, nat64, query, Record, StableBTreeMap, update, Vec, Opt, Principal
# from models import User 


# def generate_id() -> Principal:
#     return ic.caller()


# @update
# def create_user(username: str) -> User:
#     id = generate_id()
#     user: User = {
#         "id": id,
#         "created_at": ic.time(),
#         "creating_ids": [],
#         "username": username,
#     }

#     users.insert(user["id"], user)

#     return user