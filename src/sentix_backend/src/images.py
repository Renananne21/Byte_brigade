from kybra import query,update,StableBTreeMap,blob,nat64,Principal,Vec,ic
import secrets 
from models import Image, UploadImageResult


image_store = StableBTreeMap[Principal, Image](memory_id=8, max_key_size=38, max_value_size=3_000_000)


def generate_id() -> Principal:
    random_bytes = secrets.token_bytes(29)

    return Principal.from_hex(random_bytes.hex())

@update
def upload_image(image: blob) -> UploadImageResult:

    id = generate_id()

    new_image:Image = {
        "image_id":id,
        "image":image, 
    }

    image_store.insert(new_image["image_id"], new_image)

    return {"Ok":new_image}

@query
def get_images() -> Vec[Image]:
    return image_store.values()