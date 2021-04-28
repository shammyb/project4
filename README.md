# Project 4 Language Connect
## Overview
I worked in a team with two peers and suggested a language swap app where users can see who’s teaching a language they want to learn and email them to offer to teach a language in exchange. We had a week to complete this task and it was our first python project. We whiteboarded our MVP and looked at the relationships needed i.e many to many, one to many. Once we were confident that we had all the correct relationships between elements of the app, we started working on the backend whereby one of us shared a screen and we discussed what needed to go where and how to do it.  This was by far the most complicated part of the project! Once we got that working we worked on the front end aspect where I took charge of filtering results, comments and authorisation to add, delete and edit both comments and posts. I also helped a lot with the forms and the login functions. As this was our first python, flask and SQLAlchemy project the backend took us longer than we had wanted and we were not able to implement any of our stretch goals. I would like to revisit this project soon and add a like button, expand it so it is all skills and not just languages, and add a fake currency which you earn and spend by teaching and learning too.
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

For the controllers, we decided to have multiple endpoints for users to get relevant information. For our site, the main points users would be searching, posts and languages. To accomplish this we created two different endpoints for getting all posts and getting posts by language like so:

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

My role and main focus for this project was the functionality of it. Therefore it was my responsibility to clear it from bugs and to make sure everything works. Because of this i had a hand to play in almost every function within this project. The part of the project that i am most proud of is the search page. The filtering for this based on what the user selected was the most challenging part for me. 

### Filtering

The API we created can search for posts by language. I put the axios request inside a use effect so everytime the selected language changes, an axios request will be made with the new URL. From there i created three functions all of which get posts by level. They are teachers, students and the default, all posts.

The next step was to make a function which i named filtering to chose which one of these to display. This displays the teacher, student or all posts and uses useState to update a variable to contain the information inside it to map and display to the user. 

I thoroughly enjoyed writing the code for this. I have included it below:

```javascript
const [posts, updatePosts] = useState([])
  const [loading, updateLoading] = useState(true)
  const [level, updateLevel] = useState(0)
  const [apiUrl, setApiUrl] = useState('/api/posts')
  const [tof, setTof] = useState('all')
  const [option, setOption] = useState([])
  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data } = await axios.get(apiUrl)
        updatePosts(data)
        updateLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    fetchPosts()
  }, [apiUrl])
  function getStudents(level) {
    const filteredLevel = []
    const filteredPosts = posts.filter(student => student.is_offer !== true)
    if (level !== 0) {
      for (let i = 0; i < filteredPosts.length; i++) {
        if (parseInt(filteredPosts[i].level) === level) {
          filteredLevel.push(filteredPosts[i])
        }
      }
      return filteredLevel
    }
    return filteredPosts
  }
  function getTeachers(level) {
    const filteredLevel = []
    const filteredPosts = posts.filter(student => student.is_offer === true)
    if (level !== 0) {
      for (let i = 0; i < filteredPosts.length; i++) {
        if (parseInt(filteredPosts[i].level) === level) {
          filteredLevel.push(filteredPosts[i])
        }
      }
      return filteredLevel
    }
    return filteredPosts
  }
  function getAllPostsByLevel(level) {
    const filteredLevel = []
    if (level !== 0) {
      for (let i = 0; i < posts.length; i++) {
        if (parseInt(posts[i].level) === level) {
          filteredLevel.push(posts[i])
        }
      }
      return filteredLevel
    }
    return posts
  }
  if (loading) {
    return <>
      <h1>Loading posts...</h1>
    </>
  }
  function filtering(tof, level) {
    if (tof === 'teachers') {
      setOption(getTeachers(level))
    } else if (tof === 'students') {
      setOption(getStudents(level))
    } else {
      setOption(getAllPostsByLevel(level))
    }
  }
```
### Comments
Another solo job i had was the comments function for the posts. 
As the comments were nested inside the post data, there was no need to create an endpoint in the backend to get comments. Instead to get the comment data i had to get the data for the posts and find it inside there. Due to the way this was set up, everytime a comment was created, edited or deleted the function fetchData would be called in order for the updates to be displayed.

The most challenging attribute for the comments section of this page was the editing function. This was handled in two stages/functions. The two functions are named handleEditCommentOne and handleEditCommentTwo as can be seen below. The first function checks the author of the comment with the user that is currently logged in. It then gets the content and puts it in a text box where users can edit what's inside. The second function takes whatever the value of the textbox is (eddited comment) and uses an axios request to edit the comment. This along with the code for adding and deleting comments has been added below:

```javascript
async function fetchData() {
    await axios.get(`/api/posts/${id}`)
      .then(({ data }) => {
        updatePost(data)
        updateLoading(false)
      })

  }

  useEffect(() => {

    fetchData()
  }, [])

  async function handleComment() {

    await axios.post(`/api/posts/${id}/comments`, { content }, {
      headers: { Authorization: `Bearer ${token}` }
    })

    setComment('')
    fetchData()



  }
  async function handleDeleteComment(commentId) {
    if (!isCreator) {
      return null
    }
    await axios.delete(`/api/posts/${id}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {

        updatePost(resp.data)
      })
  }
  function handleEditCommentOne(commentId) {
    if (!isCreator) {
      return null
    }
    for (let i = 0; i < post.post_comments.length; i++) {
      if ((post.post_comments[i].id) === commentId) {
        setComment(post.post_comments[i].content)

      }
    }

    updateEditNumber(1)
    updateCommentIdentifier(commentId)
  }
  async function handleEditCommentTwo() {
    if (!isCreator) {
      return null
    }
    await axios.put(`/api/posts/${id}/comments/${commentIdentifier}`, { content }, {
      headers: { Authorization: `Bearer ${token}` }
    })

    updateEditNumber(0)
    setComment('')
    updateCommentIdentifier('')
    fetchData()

  }
```
## Wins
* Creating a PostgreSQL database with python controllers that successfully show the correct information on the front pages.

* Website functionality working without a hitch

## Challenges 
* We really struggled with the creation of the tables and trying to implement additional many to many tables. We realised that this was not neccesary for what we were looking to display on the front end so we redid our models and the correct id's the the relationalships successfully displayed on Table Plus.

* Filtering the posts depending on what the user wants to see

## Conclusions 
Overall I am happy with the results of this project, especially as it was our first python SQLAlchemy project. However there are a few missing features I would like to add such as a like a button for comments and expanding the app to more skills that just languages. 

