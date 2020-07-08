# project2_env

from flask import Flask, render_template,jsonify
import os
from os import environ
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
db = SQLAlchemy(app)

# Reflect the database 
Base = automap_base()

# Reflect the tables into SQLAlchemy classes
allclasses = Base.classes.keys()

@app.route('/')
def map_ratings():
    return render_template('map_reviews.html')

@app.route("/test")
def text():

    return f"All classes available in the database: {allclasses}"
    
if __name__== '__main__':
    app.run(debug=True)