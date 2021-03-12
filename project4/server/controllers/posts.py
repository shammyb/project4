from flask import Blueprint, request, g
from models.post import Post
from models.language import Language
from models.comment import Comment
from serializers.post import PostSchema

from decorators.secure_route import secure_route
from models.user_post import user_post_join

# ! Import my comment schema
from serializers.comment import CommentSchema

post_schema = PostSchema()
from marshmallow.exceptions import ValidationError

# ! Initialise comment schema.
comment_schema = CommentSchema()

router = Blueprint(__name__, "posts")


@router.route("/posts", methods=["GET"])
def get_posts():
    posts = Post.query.all()
    print(user_post_join.user_id)
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

@router.route("/posts/<int:post_id>", methods=["PUT"])
@secure_route
def update_post(post_id):
    existing_post = Post.query.get(post_id)
    post_dictionary = request.json

    if existing_post.user != g.current_user:
        return {'errors': 'Post can only be updated by the creator!'}, 402

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

# COMMENTS 
# @router.route("/posts/<int:post_id>/comments", methods=["GET"])
# def get_all_comments(post_id):
#     comments = 

#     return comment_schema.jsonify(comment)
# # ! POSTing a comment
@router.route("/posts/<int:post_id>/comments", methods=["POST"])
def create_comment(post_id):
    comment_dictionary = request.json

    post = Post.query.get(post_id)
    

    try:
        comment = comment_schema.load(comment_dictionary)

        comment.post = post
        post.user = g.current_user

    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}

    comment.save()

    return comment_schema.jsonify(comment)

# # ! UPDATING a comment
@router.route("/posts/<int:post_id>/comments/<int:comment_id>", methods=["PUT"])
@secure_route
def update_comment(post_id, comment_id):

    comment_dictionary = request.json
    existing_comment = Comment.query.get(comment_id)

    if existing_comment.user != g.current_user:
        return {'errors': 'Comment can only be updated by the creator!'}, 402
    try:
        comment = comment_schema.load(
            comment_dictionary, instance=existing_comment, partial=True
        )

    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}

    comment.save()

    post = Post.query.get(post_id)

    return post_schema.jsonify(post), 201



# # ! DELETE a comment

@router.route("/posts/<int:post_id>/comments/<int:comment_id>", methods=["DELETE"])
@secure_route
def remove_comment(post_id, comment_id):

    comment = Comment.query.get(comment_id)
    if comment.user != g.current_user:
        return {'errors': 'Comment can only be deleted by the creator!'}, 402
    comment.remove()

    post = Post.query.get(post_id)

    return post_schema.jsonify(post), 202
