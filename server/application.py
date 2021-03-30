from flask import Flask, jsonify
import time
from stats_helper import StatsHelper
import json
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
stats_helper = StatsHelper()

@app.route('/')
def homepage():
    return json.dumps(stats_helper.select_all())


@app.route('/employee')
def employee():
    return json.dumps(stats_helper.select_all_employee())


@app.route('/alldata')
def alldata():
    return json.dumps(stats_helper.join_all())


@app.route('/per_employee/<id>')
def per_employee(id):
    return json.dumps(stats_helper.per_employee(id))


print("### Application started...")


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
