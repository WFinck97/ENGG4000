from flask import Flask

app = Flask(__name__, static_folder="static")
app.config['TEMPLATES_AUTO_RELOAD'] = True

from app import routes