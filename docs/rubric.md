#Grading Rubric

Our project encourages collaboration between peers to review, discuss and compile information about courses at UMass. 

In this spirit, our project should be graded along the lines of with completeness, functionality, and appearance in mind.

There are four tables in our database, with four sets of corrosponding pages. 

1. User Accounts
2. Courses
3. Resources
4. Forum Posts

###Accounts

There are three pages associated with account endpoints: login/signup, settings and signout. The login and signup pages will authenticate your client by storing a cookie with your unique user id hash value. This authentication is stored in local memory so it saved between sessions until the signout button is pressed. The signout function is simple, by just deleting the cookie, the authentication is revoked. Finally there is the settings page: users can update any feild in their account, or delte it entirely. 

CRUD

##Courses

The main purpose of the application is to give a place for users to create information pages about their courses: this starts off in the '/createCourse' page. The first thing you are presented with after loging in is a button that will link you to this page. From there you can insert any relevant information for the course. Once submitted, it redirects your client to the newly created information page. At that point you can edit, track or untrack the course. Tracking the course will populate the previously empty '/courses' page. If the course information is not correct, or you want to add some flair, you can edit the course information, with the previous values as a base.

The other function that we provide users is the ability to browse and search for classes. Browsing can be done on the Directory page, it holds a table of all courses created on the site. The search page allows users query the course database by three fields: course name, college, and course number. With no inputs, it returns the whole directory. Every course entry on these pages has a link to the information page of that course.

CRU-

##Resources

User selected links can be fount and generated after selecting a course, opening the menu, and selecting the Resources tab. A reminder of what course is selected is shown in the top right. Resource creation is simple and done in much the same format as course creation.

CR--

##Forum

Post threads can be found just bellow the resources tab. It allows users to create a new thread with a title and body, and for any authenticated user to post a reply. Your account username is displayed here. 

CR--
