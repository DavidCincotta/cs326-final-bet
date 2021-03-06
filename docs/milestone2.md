# Milestone 2 Write Up
## Heroku link
Here is the link to our Heroku app.  Unfortunately we were not able to get the deployment ready in time :( 
https://umass-course-explorer.herokuapp.com/

## Screenshots
![Screenshot 1](/screenshots/m2screenshot1.png "screenshot1")

### The delete button sends a DELETE request to the server and removes the account.  The update button takes the parameters above and sends a patch request to the server to update the corresponding values.
----------------------------------

![Screenshot 2](/screenshots/m2screenshot2.JPG "screenshot2")

### The create post button will open the post creation area where the user can input a title and content for the post.  A POST request is made to create the post in the database and allow for responses to be stored with it.
---------------------------------------

![Screenshot 3](/screenshots/courses.JPG "screenshot3")

### The table is built through a request to the server to retrieve the proper courses that should be listed here.  These courses are specific to the user; they are the courses the user has chosen to subscribe to.  
------------------------------

![Screenshot 4](/screenshots/m2screenshot3.png "screenshot4")

### The client sends a POST request to the server with the above parameters to create a new account.  
--------------------------



## Endpoint Descriptions

![Architecture](/docs/endpoints.png "endpoints")
### Accounts
- createAccount: Used to send user information to the server to be stored in a database. This will effectively create a new account for the user who signed up.
- login: Used to verify users information to allow them to log in to their account.  This endpoint is hit after a user types their info and clicks the log in button.
- update: Used to change account information such as password and notification flag.  Accessible only after the user has logged in and would like to change their settings.
- delete: Used to delete a user account.  Will query the server/database for the user information and remove it so that the user no longer has access to any of their account.

### Courses
- getCourses: Used to get all of the courses that a user is subscribed to from the server.  The courses will be displayed in a table with links allowing the user to further explore each specific course.
- getDirectory: Used to retrieve a set number of courses at a time and some of their info from the database.  This endpoint is used to allow the user to scroll through all courses in the database sorted alphabetically by default.
- addCourse: Used to subscribe a user to a new course.  The course's id will be added to the users set of courses in the database so they can be notified about this course and view its information on the courses page (getCourses).
- search: Used to send query data to the server and check the database for a course that ha the same information.  

### Forum
- createPost: Used to send the user entered data to the server and store it for display on that specific course's forum page.  A post id is returned to allow each new post to easily be found and rendered on the client side.
- updatePost: Used to add a reply entered by the user into the discussion forum.  Will send the new reply to the server to be stored in a database and rerendered on the page with the new comment added.
- getPostFull: Used to get a post's title, and the replies attached to it to be rendered on the forum viewing page.  The unique post id is sent to ensure that the correct information is loaded.
- getPostShort: Similar to getPostFull, but only returns the title of the post.  This is used to be listed on the forum page for a given course, allowing the user to select from one of many different posts for any one class.  

## Division of Labor

We were lucky enough to have 3 different objects, each with their own set of endpoints, between the three of us.  We therefore split the labor so that Ilya could handle the accounts, David was in charge of the course directories and Tom handled the forum setup.  We all collaborated on our flowchart decided what endpoints and classes would be necessary to create.  We spend most of our coding time on Zoom together working on individual parts and providing each other with support when needed.  