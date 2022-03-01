// const { v4 : uuidv4 } = require('uuid');

// task model
const Task = require('../models/Task');

const getAllTaks = async (_, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({tasks});
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const getTask = async (req, res) => {
    try {
        // the taskID gonna be the alias of the #id
        const { id:taskID } = req.params;
        const task = await Task.findOne({ _id: taskID });
    
        // if bad _id get passed, the above #task variable will be undefined and may cause some issues. It need to be handled
        if(!task) {
            return res.status(404).json({ message: `Task with id ${taskID} has not been found.` });
        }
        
        res.status(200).json({ task });
        
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const createTask = async (req, res) => {
    // the instance of model is said to be #document, i.e here we are creating a new document
    // const newTask = new Task({
    //     title: 'Handling Altas MongoDB string connection',
    //     isCompleted: true
    // })
    try {
        const newTask = await Task.create(req.body)
        // res.send('Create a task')
        res.status(201).json({ newTask, status: 'success' });     
    } catch (error) {
        // console.log('Error : ', error);
        res.status(500).json({ message : error });
    }
}

const updateTask = async (req, res) => {
    try {
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
            res.status(404).json({ message: `Cannot update a task with id: ${taskID} as it does not exist` });
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id:taskID } = req.params; 
        const task = await Task.findOneAndDelete({ _id: taskID });
    
        if(!task) {
            return res.status(404).json({ message: `Cannot delete a task with id: ${taskID} as it does not exist` })
        }
    
        res.status(200).json({ task, status: 'success' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

module.exports = {
    getAllTaks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}
