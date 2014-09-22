import os.path
from flask import (Flask, send_from_directory)

SRC_DIR = os.path.abspath(os.path.dirname(__file__))
DATA_DIR = os.path.join(SRC_DIR, 'data')

app = Flask(__name__)

@app.route('/')
def home():
    return app.send_static_file('index.html')

@app.route('/api/standings.json')
def standings():
    return send_from_directory('./data', 'drivers.json')
    pass


@app.route('/pai/team/<int:team_id>.json')
def team_details(team_id):
    # TODO: Implement
    pass

if __name__ == '__main__':
    app.run(debug=True)
