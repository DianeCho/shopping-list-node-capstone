# Shopping List Node Capstone
The purpose of this app is to find a recipe using Yummly's API to retrieve delicious recipes that users can create a shopping list

# MVP workflow
* Introduction screen.
* --> Explanation of the application
* ----> Click to Enter
* ------> login to page to enter to the site.
* --------> Search for recipes
* --------> select recipes.
* ----------> Add to favorites to return later.
* Screen displays shopping list.
* --> User can edit the shopping list.
* ----> Click to continue.
* ------> Final shopping list.
* --------> User can print the shopping list
* ----------> User can add shopping list to favorites.

# User Stories
* As a user I want to quickly understand the purpose of the site in order to use it to create a shopping list.
![Landing page screen shot](https://github.com/terrylthompsonintx/shopping-list-full-stack-capstone/blob/master/github-images/1.png)
* As a user I want to be able to search for recipes in order to find the ingredients to add to the shoppng list.
![Landing page screen shot](https://github.com/terrylthompsonintx/shopping-list-full-stack-capstone/blob/master/github-images/2.png)
* As a user I want to select a recipe and assign it to a day of the week in order to view the recipe for that day.
![Landing page screen shot](https://github.com/terrylthompsonintx/shopping-list-full-stack-capstone/blob/master/github-images/3.png)
* As a user I want to aggregate ingredients to a shopping list and view as a web page in order create the meal.
![Landing page screen shot](https://github.com/terrylthompsonintx/shopping-list-full-stack-capstone/blob/master/github-images/4.png)
* As a user I want to be able to delete items from the shopping list that I already have so I dont spend unnecassarily.
![Landing page screen shot](https://github.com/terrylthompsonintx/shopping-list-full-stack-capstone/blob/master/github-images/5.png)
* As a user I want to be able to delete the shopping list and menu once I am finished.
![Landing page screen shot](https://github.com/terrylthompsonintx/shopping-list-full-stack-capstone/blob/master/github-images/6.png)

## Screenshots
![Landing page screen shot](https://github.com/terrylthompsonintx/shopping-list-full-stack-capstone/blob/master/github-images/cap1.png)
![Account setup screen shot](https://github.com/terrylthompsonintx/shopping-list-full-stack-capstone/blob/master/github-images/cap2.png)
![User homepage screen shot](https://github.com/terrylthompsonintx/shopping-list-full-stack-capstone/blob/master/github-images/cap3.png)
![Achievement timeline screen shot](https://github.com/terrylthompsonintx/shopping-list-full-stack-capstone/blob/master/github-images/cap4.png)
![Skills word cloud screen shot](https://github.com/terrylthompsonintx/shopping-list-full-stack-capstone/blob/master/github-images/cap5.png)
![Skills word cloud screen shot](https://github.com/terrylthompsonintx/shopping-list-full-stack-capstone/blob/master/github-images/cap6.png)
## Working Prototype
Find a working prototype with Node at https://shopping-list-capstone.herokuapp.com/ .

## Functionality
* When the user brings up the landing page it explains the pupose of the app.
* The user then enters the app and searches for recipes.  Once they have selected one they can search again or quit.
* The user can assign a recipe to the day of the week.
* The user can generate a shopping list and then delte items they already have.
* The user can select when they have added an item to their basket or delete the list.
* The user can view a list of links to recipes they have selected.

## Technical

#### Front End
* HTML5
* CSS3
* JavaScript
* jQuery

#### Back End
* Node.js with Heroku implementation
* Express.js
* MongoDB on mLab
* Mongoose
* Mocha and Chai
* Yummly API

#### Responsive

* The app is responsive and optimized for both desktop and mobile viewing and use


## API Documentation
API endpoints for the back end include:
* POST to '/users/create' for creating a new user
* POST to '/signin' to sign in an existing user
* POST to '/new/create' to add an achievement to a user's list of accomplishments
* PUT to '/achievement/:id' to update an existing achievement
* GET to '/achievements/:user' to access all of a user's existing achievements
* GET to '/achievement/:id' to access a single achievement by ID
* DELETE to '/achievement/:id' to delete a single achievement by ID

## Development Roadmap
Planned additional features and improvements will allow users to:
* Add user login.
* Currently only one user at a time can use the app, scale it up to multiple users.
