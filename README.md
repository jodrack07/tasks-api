# TASKS-API
TASKS-API is a simple RESTful API build with Node and Express with the support of POSTMAN in the testing proccess

## Dependencies
Please, refer the package.json for detailed information.

## Endpoints
### List of tasks
GET /api/tasks
returns the list of all taskS

### Get a single task
GET /api/tasks/:id
returns information about a specifi task
- If he id is not available, an error will be thrown telling that the book is not available


### Create a new task
POST /api/tasks/:id
create and return the new task created.

### Update a task
PATCH /api/taks/:id
Update and returns a specific task
- If he id is not available, an error will be thrown telling that the book is not available

### Delete a task
DELETE /api/tasks/:id
delete and returns the task that has been deleted.
- If he id is not available, an error will be thrown telling that the book is not available

## Author : JODRACK
- Email : [drack.sir01@gmail.com](drack.sir01@gmail.com)

 
