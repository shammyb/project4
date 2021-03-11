from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config.environment import db_URI
from flask_marshmallow import Marshmallow
# ! Adding bcrypt
from flask_bcrypt import Bcrypt

app = Flask(__name__)

# ! Adding my own decorators here for all routes..
from decorators import logging, errors

app.config['SQLALCHEMY_DATABASE_URI'] = db_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

ma = Marshmallow(app)

# ! Wrap flask app using bcrypt
bcrypt = Bcrypt(app)

# ! Importing users now in my app.
