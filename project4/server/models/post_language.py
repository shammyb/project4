from app import db


post_language_join = db.Table('post_language',
    db.Column('post_id', db.Integer, db.ForeignKey('post.id'), primary_key=True),
    db.Column('language_id', db.Integer, db.ForeignKey('language.id'), primary_key=True)

)