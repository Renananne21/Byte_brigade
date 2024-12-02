from kybra import (
    query,
    update,
    StableBTreeMap,
    blob,
    nat64,
)

# A simple storage using StableBTreeMap to persist images
image_store = StableBTreeMap[str, blob](memory_id=6, max_key_size=100, max_value_size=1000)

@update
def upload_image(image_id: str, image_data: blob) -> str:
    """
    Uploads an image to the storage.
    :param image_id: Unique identifier for the image.
    :param image_data: The image as a binary blob.
    :return: Confirmation message.
    """
    image_store.insert(image_id, image_data)
    return f"Image with ID {image_id} uploaded successfully!"