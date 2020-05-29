## Work notes

- Initially added react components to split form into separate parts for address, contact, etc
- Updated the labelled component to take a name prop, allowing key/value pairs to send to the api
- Discovered that the database server was running in the same script command as the api, this isn't a great way to do anything. I appreaciate that this is probably been done for the purposes of creating the migration task step. I reworked the project to use docker-compose and individual docker files as a more standard approach, which if you use a temporary volume (not linked to a local directory) you can have the same non-persistent database. Also updated pm2 in the api to log out what is happening so that console.log's in the api can be used for debug. pm2 --watch seems not that robust for picking up files changes during development, however, its more useful this way that it was originally.
- Added knex db-seed project with migrations and seed data.
- Updated api to insert form submitted data to database.
- Added state based message/error logging on the front end for contact submissions.
- Added adminer as a database viewer, I'd rather not have this in the project setup but its asked for. I prefer to use standalone sql clients as part of my own development environment.
- Refactored MYSQL connections. It's really bad practice to include the db connection in one file, there was no error handling built in and the modern async/await benefits were completely lost. Tests have been added to cover positive results as well as error handling. The only part that needs is test is if MySQL reports back that it failed to close a connection pool. I'm not sure how this would be done.
- Refactored DB Queries and added tests
- Refactored end point controllers into a separate module to use with Express end points, split find/add author functionality into sepatate module for code clarity.
- Moved some constant string data into separate module for code clarity.
- Unfortunately the way this project is setup the express framework can not be tested as it is run procedurally meaning unit tests can not be applied. I like to wrap my express framework in a class that does server start/stop. This would allow me to write unit/integration tests for express giving a higher level of code coverage, also automated testing of api end points is far better than postman.
- Added some very liberal server side validation of inputs to demonstrate the process, should be tightened up and better positive/negative tests added to cover edge cases.
- Added eslint, which I applied to my tests as well as src.
- Added swagger documentation generation with the swagger editor image in docker-compose.yml

## Running the project

### Start up

`docker-compose up --build`

You may not need to build on subsequent runs. You can optionally run it with `-d` to detatch it from the terminal, however for development purposes its good to see terminal log output as the system is running.

### Tests

With jest installed globally:

To run tests, ensure system is running with `docker-compose up`

On a local terminal in the root directory:

`jest --coverage`

`jest <test-pattern-match>`

### Misc yarn run commands

Server

`yarn run lint`

`yarn run swagger`

### Swagger

Run swagger on:

`http://localhost:3080`

Please note `http` as by default it uses `https` and the api does not respond to `https` at present.

### Database Viewer

Run Adminer on

`http://localhost:8080`

### Shut down

`ctrl-d`

`docker-compose down`

## Your Challenge

Your challenge is a mix of tasks focussed around the day to day role of a JavaScript Node + React developer.
You may not get all of the tasks below completed, and it's at your discretion which you focus the most time to within each task.
Don't worry about spending too much time styling on the user interface - please simply ensure you are using semantic HTML and it is in a presentable state.

Please spend around 3 hours on the challenge, plus any time needed to get your environment up and running. If you need any assistance getting your environment running, please contact `ian@komododigital.co.uk` or the Komodo offices and we will support ASAP. Do not worry if you do not complete the challenge or the stretch goals. Please spend your time as you best see fit, particularly with a view to demonstrating your technical strengths.

Following the test, we will schedule a review conversation with you in due course, to discuss how the test went, your proposed solution, and ask wider questions around your background, experience, and suitability for the role.

## Scenario:

A client has asked for a contact form to be built to capture inbound support messages from their customers.

An associate developer has kickstarted the project for you, by creating a simple Express API with some stubbed API responses and some example React components. We need you to finish the job.

You must be able to provide your solution, in whole, in a zip file to Komodo to review and test.

## Tasks:

1. Setup and ensure the development environment is running correctly. Follow the setup instructions in `docs/setup.md`.
   - Visiting `http://localhost:3000/` - make sure you see a contact form with one field
   - Visiting `http://localhost:8080/` - make sure you see a response of `{"status":200,"data":{"message":"API Active"}}`.
2. Expand upon the "contact us" form to capture the users full name, address, telephone number, email address, and a message / note by creating sensible components.
   - Ensure to add in relevant validation.
3. Store submissions from the form into a sensibly structured MySQL database.
   - Include database migrations for the database schema.
   - Add a seeder for fake / test submissions.
4. Ensure that we can inspect the database and see the submissions made through the form.
5. Add relevant tests using suitable test frameworks.
   - React component tests using a framework of your choosing - Jest and react testing library are included in the bundle if you wish to use them.
   - Node tests using a framework of your choosing.
6. Add appropriate measures of code quality control.
7. Please use version control (GIT) to track your changes in code locally (no need for a remote).
8. Create an admin panel that we can log into and view all the submissions. (Optional stretch goal).

## Rules and Notes

- **If you get stuck or have any questions - ask for help!**
- Please ensure that the solution you supply back to Komodo is in a fit and working state for review.
  > Please include any documentation or additional setup instructions we need in order to run and test your solution.
  > Your solution will be run and tested on Mac OS X
- Feel free to use the internet as much as you would like to help you complete the task.
- You may take which ever approach you see fit to solving the problem, using the provided components or entirely new ones.
- Novel, efficient and sensible solutions are encouraged.

## Other Notes

**After stopping development, be sure to run `yarn stop`.**

Each time you run `yarn start`, you will be given a fresh database - so automated database migrations may be prudent to include.

There is a [postman collection](https://www.postman.com/) to help you work with the API.

**Thank you very much, good luck, and happy coding!**
