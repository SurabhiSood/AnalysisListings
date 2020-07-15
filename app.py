# project2_env

from flask import Flask, render_template,jsonify
import os
from os import environ
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy import create_engine, MetaData
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

engine = create_engine('postgres://yoyqxloquekucy:8328f25bf2390670b4035437fdf6329cfcd035d476d4bfc89e49f128471ee4f9@ec2-54-165-36-134.compute-1.amazonaws.com:5432/daafhqmf1lebno')
#engine = create_engine (os.environ.get('DATABASE_URL'))


# reflect an existing Database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect = True)

Table_zip = Base.classes.zipcode
Table_map = Base.classes.map_details

# ['zipcode', 'map_details']


@app.route('/')
def map_ratings():
    return render_template('map_reviews.html')

@app.route('/p')
def map_price():
    return render_template('price.html')

@app.route("/dropdown")
def zipcodeDropdown():

    session = Session(engine)
    results = session.query(Table_zip.neighbourhood).all()
    session.close()
    
    zip=[]
    for z in results:
        zip.append(z)

    return jsonify(zip)

@app.route("/map")
def map_review():
    session = Session(engine)
    results_map = session.query(Table_map).all()
    session.close()

    map_list=[]
    for m in results_map:
        map_dict = {
            'Zipcode' : m.zipcode,
            'Latitude' : m.latitude,
            'Longitude' : m.longitude,
            'Name' : m.name,
            'Host' : m.host_name,
            'Price' : m.price,
            'Reviews' : m.review_scores_rating,
            'Available' : m.room_type,
            'City' : m.city
        }
        map_list.append(map_dict)
        
    return jsonify(map_list)
        

if __name__== '__main__':
    app.run(debug=True)
