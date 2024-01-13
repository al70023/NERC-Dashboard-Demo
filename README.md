# NERC IT Dashboard
A full-stack web application meant to replace common IT dashboard's such as ServiceNow.  
The Dashboard allows for:
- Detailed viewing between related entities
- Navigation between repeated and related entries within various tables
- Searching for values throughout the database tables
- Generating of formatted PDF reports with user-selected filters
- Intuitive updating of database through step-by-step process and error checking
- Inserting new entries and deleting existing entries in the database
     
Utilizing React, Node, Express, and PostgreSQL.  


## Table of contents
* [Setup](#setup)
* [Database Design](#database-design)
* [Bugs](#bugs)
	
	
## Setup
To run this project, open two terminals at the root directory.
Navigate to the backend folder in one of the terminals.
Then run npm start in both terminals.

### Terminal 1:
```
$ cd ../backend
$ npm start
```

### Terminal 2:
```
$ npm start
```


## Database Design
Simple Entity-Relationship Diagram view of postgreSQL database powering this project.  
  
You'll notice that Change_Controls table does not have any foreign keys or direct associations with Software_Updates_to_Asset.  
This was purely a personal choice of not limiting dependence between the two, and code independently looks up change controls in the latter table.

![ERD pgerd](https://github.com/al70023/NERC-Dashboard-Demo/assets/87347668/7f97d298-b664-444d-9e34-a2cebe796fcf)


## Bugs
1. Currently, running npm install in the root directory will reinstall a package being used for the table formatting: `react-bootstrap-table-toolkit`      
   This package has a bug that produces an error. I manually fixed the package, however, every npm install resets to old package downloaded online.
   Thus, I keep the updated package as a seperate folder in the main directory, and drag a copy of it into my node_modules if I ever need to run npm install.    

2. On Update Baseline (Existing Asset), if the last action taken on step 1 (change control information form) is to attach a screenshot, that screenshot will not persist in saved state.   
   Thus, last action when filling out the change control info form should be typing into some field, before moving on to next step.

3. On Reports, Whole Baseline Report has no functionality (haven't implemented yet).  

4. On Update Baseline stepper, when selecting Ports to modify, "Add Port" button has no function (haven't implemented yet).  
5. 
