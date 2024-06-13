from fastapi import FastAPI

from api.routes.routes import endPoints


app = FastAPI()



app.include_router(endPoints)