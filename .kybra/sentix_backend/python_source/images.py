from kybra import (
    query,
    update,
    StableBTreeMap,
    blob,
    nat64,
    Principal,
    Vec,
    ic,
)

from models import Image, UploadImageResult


image_store = StableBTreeMap[Principal, Image](memory_id=8, max_key_size=38, max_value_size=3_000_000)


def generate_id() -> Principal:
    return ic.caller()

@update
def upload_image(image: blob) -> UploadImageResult:

    id = generate_id()

    images:Image = {
        "image_id":image_id,
        "image":image, 
    }

    image_store.insert(images["image_id"], images)

    return {"Ok":images}