# Your Challenge

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