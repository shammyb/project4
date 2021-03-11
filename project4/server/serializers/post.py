from app import ma
from models.post import Post

from marshmallow import fields


class PostSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Post
        load_instance = True

    user = fields.Nested('UserSchema')
    comments = fields.Nested("CommentSchema", many=True)
    language = fields.Nested('LanguageSchema', many=True)


class SimplePostSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Post
        load_instance = True
