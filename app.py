from flask import Flask, jsonify
import requests
import datetime
from dateutil.relativedelta import relativedelta

app = Flask("danceagainstcorona")


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

def get_artist(raw_artist):
    """
    get Artists internal info
    :param id: str
    :return:
    """
    return {
        "name": raw_artist["fields"]["Name"],
        "instagram": raw_artist["fields"]["Instagram"]
    }, raw_artist["fields"]["Language"]


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

@app.route('/v1/all_classes')
def get_all_classes():
    """
    Get all classes from now to X hours (3 days default)
    :return: JsonResponse
    """
    now = datetime.datetime.today().date()
    headers = {"Authorization": 'Bearer keyObNSCXx5PgfhKl'}  # TODO: regenerate API key and add to .env and cicd variables
    resp = {"events":[]}
    try:
        for i in range(0, 3):
            # get classes
            classes_raw = requests.get(classes_query(i, i+1), headers=headers).json()['records']
            # get artists
            artists_ids = [c['fields']['Artist'][0] for c in classes_raw]
            artists = []
            languages = []
            for id in artists_ids:
                arresp = requests.get("https://api.airtable.com/v0/appCVm3JIzNrEHoYA/Artist/{}".format(id),
                                      headers=headers).json()
                art, lan = get_artist(arresp)
                artists.append(art)
                languages.append(lan)

            resp["events"].append({"date": (now + relativedelta(days=i)).isoformat(),
                                   "classes": [clean_item(item, artists, list(set(languages))) for item in classes_raw]})
    except Exception as ex:
        print(f'No records were collected due to {ex}')
    return jsonify(resp)



if __name__ == '__main__':
    app.run()