# Washington DC Monuments and Restaurants

## Description
When visiting D.C., tourists and locals often struggle to find restaurants close to 
the famous monuments. Our team designed and created a website that allows users to find
where their favorite monuments are located and what restaurants are also in the vicinity.

![alt text](/public/homepage.jpg)

## Link to Website
[https://arcane-taiga-17404.herokuapp.com/](https://arcane-taiga-17404.herokuapp.com/)

## Target Browsers
* Macbook Pro 13~

## Links
* [Developer Manual](https://github.com/sbashir1/Group17-Project-Base#developer-manual)

# Developer Manual
## How to install application and all dependencies
1. Clone this repository through Github Desktop or through Terminal.
2. Open repository in VSCode Terminal or Terminal application.
3. type ```npm install``` into terminal window and run.
4. The application should now be set to use.

## How to run application on a server
1. Open repository in VSCode terminal or Terminal application.
2. Run ```npm start```. There should be no errors.
3. In a web browser, go to url: http://localhost:3000/.

## To run tests for the software
We haven't written any tests in our repository, but Cyprus will allow you to run your own tests. 

1. Open two terminals in the main project repository.
2. Run "npm start" in the first terminal.
3. Run "npm test" in the second terminal.

## Server Application API
```/api``` - use apiRoute for restaurants and monuments data
* GET - Requests information from our database. returns response 'Server error' if there is an error
* POST - Creates new records/objects from retrieved data. return response 'Server error' if there is an error
* PUT - Updates a existing record. returns response 'Successfully Updated'
* DELETE - kill the table. returns response 'Successfully Deleted'

## Known Bugs and Future Development 

### Bugs:
  -The pages may load and glitch at first but after a second, they display nicely.
  
### Future Development: 
  1. Adding data for more restaurants
  2. Incorporating award and chef information into the website
  3. Matching the monuments to restaurants near them
  

* [Markdown guide](https://www.markdownguide.org/cheat-sheet/)
