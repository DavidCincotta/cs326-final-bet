# Team Name
Team-Bet

# Application Name
UMass Course Explorer

# Semester
Fall 2021

# Application Overview
We have implemented a website where students can share their experiences in different courses at the University of Massachusetts.  Users can create a page for a class with a specific professor.  These course pages contain a section for helpful resources that students found during their tenure in the class, as well as a forum section where users can make text posts about their experiences and begin dialogues with past, current and future students.  Instead of simply reviewing a professor as a whole, this application focuses on specific courses in an effort to help students avoid wasting their time taking classes that will do more harm than it will help.

# Team Members

[David Cincotta](https://github.com/DavidCincotta)

[Tom McQuade](https://github.com/tommcquade)

[Ilya Vashchylka](https://github.com/ilyavash)

# UI Interface

# API's
In addition to the table of endpoints shown below, we have a get request for each of the HTML files that our application serves.  All of these are simple requests that take no parameters, and send the requested HTML file.

![Endpoints](/docs/finalEndpoints.png "endpoints")


# Database

![Database](/docs/finalDatabase.png "database")

# URL Routes/Mappings

![URL Routes](/docs/routes.png "urlroutes")


# Authentication/Authorization

# Division of Labor

Our division of labor this semester has been fairly even. The distribution of work has been consistent in that Ilya handled the login pages and authentication, David created the course/directory functionality and Tom implemented the resources and forum portions of the course explorer.  We collaborated on CSS and design throughout the process, and worked together on creating our database schema as well as our API endpoints.  We worked well together considering that none of us knew each other prior to this project. Our team was able to play to our individual strengths and come up with a great, collaboratively built website.

# Conclusion

The HTML and CSS portion of this project came fairly easy to all of us, as well as the database implementation.  We found the simple designs of the webpages to be pretty straightforward, and didn't face too many hurdles until implementing our database queries.  Our server implementation was the hardest part of the project.  We were able to get the endpoints to work through curl and Postman, but we had a hard time integrating the endpoints into our actual application.  Once we achieved our goal for a few endpoints, the rest came along fairly easily.  The toughest technical hurdles we faced that we wish could have been covered more in depth were deploying the app to Heroku, and communicating with the database set up there.  We also noticed that some of the guides provided were not given in enough detail that slowed us down a bit.  For example, the guide for pg-promise only listed the option to "require" pg-promise when we needed to "import" it into our module.  The syntax for doing so was not provided and we were left to our own devices to figure it out.  Little things like this don't matter so much on their own, but when multiple small bugs like this occur, they can add up quickly.