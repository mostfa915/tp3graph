const Task = require('./taskModel');

const taskResolver = {
    task: async ({ id }) => await Task.findById(id),
    tasks: async () => await Task.find(),
    addTask: async ({ title, description, completed, duration }) => {
        const task = new Task({ title, description, completed, duration });
        await task.save();
        return task;
    },
    completeTask: async ({ id }) => {
        const task = await Task.findById(id);
        if (task) {
            task.completed = true;
            await task.save();
            return task;
        }
        return null;
    },
    changeDescription: async ({ id, newDescription }) => {
        const task = await Task.findById(id);
        if (task) {
            task.description = newDescription;
            await task.save();
            return task;
        }
        throw new Error("Tâche non trouvée");
    },
    deleteTask: async ({ id }) => {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            throw new Error("Tâche non trouvée");
        }
        return task;
    },
};

module.exports = taskResolver;
