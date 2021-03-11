from flask import Blueprint, request, g
from models.post import Post
from models.language import Language
from models.comment import Comment
from serializers.post import PostSchema

from decorators.secure_route import secure_route

# ! Import my comment schema
from serializers.comment import CommentSchema

post_schema = PostSchema()
from marshmallow.exceptions import ValidationError

# ! Initialise comment schema.
#comment_schema = CommentSchema()

router = Blueprint(__name__, "posts")


@router.route("/posts", methods=["GET"])
def get_posts():
    posts = Post.query.all()

    return post_schema.jsonify(posts, many=True), 200


@router.route("/posts/<int:post_id>", methods=["GET"])
def get_single_post(post_id):
    post = Post.query.get(post_id)

    if not post:
        return {"message": "Post not found"}, 404

    return post_schema.jsonify(post), 200


@router.route("/posts", methods=["POST"])
@secure_route
def create_post():
    post_dictionary = request.json

    try:
        post = post_schema.load(post_dictionary)
        # ! Adding a user to the cake.
        post.user = g.current_user

    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}

    post.save()

    return post_schema.jsonify(post), 200

# needs secure route
@router.route("/posts/<int:post_id>", methods=["PUT"])
def update_post(post_id):
    existing_post = Post.query.get(post_id)
    post_dictionary = request.json

    try:
        post = post_schema.load(
            post_dictionary,
            instance=existing_post,
            partial=True,
        )

    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}

    post.save()

    return post_schema.jsonify(post), 201


@router.route("/posts/<int:post_id>", methods=["DELETE"])
@secure_route
def remove_post(post_id):
    post = Post.query.get(post_id)

    # ! Adding a permission to make sure you can only delete your own cake!
    if post.user != g.current_user:
        return {'errors': 'Post can only be deleted by the creator!'}, 402

    post.remove()

    return {"message": "Post deleted successfully"}, 200 


# @router.route("/ping", methods=["GET"])
# def test():
#     return "The cake is a lie, but everything is up and running.", 200


# # ! POSTing a comment
# @router.route("/cakes/<int:cake_id>/comments", methods=["POST"])
# def create_comment(cake_id):
#     comment_dictionary = request.json

#     cake = Cake.query.get(cake_id)

#     try:
#         comment = comment_schema.load(comment_dictionary)

#         comment.cake = cake

#     except ValidationError as e:
#         return {"errors": e.messages, "messages": "Something went wrong"}

#     comment.save()

#     return comment_schema.jsonify(comment)


# @router.route("/cakes/<int:cake_id>/comments/<int:comment_id>", methods=["DELETE"])
# def remove_comment(cake_id, comment_id):

#     comment = Comment.query.get(comment_id)

#     comment.remove()

#     cake = Cake.query.get(cake_id)

#     return cake_schema.jsonify(cake), 202


# @router.route("/cakes/<int:cake_id>/comments/<int:comment_id>", methods=["PUT"])
# def update_comment(cake_id, comment_id):

#     comment_dictionary = request.json
#     existing_comment = Comment.query.get(comment_id)

#     try:
#         comment = comment_schema.load(
#             comment_dictionary, instance=existing_comment, partial=True
#         )

#     except ValidationError as e:
#         return {"errors": e.messages, "messages": "Something went wrong"}

#     comment.save()

#     cake = Cake.query.get(cake_id)

#     return cake_schema.jsonify(cake), 201


# # ! DELETING A CAKE'S INGREDIENT
# @router.route("/cakes/<int:cake_id>/ingredients/<int:ingredient_id>", methods=["DELETE"])
# def remove_cake_ingredient(cake_id, ingredient_id):

#     # ! Getting the cake
#     cake = Cake.query.get(cake_id)

#     # ! Get that ingredient
#     ingredient = Ingredient.query.get(ingredient_id)

#     # ! Remove ingredient
#     cake.ingredients.remove(ingredient)

#     # ! Save the cake back.
#     cake.save()

#     return cake_schema.jsonify(cake), 200

# # ! POST AN INGREDIENT TO A CAKE
# @router.route("/cakes/<int:cake_id>/ingredients/<int:ingredient_id>", methods=["POST"])
# def add_cake_ingredient(cake_id, ingredient_id):
#     # ! This method ASSUMES the ingredient and the cake exists already.

#     cake = Cake.query.get(cake_id)

#     ingredient = Ingredient.query.get(ingredient_id)

#     cake.ingredients.append(ingredient)

#     cake.save()

#     return cake_schema.jsonify(cake), 200
