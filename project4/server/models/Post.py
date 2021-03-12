from app import db
from models.base import BaseModel



from models.language import Language
from models.comment import Comment

class Post(db.Model, BaseModel):

    __tablename__ = "posts"

    title = db.Column(db.Text, nullable=False)
    level = db.Column(db.Integer, nullable=False)
    dialect = db.Column(db.Text, nullable=True)
    is_offer = db.Column(db.Boolean, nullable=False)
    image = db.Column(db.Text, nullable=True)
    availability = db.Column(db.Text, nullable=True)
    description = db.Column(db.Text, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    language_id = db.Column(db.Integer, db.ForeignKey('language.id'), nullable=False)
    comments_id = db.Column(db.Integer, db.ForeignKey('comments.id'), nullable=True)

    
    
