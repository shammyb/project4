from app import db

# ! Here is our join table in FlaskSQLAlchemy!
# ? First arg to table is the tablename.
user_language_join = db.Table('user_language',
    db.Column('language_id', db.Integer, db.ForeignKey('language.id'), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)

)