from app import db
from models.base import BaseModel
#from models.user_post import user_post_join
from models.user import User
from models.language import Language
from models.post_language import post_language_join
from models.comment import Comment

class Post(db.Model, BaseModel):

    __tablename__ = "posts"

    title = db.Column(db.Text, nullable=False)
    level = db.Column(db.Integer, nullable=False)
    dialect = db.Column(db.Text, nullable=True)
    is_offer = db.Column(db.Boolean, nullable=False)
    image = db.Column(db.Text, nullable=True)
    availability = db.Column(db.Text, nullable=True)
    description = db.Column(db.Text, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    language_id = db.Column(db.Integer, db.ForeignKey('language.id'))
    post_comments = db.relationship('Comment', backref='post', cascade="all, delete")

    languages = db.relationship('Language', backref='posts', secondary=post_language_join)
    #user_id = db.relationship('User', backref = 'posts', secondary = user_post_join )
