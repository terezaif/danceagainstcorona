from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from data_collection import get_data, classes_query, raw_classes_call
import datetime
import aiohttp
from starlette.config import Config

config = Config(".env")
app = FastAPI()

origins = [
    config.get('ORIGIN')
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


BEARER = config.get('BEARER')
HEADERS = {"Authorization": 'Bearer {}'.format(BEARER)}


@app.get("/")
def read_root():
    return {"Health": "check!"}


@app.get("/v1/all_classes")
async def read_item():
    now = datetime.datetime.today().date()
    resp = {}
    async with aiohttp.ClientSession(headers=HEADERS) as session:
        # TODO: move into outside function
        # resp = await get_data(session, now)
        resp = await get_data(session, now)
        print(resp)
    return {}