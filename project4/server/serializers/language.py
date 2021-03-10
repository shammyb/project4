from app import ma
from models.language import Language

class LanguageSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Language
        load_instance = True