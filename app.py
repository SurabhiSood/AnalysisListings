# project2_env

from flask import Flask, render_template
import os
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

@app.route('/dropdown')
def dropdown():
    # Create session to link to the heroku Postgres database
    session = Session(bind=engine)
    dropdown = db.session.query(zipcode).all()

    #create an empty list
    drop_zip = []
    for dz in dropdown:
        zipcode = []
        zipcode['neighbourhood']



if __name__== '__main__':
    app.run(debug=True)