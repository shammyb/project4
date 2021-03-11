from app import app, db
from data.post_data import list_posts
from data.comment_data import list_comments
from data.user_data import list_users
from data.language_data import list_languages

with app.app_context():

    try:
        db.drop_all()

        db.create_all()

        db.session.add_all(list_users)

        db.session.commit()

        db.session.add_all(list_languages)

        db.session.commit()

        db.session.add_all(list_posts)

        db.session.commit()

        db.session.add_all(list_comments)

        db.session.commit()

        print("Everything committed 🤖")
    except Exception as e:
        print("There was an error.")
        print(e)