from flask import Blueprint, request
from models.language import Language
from serializers.language import LanguageSchema

from marshmallow.exceptions import ValidationError

language_schema = LanguageSchema()

router = Blueprint(__name__, "language")


@router.route("/language", methods=["GET"])
def get_languages():
    languages = Language.query.all()

    return language_schema.jsonify(languages, many=True), 200


@router.route("/language/<int:language_id>", methods=["GET"])
def get_language_single(language_id):
    language = Language.query.get(language_id)

    if not language:
        return {"message": "Language not found"}, 404

    return language_schema.jsonify(language), 200


# @router.route("/ingredients", methods=["POST"])
# def create_ingredient():
#     ingredient_dictionary = request.json

#     try:
#         ingredient = ingredient_schema.load(ingredient_dictionary)
#     except ValidationError as e:
#         return {"errors": e.messages, "messages": "Something went wrong"}

#     ingredient.save()

#     return ingredient_schema.jsonify(ingredient), 200


# @router.route("/ingredients/<int:ingredient_id>", methods=["PUT"])
# def update_ingredient(ingredient_id):
#     existing_ingredient = Ingredient.query.get(ingredient_id)
#     ingredient_dictionary = request.json

#     try:
#         ingredient = ingredient_schema.load(
#             ingredient_dictionary,
#             instance=existing_ingredient,
#             partial=True,
#         )

#     except ValidationError as e:
#         return {"errors": e.messages, "messages": "Something went wrong"}

#     ingredient.save()

#     return ingredient_schema.jsonify(ingredient), 201


# @router.route("/ingredients/<int:ingredient_id>", methods=["DELETE"])
# def remove_ingredient(ingredient_id):
#     ingredient = Ingredient.query.get(ingredient_id)

#     ingredient.remove()

#     return {"message": "Ingredient deleted successfully"}, 200
