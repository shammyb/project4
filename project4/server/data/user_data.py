from models.user import User

list_users = [
    User(
        username='katherine', 
        password='katherine', 
        email='katherine@katherine.com',
        bio='I\'m Katherine and I\'m from Alabama. I\'d like to learn Arabic in exchange for English!',
        first_name="Katherine",
        time_zone="CET",
        languages_spoken = "Mandarin, Spanish"
        ),

    User(
        username='emily', 
        password='emily', 
        email='emily@emily.com',
        bio='I am Emily',
        first_name="Emily",
        time_zone="GMT",
        languages_spoken = "Arabic, French"
        ),

    User(
        username='benjani', 
        password='benjani', 
        email='benjani@benjani.com',
        bio='heyyyyyyyyy',
        first_name='Benjani',
        time_zone='GMT',
        languages_spoken = "English, Hebrew"

        
        )
]