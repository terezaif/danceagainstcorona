import os
from cachetools import cached, TTLCache
from flask import Flask, jsonify
from flask_cors import CORS
import requests
import datetime
from dateutil.relativedelta import relativedelta

app = Flask("danceagainstcorona")
CORS(app)
cache = TTLCache(maxsize=512, ttl=1*60*60)
BEARER = os.environ.get('BEARER','add BEARER=... in your .env')
HEADERS = {"Authorization": 'Bearer {}'.format(BEARER)}



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

def get_artists(artists_per_class):
    """
    get Artists internal info for the class
    :param artists_per_class: list of artist performing the class
    :return:
    """
    languages = []
    artists = []
    for a in artists_per_class:
        art = requests.get("https://api.airtable.com/v0/appCVm3JIzNrEHoYA/Artist/{}".format(a),
                                      headers=HEADERS).json()
        artists.append(
            {
            "name": art["fields"]["Name"],
            "instagram": art["fields"]["Instagram"]
            })
        languages.append(art["fields"]["Language"])
    return artists, list(set(languages))



def clean_item(item, artist, languages):
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

@app.route('/')
def main():
    return jsonify({"Message": "Hello!"})

@cached(cache)
def get_data(now):
    """
    Cached version of data collection
    :return:
    """
    resp = {"events":[]}
    try:
        for i in range(0, 3):
            # we fetch currently running classes as well
            if i == 0:
                classes_raw = requests.get(classes_query(i, i+1, active=True), headers=HEADERS).json()['records']
            else:
                classes_raw = requests.get(classes_query(i, i+1), headers=HEADERS).json()['records']
            d = (now + relativedelta(days=i)).isoformat()
            # get artists
            artists_per_class = {}
            for c in classes_raw:
                artists_per_class[c["id"]] = []
                if len(c) > 0:
                    ar, lan = get_artists(c['fields']['Artist'])
                    artists_per_class[c["id"]] = (ar, lan)
            data = [clean_item(item, artists_per_class[item["id"]][0], artists_per_class[item["id"]][1]) for item in classes_raw]
            resp["events"].append({"date":d,
                                   "classes": sorted(data, key=lambda x: x['dateTime'])})
    except Exception as ex:
        print(f'No records were collected due to {ex}')
    return resp


@app.route('/v1/all_classes')
def get_all_classes():
    """
    Get all classes from now to X hours (3 days default)
    :return: JsonResponse
    """
    now = datetime.datetime.today().date()
    resp = get_data(now)
    return jsonify(resp)



if __name__ == '__main__':
    app.run()