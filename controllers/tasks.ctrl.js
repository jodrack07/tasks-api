const Task = require('../models/Task');
const asyncWrapper = require('../middlewares/asyncWrapper');
const { CreateCustomError } = require('../util/custom-error');

const getAllTaks = asyncWrapper(async (_, res) => {
    const tasks = await Task.find({});
    res.status(200).json({tasks, nbHints: tasks.length});
})

const getTask = asyncWrapper(async (req, res, next) => {
    // the taskID gonna be the alias of the #id
    const { id:taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });

    // if bad _id get passed, the above #task variable will be undefined and may cause some issues. It need to be handled
    if(!task) {
        // passing the error to the next middleware which in this case is our custom error handler => err 
        return next(CreateCustomError(`Task with id ${taskID} has not been found.`, 404));
        // return res.status(404).json({ message: `Task with id ${taskID} has not been found.` });
    }
    
    res.status(200).json({ task });
})

const createTask = asyncWrapper(async (req, res) => {
    /*the instance of model is said to be #document, i.e here we are creating a new document
    const newTask = new Task({
        title: 'Handling Altas MongoDB string connection',
        isCompleted: true
    })
    */
    const newTask = await Task.create(req.body)
    // res.send('Create a task')
    res.status(201).json({ newTask, status: 'success' });     
})

const updateTask = asyncWrapper(async (req, res, next) => {
    const { id:taskID } = req.params;
    /**
     * #new: true# will allow as getting the updated version of the document since by default findOneAndUpdate returns the old version of the doc
     * #runValidators: true# will apply the validation so that we may get some error when necessary.
     */
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true
    })

    if(!task) {
        return next(CreateCustomError(`Cannot update a task with id: ${taskID} as it does not exist`, 404));
        // res.status(404).json({ message: `Cannot update a task with id: ${taskID} as it does not exist` });
    }

    res.status(200).json({ task });
})

const deleteTask = asyncWrapper(async (req, res, next) => {
    const { id:taskID } = req.params; 
    const task = await Task.findOneAndDelete({ _id: taskID });

    if(!task) {
        return next(CreateCustomError(`Cannot delete a task with id: ${taskID} as it does not exist`, 404));
        // return res.status(404).json({ message: `Cannot delete a task with id: ${taskID} as it does not exist` })
    }

    res.status(200).json({ task, status: 'success' });
})

module.exports = {
    getAllTaks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}
