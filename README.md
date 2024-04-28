# Qubika Playwiright Solution

# EXERCISE 1: 

I attach a file into this project called: "IssuesForQuibikaWebPage.docx", that file contains the major bugs of application. 

# EXERCISE 2:

I implemented POM pattern into project, so you can see the folders, tests, pages, elements. those folder are related to E2E solution.

Moreover I implemented the API solution into folder "API". The file "api-request.js" contains 2 methods, the first one is the request to get the API token after loggin in with sent credentials and then storage the TOKEN, the second one, I'm using the TOKEN for creating a new user with the sent parameters (email and password).

For the E2E solution, into tests folder, the test file "QuibikaTests.spec" contains the solution for the exercise 2, which is calling the Pages objects and the API object, so first of all, it is creating the new user directly with the API requests and then, the same email and same password is being used into E2E.
Moreover I'm creating the names of subcategory, category, email and password randomly with library: FAKER.

Please Read the comments added into test and pages file.

The naming of mathods are clear of what they're doing.

# GIT

Please download the repo and the you will see a branch with the name: "QuibikaPWSolution" please go to that branch 
and execute the Project.

# INSTALL THE PACKAGES

Before run the project, please install the packages with : npm install into repo folder into terminal.
Please make sure the library: "node-fetch" is installed with the second version: -> npm install node-fetch@2 --save-dev
Because if the first version is installed so it won't support my solution.


# RUN THE SCRIPT.

Please go to repo solution and then run the project with this command: 

npx playwright test --headed

I'll attach some evidence of the test is run successfully. -> Please check the file: "EvidenceOfTestsArePassed.png".
