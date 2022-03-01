// const { v4 : uuidv4 } = require('uuid');

// task model
const Task = require('../models/Task');

const getAllTaks = (_, res) => {
    res.send('Get all tasks')
}

const getTask = (req, res) => {
    res.send('Get a single Task')
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
        res.status(500).json({ MainError: error, msg: MainError.message });
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
