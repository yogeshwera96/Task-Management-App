const express = require('express');
const router =  express.Router();
const { getTasks, addTask, deleteTask, editTask } = require("./../controllers/tasksController");

router.get('/', getTasks );
router.post('/', addTask);
router.delete('/:id', deleteTask );
router.post('/:id', editTask);


module.exports = router;