from kybra import (
    query,
    update,
    StableBTreeMap,
    blob,
    nat64,
    Principal,
)

from models import Image, UploadImageResult


image_store = StableBTreeMap[Principal, Image](memory_id=8, max_key_size=38, max_value_size=3_000_000)

@update
def upload_image(image: blob) -> UploadImageResult:

    id = generate_id()

    images:Image = {
        "id":id,
        "image":image, 
    }

    image_store.insert(images["id"], images)

    return {"Succesfull":images}