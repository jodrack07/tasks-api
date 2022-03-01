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
        res.status(201).json({ newTask });     
    } catch (error) {
        // console.log('Error : ', error);
        res.status(500).json({ message : error });
    }
}

const updateTask = (req, res) => {
    res.send('Update task')
}

const deleteTask = (req, res) => {
    res.send('Delete task')
}

module.exports = {
    getAllTaks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}
