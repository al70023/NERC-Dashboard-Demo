# AWS Cloud Deployed NERC IT Dashboard
  
![image](https://github.com/al70023/NERC-Dashboard-Demo/assets/87347668/f6d3efe2-3ce9-4c79-99d8-e58208ebd202)

A full-stack web application meant to replace common IT dashboard's such as ServiceNow.  
The Dashboard allows for:
- Detailed viewing between related entities
- Navigation between repeated and related entries within various tables
- Searching for values throughout the database tables
- Generating of formatted PDF reports with user-selected filters
- Intuitive updating of database through step-by-step process and error checking
- Inserting new entries and deleting existing entries in the database
     
Utilizing React, Node, Express, and PostgreSQL.  

### [Navigate to the Dashboard Here](http://nerc-dashboard-frontend.s3-website.us-east-2.amazonaws.com/)  

## Table of contents
* [Database Design](#database-design)
* [AWS Cloud Network Architecture](#aws-cloud-network-architecture)
* [Bugs](#bugs)


## Database Design
Simple Entity-Relationship Diagram view of postgreSQL database powering this project.  
  
You'll notice that Change_Controls table does not have any foreign keys or direct associations with Software_Updates_to_Asset.  
This was purely a personal choice of not limiting dependence between the two, and code independently looks up change controls in the latter table.

![ERD pgerd](https://github.com/al70023/NERC-Dashboard-Demo/assets/87347668/7f97d298-b664-444d-9e34-a2cebe796fcf)



## AWS Cloud Network Architecture
Cloud Netowrk Design Diagram of cloud implementation of this project (current migration WIP).     

![network diagram drawio](https://github.com/al70023/NERC-Dashboard-Demo/assets/87347668/11e66660-3e7a-4799-9682-e9095f441128)



## Bugs
1. Currently, running npm install in the root directory will reinstall a package being used for the table formatting: `react-bootstrap-table2-toolkit`      
   This package has a bug that produces an error. I manually fixed the package, however, every npm install resets to old package downloaded online.
   Thus, I keep the updated package as a seperate folder in the main directory, and drag a copy of it into my node_modules if I ever need to run npm install.    

2. On Update Baseline (Existing Asset), if the last action taken on step 1 (change control information form) is to attach a screenshot, that screenshot will not persist in saved state.   
   Thus, last action when filling out the change control info form should be typing into some field, before moving on to next step.

3. On Reports, Whole Baseline Report has no functionality (haven't implemented yet).  

4. On Update Baseline stepper, when selecting Ports to modify, "Add Port" button has no function (haven't implemented yet).   
   
5. Implement responsiveness to UI

6. Initial load of page requires a couple of refreshes to fetch and load data.
   
