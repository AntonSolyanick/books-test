def convertBook(book) -> dict:
    return{
        "id": str(book["_id"]),
        "name": book["name"],
        "description": book["description"],
        "cover": book["cover"],
    }

def convertBooks(books) -> list:
    return [convertBook(book) for book in books]