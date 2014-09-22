import os.path
import codecs
from random import randint
import json
import logging
from flask import (Flask, send_from_directory)

SRC_DIR = os.path.abspath(os.path.dirname(__file__))
DATA_DIR = os.path.join(SRC_DIR, 'data')

logging.basicConfig(filename='example.log', filemode='w', level=logging.DEBUG)

app = Flask(__name__)

@app.route('/')
def home():
    return app.send_static_file('index.html')

@app.route('/api/standings.json')
def standings():
    with codecs.open('./data/drivers.json', 'r+', encoding='utf-8') as f:
      data = json.load(f)
      lucky = randint(0,len(data)-1)
      data[lucky]['points'] += 1
      f.seek(0)
      json.dump(data, f, indent=4)
    return send_from_directory('./data', 'drivers.json')
    pass


@app.route('/pai/team/<int:team_id>.json')
def team_details(team_id):
    with codecs.open('./data/teams.json', 'r+', encoding='utf-8') as f:
      data = json.load(f)
      team = [t for t in data if t['id'] == team_id]
      logging.debug(team)
      return json.dumps(team)
    pass

if __name__ == '__main__':
    app.run(debug=True)
