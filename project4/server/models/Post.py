from app import db
from models.base import BaseModel
from models.user_language import user_language_join
from models.language import Language
from models.comment import Comment

class Post(db.Model, BaseModel):

    __tablename__ = "post"

    language_name = db.Column(db.String, nullable=False)
    level = db.Column(db.Integer, nullable=False)
    dialect = db.Column(db.Text, nullable=True)
    is_offer = db.Column(db.Boolean, nullable=False)
    image = db.Column(db.Text, nullable=True)
    availability = db.Column(db.Text, nullable=True)
    description = db.Column(db.Text, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    comments = db.relationship('Comment', backref='post', cascade="all, delete")

    languages = db.relationship('Language', backref='user', secondary=user_language_join)