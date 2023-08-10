# Shoply
An ecommerce web project using Node, Express,  EJS, MongoDB

________________________________

### Development Requirements

*  Node modules mentioned in `package.json`
* MongoDB cluster URI for database

### Running Project:
* For devlopment
```bash
npm run dev
```
* Normal
```bash
npm start
```


### Project Status
- [x] Project - E-Commerce - 1
    - [x] **User story 1:** Create a homepage where the user can either log in or move to the new account webpage.
    - [x] **User story 2:** After login,display the name of the user and an option for logout on every page of the project.
    - [x] **User story 3:** Products page - Store the products in Files and then open the home page to show the first 5 products. Fetch all the information of these products but only show the image and product name. Give one button with each product - View Details  .  There should be a "Load more products" button on this page.
    - [x] **User story 4:**  When user click on the "View Details" show the description of the product in popup from the already fetched data. If the product description is not already fetched then check on the server side and fetch that information using API and save that in array also.
    - [x] **User story 5:**  When user click on "Load more" fetch the next 5 products from the file and show them on the page.