from models.user import User
# from data.post_data import languages


list_users = [
    User(
        username='katherine', 
        password='katherine', 
        email='katherine@katherine.com',
        bio='I\'m Katherine and I\'m from Alabama. I\'d like to learn Arabic in exchange for English!',
        first_name="Katherine",
        time_zone="CET",
        languages_spoken="Spanish, Mandarin"
        # languages_spoken = [languages[4].lang_name, languages[1].lang_name],
        ),

    User(
        username='emily', 
        password='emily', 
        email='emily@emily.com',
        bio='I am Emily',
        first_name="Emily",
        time_zone="GMT",
        languages_spoken="French, Arabic"
        # languages_spoken = [languages[3].lang_name, languages[2].lang_name],
        ),

    User(
        username='benjani', 
        password='benjani', 
        email='benjani@benjani.com',
        bio='heyyyyyyyyy',
        first_name='Benjani',
        time_zone='GMT',
        languages_spoken="Hebrew, English"
        # languages_spoken = [languages[0].lang_name, languages[5].lang_name],


        )
]