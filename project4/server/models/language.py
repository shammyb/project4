from app import db
from models.base import BaseModel
from models.user_language import user_language_join
# ! Language model for language.
class Language(db.Model, BaseModel):

    __tablename__ = 'language'
    lang_name = db.Column(db.Text, nullable=False, unique=True)

    languages = db.relationship('Language', backref='user', secondary=user_language_join)
