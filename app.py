# project2_env

from flask import Flask, render_template,jsonify
import os import environ
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')

# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Create engine

# engine = create_engine(conn_str)

# Reflect the database 
Base = automap_base()

# Reflect the tables into SQLAlchemy classes
Base.prepare(engine, reflect=True)
allclasses = Base.classes.keys()

@app.route('/')
def map_ratings():
    return render_template('map_reviews.html')

@app.route("/test")
def text():

    return f"All classes available in the database: {allclasses}"
    
if __name__== '__main__':
    app.run(debug=True)