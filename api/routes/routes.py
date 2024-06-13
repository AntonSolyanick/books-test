from fastapi import APIRouter, Depends
from fastapi_pagination import Page, Params, paginate
from bson import ObjectId
from api.config.config import booksCollection
from api.model.model import Book
from api.serializer.serializer import convertBook , convertBooks



endPoints = APIRouter()


@endPoints.post('/api/new-book')
def newBook(book:Book):
    booksCollection.insert_one(dict(book))
    return {
        "status":"200",
        "message":"the book created"
    }    

@endPoints.get('/api/all-books')
def getAllBooks():
    books = booksCollection.find()
    convertedBooks = convertBooks(books)
    return {
        "status": "ok",
        "data": convertedBooks
    }

@endPoints.get('/api/books', response_model=Page[Book])
def getBooks(params:Params = Depends()):
    books = booksCollection.find()
    convertedBooks = convertBooks(books)
    return paginate(convertedBooks, params)
   


# IzXIQuQsjZlvzbPc