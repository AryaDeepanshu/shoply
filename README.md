# Shoply
An ecommerce web project using Node, Express,  EJS, MongoDB

Live link: https://shoply.azurewebsites.net

Admin Details
```
    username: admin@admin.com
    password: Admin@123
```
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

- [x] Project - E-Commerce - 2
    - [x] **Verify email on Create Account:** When you create a new account, send a mail to the user for authentication of the email. After successfully authentication redirect to the Product Listing page.
    - [x] **Change Password:** User can change her password and send a mail that password changed successfully.
    - [x] **Forgot password:** Add a functionality for forgot password, Send a dynamic link on mail to reset the password

- [x] Project - E-Commerce - 3
    - [x] **Introduce two new buttons on the Products Page:**
        * Add to Cart - with all the products.
        * My Cart - When user click on this page shows all the items added to the cart.
    - [x] **User Not logged In:** If the user clicks on any of these buttons and not logged in then redirect to the login page and after login, he should come on this page only.
    - [x] **Add to Cart:** When the user clicks on the Add cart to add the product to the cart. Once we start maintaining the cart then load the cart at the time of the login itself.
    - [x] **View Cart:** On the "View Cart" page there should be 2 buttons with each item +/- quantity and delete the product from the cart. Maintain the cart accordingly. And when increasing the quantity check whether the stock is available or not.

- [x] Project - E-Commerce - 4
    - [x] **Introduce new role for Admin:** Differentiate users according to their role.
    - [x] **Introduce a new Page - Add product:** 
        * Only Admin can open this page
        * If someone tries to open this without login, should be redirected to the Login page.
        * And after login check whether the user is Admin or not. If not Admin then say not authorized to use this page.
        * Admin can add the new product, update the existing product, and delete the product.* When adding the product proper checks should be there on the Image - Size(up to 250kb), and Type(jpeg, jpg, or png).
