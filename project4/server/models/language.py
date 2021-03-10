from app import db
from models.base import BaseModel

# ! Language model for language.
class Language(db.Model, BaseModel):

    __tablename__ = 'language'
    lang_name = db.Column(db.Text, nullable=False, unique=True)
