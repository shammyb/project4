from models.post import Post
from data.language_data import list_languages
from data.user_data import list_users

# list_languages = [
#     Language(lang_name="English"),
#     Language(lang_name="Spanish"),
#     Language(lang_name="French"),
#     Language(lang_name="Arabic"),
#     Language(lang_name="Mandarin"),
#     Language(lang_name="Hebrew")
# ]


list_posts = [
    Post( 
        title="Help me with my English",     
        level= 1, 
        dialect="American", 
        is_offer=False, 
        image="a", 
        availability="I am available on Wednesday afternoons",
        description="I would like to improve my English! I can teach you Spanish",
        user_id=1,
        language_id=1
        ),
    
    Post(
        #language_name="Spanish", 
        title="Spanish lessons needed", 
        level= 2, 
        dialect="Argentinian", 
        is_offer=False, 
        image="a", 
        availability="I can only do classes on the weekend",
        description="I'm moving to Buenos Aires soon and need to brush up on my Spanish!",
        user_id=2,
        language_id=2
        ),
    
    Post(
        #language_name="Arabic", 
        title="Morrocan Arabic tutor needed",
        level= 3, 
        dialect="Moroccan", 
        is_offer=False, 
        image="a", 
        availability="Monday mornings or Friday afternoons",
        description="I just got back from Morocco and don't want to lose my Arabic. Anyone interested in conversation classes?",
        user_id=2,
        language_id=4
        ),

    Post(
        #language_name="Hebrew", 
        title="Help me speak Hebrew!!!",
        level= 2, 
        dialect="", 
        is_offer=False, 
        image="a", 
        availability="Every day of the week except Thursdays and Sundays",
        description="I want to be able to communicate better with my grandmother who lives in Israel!",
        user_id=2,
        language_id=6
        ),
    
    Post(
        #language_name="English", 
        title="English for Hebrew Speaker",
        level= 3, 
        dialect="", 
        is_offer=False, 
        image="ToDo", 
        availability="all day every day",
        description="just your average hebrew speaker",
        user_id=3,
        language_id=1
        ),
    
    Post(
        #language_name="Mandarin", 
        title="Mandarin Teacher Please",
        level= 1, 
        dialect="", 
        is_offer=False, 
        image="ToDo", 
        availability="all day every day",
        description="shalom i would love to learn to speak mandarin",
        user_id=3,
        language_id=5
        ),

# OFFERS
    Post(
        #language_name="Spanish", 
        title="Espanol Lessons",
        level= 3, 
        dialect="Spain", 
        is_offer=True, 
        image="", 
        availability="Tuesday evenings and Saturday mornings",
        description="Me encantaría ayudarte con el castellano",
        user_id=1,
        language_id=2
        ),
        
    Post(
        #language_name="Mandarin", 
        title="Learn Mandarin Chinese!",
        level= 3, 
        dialect="Standard", 
        is_offer=True, 
        image="", 
        availability="Every weekday after 5pm",
        description="I lived in Beijing for five years and would be happy to teach you the basics",
        user_id=1,
        language_id=5
        ),

    Post(
        #language_name="French", 
        title="L'ecole de francais",
        level= 3, 
        dialect="Louisiana French", 
        is_offer=True, 
        image="", 
        availability="Tuesdays and Saturdays",
        description="Born in Paris, but raised in New Orleans, I want to keep Louisiana French alive. Hit me up",
        user_id=2,
        language_id=3
        ),

    Post(
        #language_name="Arabic", 
        title="Learn Arabic!",
        level= 3, 
        dialect="Moroccan", 
        is_offer=True, 
        image="", 
        availability="Mondays",
        description="My mother was raised in Morocco and I am an expert in Moroccan Arabic. Let me help you",
        user_id=2,
        language_id=4
        ),

    Post(
        #language_name="Hebrew", 
        title="Hebrew Lessons with Benji",
        level= 3, 
        dialect="", 
        is_offer=True, 
        image="a", 
        availability="everyday",
        description="shalom if youd like to go to israel and not get hit with tourist prices learn hebrew with me!",
        user_id=3,
        language_id=6
        ),

    Post(
        #language_name="English", 
        title="English teacher available",
        level= 3, 
        dialect="uk", 
        is_offer=True, 
        image="a", 
        availability="mondays, wednesdays and fridays",
        description="if you would like to speak english hit me up",
        user_id=3,
        language_id=1
        )
    

]
