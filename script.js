const taskForm = document.getElementById("task-form")
const taskInput = document.getElementById("task-input")
const addTask = document.getElementById("add-task")


// create tasks to store tasks
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// function to add a tasks to localstorage

function saveTasks(){
    localStorage.setItem('tasks',  JSON.stringify(tasks));

}

function save