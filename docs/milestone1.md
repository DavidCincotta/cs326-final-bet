# cs326-final-bet
Final project for web programming course

# Team: &#1489;

# Application
UMass Course Explorer

# Team Overview:

[David Cincotta](https://github.com/DavidCincotta)

[Tom McQuade](https://github.com/tommcquade)

[Ilya Vashchylka](https://github.com/ilyavash)

# Data Interactions

## Innovative Idea

A forum for students to discuss their experiences in past and present courses, as well as a repository for helpful documents and links within each class.  This application is similar to sites such as ratemyprofessor, but ours is used to focus on the specific courses in the various UMass curriculums.  We want to provide a place where students can get help deciding what classes they should take, with more explanation of what to expect from people who have already taken the class.  Having a better idea of what to expect in our classes makes it easier to choose which ones we actaully want to take.  During the course of our time in college, we are all faced with courses that don't seem to click for us, and we spend time finding outside sources to help ensure we learn what we need to succeed.  Our project will also act as a centralized location where students can post various resources they have found helpful in their experience of taking whatever class they wish to post about.

## Important Components

The classes in our application will be chosen and added by students themselves.  They will be able to create new forum spaces for whatever class they wish.  It is crucial in order to make one of these posts to be a UMass student.  No one without a UMass email will be able to create a class as we want to ensure that only those who have taken the class can create the class discussion area.  Students must also select the specific UMass college the course belongs to.  We will provide different tabs to represent the various sections of each class, such as an informational tab, discussion area, and a table of important resources.  There will also be a search function where one can search for a specific class, both to find information and ensure that no redundant sites are added.  

# Sitemap and Wireframes
Our application will first require the user to login, or create an account if they do not already have one.  A UMass email will be required for both.  After logging in, the user 
is redirected to the front page.  There is a sidebar menu that can be toggled on and off that contains links to the different tabs off the application.  The tabs on the front page are for **Courses**, **Directory**, and **Search**.  The front page acts as a search interface to find the different courses that are available.  The Courses tab allows the user to view the classes they have already added.  The directory tab contains a list of all classes on the site listed alphabetically. The search bar will, you guessed it, allow the user to find a specific course if it exists.  This home page will also be where the user can choose to create a new course page.  They will enter various information such as the course number and name.  There will also be an entry for a character limited description which is displayed in the tables listing the courses, and another entry for a longer description displayed on the course's page.  

After selecting a course, the user is faced with a different menu; the tabs now read **Information**, **Resources**, and **Forum**.  The Information tab is loaded by default and displays course information, such as who the current instructor is and the years the course has been active.  The Resources tab will keep a running list of all the helpful things students have found over the years.  This information is not deleted, always appended to.  The Forum tab will provide the ability to make a post to ask questions or provide random bits of wisdom, and all posts will allow users to reply and carry out conversations about their experience in the course.  

## Sitemap
![Alt text](https://github.com/DavidCincotta/cs326-final-bet/blob/main/docs/sitemap.png?raw=true "sitemap")

## Wireframe
![Alt text](https://github.com/DavidCincotta/cs326-final-bet/blob/main/docs/wireframe.png?raw=true "wireframe")

# HTML Screenshots

# Teamwork Makes the Dream Work
The breakdown of our efforts was very equal as we all spent SEVERAL hours together on Zoom putting this milestone together.  We split the workload up based on the different pages we needed to create.  This allowed each of us to add some CSS as well as HTML to the mix.  David handled the physical creation of the wireframe and sitemap on Zoom with Ilya and Tom present for collaboration on the appearance and functionality.  In terms of coding, Ilya handled the login/account creation pages and interactions, and the tab switching functionality. David created the Javascript routines to load the pages, dynamically create grids, and handled the search pages.  Tom focused on the course information, resources, and forum tabs, as well as the pages used to create and edit course information.  