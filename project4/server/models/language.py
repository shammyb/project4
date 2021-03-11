from app import db
from models.base import BaseModel
from models.user_language import user_language_join
from models.post_language import post_language_join


# ! Language model for language.
class Language(db.Model, BaseModel):

    __tablename__ = 'language'
    lang_name = db.Column(db.Text, nullable=False, unique=True)

    language_languages = db.relationship('Language', backref='user', secondary=user_language_join)
    language_posts = db.relationship('Post', backref='language', secondary=post_language_join)
