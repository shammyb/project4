from app import db
from models.base import BaseModel
from models.language_post import language_post_join
# ! Import ingredient into my cake so SQLAlchemy knows about it.
from models.language import language
from models.comment import Comment

class Post(db.Model, BaseModel):

    __tablename__ = "post"

    language_name = db.Column(db.String(40), nullable=False, unique=True)
    level = db.Column(db.Integer, nullable=False)
    dialect = db.Column(db.Text, nullable=True)
    is_offer = db.Column(db.Boolean, nullable=False)
    image = db.Column(db.Text, nullable=True)
    availability = db.Column(db.Text, nullable=True)
    description = db.Column(db.Text, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))

    # * FOR CASCADING DELETION:
    # ! Add the cascade keyword with all and delete.
    comments = db.relationship('Comment', backref='post', cascade="all, delete")

    # ! Calling the backref cakes, because many ingredients to many cakes
    # ! The extra keyword for M - M is the seconary keyword
    # ? This secondary key will let us specify the JOIN table that relates the two models together.
    ingredients = db.relationship('Language', backref='post', secondary=language_post_join)