from app import ma
from models.post import Post

from marshmallow import fields


class PostSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Post
        load_instance = True

    user = fields.Nested('UserSchema')
    post_comments = fields.Nested("CommentSchema", many=True)
    language_id = fields.Integer()


class SimplePostSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Post
        load_instance = True
