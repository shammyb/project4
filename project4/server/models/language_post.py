from app import db

# ! Here is our join table in FlaskSQLAlchemy!
# ? First arg to table is the tablename.
language_post_join = db.Table('language_post',
    # ! We need a primary key. I'm going to use the unique pair for this key, (cake_id, ingredient_id)
    db.Column('post_id', db.Integer, db.ForeignKey('post.id'), primary_key=True),
    db.Column('language_id', db.Integer, db.ForeignKey('language.id'), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)

)