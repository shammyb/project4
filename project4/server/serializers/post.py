from app import ma
from models.post import Post

# ! Import fields from marshmallow
from marshmallow import fields


class PostSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Post
        load_instance = True

    # ! Add my user schema
    user = fields.Nested('UserSchema')
    comments = fields.Nested("CommentSchema", many=True)
    language = fields.Nested('LanguageSchema', many=True)


# ! Add another post schema that is not populated.
class SimplePostSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Post
        load_instance = True
