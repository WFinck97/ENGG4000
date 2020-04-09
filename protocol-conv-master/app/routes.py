import json

from datetime import datetime
from flask import render_template
from flask import request
from app import app
from app import convert
from app import serv

sensors = { # TODO: pull from data agg
    "abc123": {
        "key": "456"
    }
}

@app.route("/")
@app.route("/index")
def index():
    return render_template('index.html', datetime=datetime.now())
    
@app.route("/api/sensor/data/new", methods = ["POST"])
def processSensorData():
    if request.form['key'] == sensors[request.form['id']]['key']: # TODO: actually check if key correct
        conv_data = convert.run_conversion(request.form['conv_id'], request.form['data'])
        print("Stored: " + json.dumps(conv_data)) # TODO: actually store the data
        return json.dumps(conv_data)
    else:
        return "Invalid key!"
        
@app.route("/api/sensor/new", methods = ["POST"])
def newSensorConfiguration():
    logic_hash = convert.new_converter(request.form["sensorlogic"])
    return "Converter module ID: " + logic_hash