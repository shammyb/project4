from app import db

# ! Here is our join table in FlaskSQLAlchemy!
# ? First arg to table is the tablename.
user_post_join = db.Table('user_post',
    db.Column('post_id', db.Integer, db.ForeignKey('posts.id'), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)

)