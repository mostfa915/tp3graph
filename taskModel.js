const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
    duration: Number,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
