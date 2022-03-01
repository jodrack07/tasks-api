const express = require('express');
const router = express.Router();

// exporting controllers;
const { 
    getAllTaks, 
    createTask,
    getTask,
    updateTask,
    deleteTask 
} = require('../controllers/tasks.ctrl');

// for #createTask#, we'll use the same link as the #getAllTasks# but createTask will have some data in its body 
router.route('/').get(getAllTaks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;