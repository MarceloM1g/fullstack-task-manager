const express = require('express');

const {
    getTasks,
    createTask,
    deleteTask,
    editTask
} = require('../controllers/taskController');

const middleware = require('../middleware/middleware');

const router = express.Router();

router.get('/tasks', middleware, getTasks);
router.post('/tasks', middleware, createTask);
router.delete('/tasks/:id', middleware, deleteTask);
router.put('/tasks/:id', middleware, editTask);

module.exports = router;