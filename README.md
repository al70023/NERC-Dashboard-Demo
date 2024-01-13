# NERC IT Dashboard
A full-stack web application meant to replace common IT dashboard's such as ServiceNow.
Utilizing React, Node, Express, and PostgreSQL


## Table of contents
* [Setup](#setup)
* [Database Design](#database-design)
	
	
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
