from flask import Blueprint, request
from models.user import User
from serializers.user import UserSchema
from marshmallow.exceptions import ValidationError
from decorators.secure_route import secure_route
user_schema = UserSchema()

router = Blueprint(__name__, "users")

@router.route("/signup", methods=["POST"])
def signup():

    try:
        user = user_schema.load(request.json)

    except ValidationError as e:
        return { 'errors': e.messages, 'messages': 'Something went wrong.' }

    user.save()

    return user_schema.jsonify(user)

@router.route('/login', methods=['POST'])
def login():
    # ! 1) Get that user by their email/username, check if they exist.
    user = User.query.filter_by(email=request.json['email']).first()

    if not user:
        return { 'message': 'No user found for this email' }
    # ! 2) Check the password by hashing it, then using bcrypt to compare it to the one in the db.
    # ? To do this, let's create a method validate_password on the user model.
    if not user.validate_password(request.json['password']):
        return { 'message' : 'You are not authorized' }, 402

    # ! 3) Generate a token to send back (for them to attach to POST's, PUT's, DELETE's etc.)
    # ? Another method on user model generate_token (JWT)
    token = user.generate_token()

    return { 'token': token, 'message': 'Welcome back!' }


@router.route('/profile/<int:user_id>', methods=['GET'])
def get_user_profile(user_id):
    user = User.query.get(user_id)
    
    if not user:
        return {"message": "User not found"}, 404
    return user_schema.jsonify(user), 200

@router.route('/profile/<int:user_id>', methods=["PUT"])
@secure_route
def update_user(user_id):
    existing_user = User.query.get(user_id)
    user_update = request.json

    try:
        user = user_schema.load(
            user_update,
            instance=existing_user,
            partial=True,
        )

    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}

    user.save()

    return user_schema.jsonify(user), 201


@router.route('/profile/<int:user_id>', methods=["DELETE"])
@secure_route
def remove_user(user_id):
    user_to_delete = User.query.get(user_id)

    # ! Adding a permission to make sure you can only delete your own cake!
    # if user_to_delete.user != g.current_user:
    #     return {'errors': 'User can only be deleted by the creator!'}, 402

    user_to_delete.remove()

    return {"message": "User deleted successfully"}, 200 

