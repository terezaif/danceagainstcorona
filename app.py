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



def classes_query(start, end):
    """
    Collecting classes for time frame from n
    :param start: define "now"
    :param end: define future
    :return:
    """
    base_url = "https://api.airtable.com/v0/appCVm3JIzNrEHoYA/Schedule"
    fields = "fields=DateTime(GMT)&fields=Name&fields=Duration&fields=Artist"
    sort = "sortfield=DateTime(GMT)&sortdirection=asc"
    filter_before = "IS_BEFORE({{DateTime(GMT)}}, DATEADD(NOW(), {0}, 'days'))".format(end)
    filter = "filterByFormula=AND(IS_AFTER({{DateTime(GMT)}}, DATEADD(NOW(), {1}, 'days')), {0})".format(filter_before, start)
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
    dates = []  # deduplication structure
    try:
        for i in range(0, 3):
            # get classes
            classes_raw = requests.get(classes_query(i, i+1), headers=HEADERS).json()['records']
            # get artists
            for c in classes_raw:
                if len(c) > 0:
                    ar, lan = get_artists(c['fields']['Artist'])
                    d = (now + relativedelta(days=i)).isoformat()
                    if d not in dates:
                        dates.append(d)
                        resp["events"].append({"date":d,
                                               "classes": sorted([clean_item(item, ar, lan) for item in classes_raw],
                                                                 key=lambda x: x['dateTime'])})
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