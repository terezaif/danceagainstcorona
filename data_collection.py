from cachetools import cached, TTLCache
cache = TTLCache(maxsize=512, ttl=1*60*60)
import datetime
from dateutil.relativedelta import relativedelta


def classes_query(start, end, active=False):
    """
    Collecting classes for time frame from n
    :param start: define "now"
    :param end: define future
    :param active: bool if we want to fetch currently running classes
    :return:
    """
    base_url = "https://api.airtable.com/v0/appCVm3JIzNrEHoYA/Schedule"
    fields = "fields=DateTime(GMT)&fields=Name&fields=Duration&fields=Artist"
    sort = "sortfield=DateTime(GMT)&sortdirection=asc"
    filter_before = "IS_BEFORE({{DateTime(GMT)}}, DATEADD(TODAY(), {0}, 'days'))".format(end)
    filter_after = "IS_AFTER({{DateTime(GMT)}}, DATEADD(TODAY(), {0}, 'days'))".format(start)
    if active:
        filter_after = "IS_AFTER({{DateTime(GMT)}}, DATEADD(DATEADD(NOW(), -30, 'minutes'), {0}, 'days'))".format(start)
    filter = "filterByFormula=AND({0}, {1})".format(filter_before, filter_after)
    url = "{}?{}&{}&{}".format(base_url, fields, sort, filter)
    return url


async def get_artists(session, artists_per_class: list) -> (list, list):
    """
    get Artists internal info for the class
    :param session: aiohttp session
    :param artists_per_class: list of artist performing the class
    :return: tuple of lists of artists and list of languages
    """
    languages = []
    artists = []
    for a in artists_per_class:
        async with session.get(f"https://api.airtable.com/v0/appCVm3JIzNrEHoYA/Artist/{a}") as art_response:
            art = await art_response.json()
            artists.append(
                {
                "name": art["fields"]["Name"],
                "instagram": art["fields"]["Instagram"]
                })
            languages.append(art["fields"]["Language"])
    return artists, list(set(languages))


def clean_item(item: dict, artist: dict, languages: str) -> dict:
    """
    Leave only needed fields from the respsonse
    :param item: raw json item
    :param artist: dict artist info
    :param languages: str language
    :return: dict
    """
    return {
        "id": item["id"],
        "danceStyle": item["fields"]["Name"],
        "duration": item["fields"]["Duration"],
        "dateTime": item["fields"]["DateTime(GMT)"],
        "artists": artist,
        "language": languages
    }


async def raw_classes_call(session, request):
    """
    Async call to schedule table
    :param session: aiohttp session
    :param request: str url to call
    :return: coroutine
    """
    async with session.get(request) as class_resp:
        return await class_resp.json()


# @cached(cache)
async def get_data(session, now: datetime.datetime) -> dict:
    """
    Cached version of data collection
    :param session: aiohttp session
    :param now: datetime object to start querying
    :return: dict form with all classes and according meta data
    """
    resp = {"events": []}
    try:
        for i in range(0, 3):
            if i == 0:
                request = classes_query(i, i+1, active=True)
            else:
                request = classes_query(i, i+1)
            classes_raw = (await raw_classes_call(session, request))['records']
            print(classes_raw)
            # d = (now + relativedelta(days=i)).isoformat()
            # artists_per_class = {}
            # for c in classes_raw:
            #     artists_per_class[c["id"]] = []
            #     if len(c) > 0:
            #         ar, lan = await get_artists(session, c['fields']['Artist'])
            #         artists_per_class[c["id"]] = (ar, lan)
            # data = [clean_item(item, artists_per_class[item["id"]][0], artists_per_class[item["id"]][1]) for item in classes_raw]
            # resp["events"].append({"date":d,
            #                        "classes": sorted(data, key=lambda x: x['dateTime'])})
    except Exception as ex:
        print(f'No records were collected due to {ex}')
    return resp