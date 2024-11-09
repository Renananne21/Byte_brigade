from kybra import nat32, query, update, Vec
from candid_types import User
from state import state, StateUser

@update
def create_user(username: str, join_depth: nat32) -> User:
    id = str(len(state["users"].keys()))

    state_user: StateUser = {
        "id": id,
        "post_ids": [],
        "reaction_ids": [],
        "thread_ids": [],
        "username": username,
    }

    state["users"][id] = state_user

    user = get_user_from_state_user(state_user, join_depth)

    return user