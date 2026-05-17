# library_mgmt_system

    commiting by shailesh 

# library-management-system
This is a library managment API Backend for the managment of users and the books


# Routes and the Endpoints

## /users
GET: Get all the list of users in the system POST: Create/Register a new user

## /users/{id}
GET: Get a user by their ID PUT: Updating a user by their ID DELETE: Delating a user by their ID (Check if the user still has an issued book) && {is there any fine/penalty to be collected}

## /users/subscription-details/{id}
GET: Get a user subscription details by their ID >> Date of subscription >> Valid till ? >> Fine if any ?

## /books
GET: Get all the books in the system POST: Add a new book to the system

## /books/{id}
GET: Get a book by its ID PUT: Update a book by its ID DELETE: Delete a book by its ID

## /books/issued
GET: Get all the issued books

## /books/issued/withFine
GET: Get all issued books with their fine amount

### Subscription Types
>> Basic (3 months)
>> Standard (6 months)
>> Premium (12 months)
If a user missed the renewal date, then user should be collected with $100 If a user misses his subscription, then user is expected to pay $100 If a user misses both renewal & subscription, then the collected amount should be $200

## Commands:
npm init npm i express npm i nodemon --save-dev

npm run dev --> to start te appln

To restore node_modules and package-lock.json --> npm i/npm install

npm i mongoose npm install mongodb

mongodb+srv://rohankinnal1917:<db_password>@cluster0.v4yias1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 EJOCHEEAheUjejJJ mongodb+srv://rohankinnal1917:EJOCHEEAheUjejJJ@cluster0.v4yias1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

npm i dotenv

## MVC Architecture
>> M: Model (Structure of our MongoDb)
>> V: View (Frontend)
>> C: Controllers (Brain/Logic of a route)
DTO (Dtat Transfer Object)