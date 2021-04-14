# Project 4 Language Connect
## Overview
I worked in a team with two peers and suggested a language swap app where users can see who’s teaching a language they want to learn and email them to offer to teach a language in exchange. We had a week to complete this task and it was our first python project. We whiteboarded out our MVP and looked at the relationships needed i.e many to many, one to many. Once we were confident that we had all the correct relationships between elements of the app we started working on the backend whereby one of us shared a screen and we discussed what needed to go where and how to do it.  This was by far the most complicated part of the project! Once we got that working we worked on the front end aspect where I took charge of filtering results, comments and authorisation to add, delete and edit both comments and posts. I also helped a lot with the forms and the login functions. As this was our first python, flask and SQLAlchemy project the backend took us longer than we had wanted and we were not able to implement any of our stretch goals. I would like to revisit this project soon and add a like button, expand it so it is all skills and not just languages, and add a fake currency which you earn and spend by teaching and learning too.
Checkout our project here: https://language-connect.herokuapp.com/
## Technical requirements
```
         * Build a full-stack application by making your own backend and your own front-end
         * Use a Python Flask API using a Flask REST Framework to serve your data from a Postgres database
         * Consume your API with a separate front-end built with React
         * Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
         * Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut
         * Have a visually impressive design to kick your portfolio up a notch and have something to wow future clients & employers. ALLOW time for this.
         * Be deployed online so it's publicly accessible
```
## The Backend
The backend was the most complex part of the project. While our initial plan gave us a good base for creating the back end and the database, there were definitely issues that arose that had us change the plan.

Originally, we intended on having many skills available but to make sure we had a completed MVP, we decided to focus on language learning.

After having some issues with populating the database, we decided to move to a one to many model with the posts. This made the most sense since the users would only have one post per language.

For the controllers, we decided to have multiple endpoints for users to get relevant information. For our site, the main points users would be searching would be posts and languages. To accomplish this we created two different endpoints for getting all posts and getting posts by language like so:

``` Python
@router.route("/posts/language/<int:query_language_id>", methods=["GET"])
def get_posts_by_language(query_language_id):
    post = Post.query.all()
    lang_post = []
    for x in post:
        if x.language_id == query_language_id:
            print(x.language_id)
            lang_post.append(x)
            print(lang_post)    
    return post_schema.jsonify(lang_post, many=True), 200

@router.route("/posts", methods=["GET"])
def get_posts():
    posts = Post.query.all()
    return post_schema.jsonify(posts, many=True), 200


@router.route("/posts/<int:post_id>", methods=["GET"])
def get_single_post(post_id):
    post = Post.query.get(post_id)
    
    if not post:
        return {"message": "Post not found"}, 404

    return post_schema.jsonify(post), 200
    
    ```
  ## The Front End    


