const mongoose = require('mongoose');

// schema, refers the structure of a document
const TaskSchema = mongoose.Schema({
    title: { 
        type: String,
        required: [true, 'Task title is required'],
        trim: true,
        maxLength: [30, 'Task title must be less or equal to 30 characters']
    },
    isCompleted: {
        type: String,
        // with default: false, we do not need to specify the required key. When the isCompleted is not specified its value will be set to #false
        default: false
    }
});

// model, is just a copy of the Schema object that allows us to read and write a document
module.exports = mongoose.model('Task', TaskSchema);

