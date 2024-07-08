# Meeting Room Booking System for Co-working Spaces

## Live Link:

# How To Run The Application Locally

1. Clone the github repository using **git clone** command:

`git clone https://github.com/KowshikChakraborty-AIUB/apollo-level2-web-dev-batch-3-assignment-3`

You can also find the https address by clicking the **Code** (green colored) button.

Now, to upload the application in your github respository, you need to **remove the .git folder** becuse the **.git** folder is currently tracking my github repository and if you change anything and push it to github, then it will be changed in my repository not your. To remove **.git** folder use this:

`del /F /S /Q /A .git`

First you need to go the path (The location where your application is cloned) of the application and run the command prompt (cmd) there. Then you can use the above command.

Or you can simply go to the application folder and just delete the **.git** folder from there.

2. You can also download the zip file and extract the application (no **.git** folder will be created).

3. Use `npm i` or `npm install` to install all the necessary package (typescript, express, cors, mongoose, eslint etc.) used in the application.

4. Check the **package.json** file and you can get an idea of dev dependencies used there. You can also use the scripts declared in the package to run the things easily. For example:

`npm run start:dev` to run the application in development phase.

# Project Features

* **Users:** Normal users and Admin
* **Pages users can interact:** Room, Slot, Booking

1. **Creating user's account:** Users or admins can register providing necessary information.

2. **Login:** Users or admins can login to their accounts through email id and password.

3. **Room:** Only **admins can create, update, and delete** meeting rooms information and **users can get** all the rooms information.

4. **Slot:** Only **admins can create and get** slots information for a specific room and **users can access** slots and book a room for specific time slots.

5. **Booking:** Only **admins can update and delete** bookings information. **Admin can also access all the bookings** data whereas, **users can only create and get their own bookings** informtaion.

# Technology Used

1. **Backend:** Node, Express, Cors (cross origin policy), MongoDB and Mongoose, dotenv (for local environment variables).

2. **Token authentication & authorization:** Jason Web Token (JWT).

3. **Schema declaration and validation library:** Zod validation.

4. **Discover problems and create linting rules:** eslint.

5. **Interact with HTTP status codes:** http-status.

6. **Password hashing:** bcrypt.

7. **Parsing cookies from requests:** cookie-parser.
