const taskForm = document.getElementById("task-form")
const taskInput = document.getElementById("task-input")
const taskList = document.getElementById("task-list")
const themeToggleBtn= document.getElementById('themeToggle')

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.body.classList.add(currentTheme);
    themeToggleBtn.textContent= currentTheme=== 'dark-mode'? '🌙': '🌻'
}

// Add event listener to the toggle button
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Save the theme preference in localStorage
    if (document.body.classList.contains('dark-mode')) {
        themeToggleBtn.textContent='🌙';
        localStorage.setItem('theme', 'dark-mode');
    } else {
        themeToggleBtn.textContent = '🌻';
        localStorage.removeItem('theme');
    }
});


// create tasks to store tasks
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// function to add a tasks to localstorage

function saveTasks(){
    localStorage.setItem('tasks',  JSON.stringify(tasks));

}

function renderTask(){
    taskList.innerHTML='';
    tasks.forEach((task,index)=>{
        const li = document.createElement('li');
        li.className = `task-item ${task.completed? 'completed': ''}`;
        li.innerHTML=`
                <span class="task-text">${task.text}</span>
                <div>
                    <button class="complete-btn"> ${task.completed ? 'Undo':'Complete'}</button>
                    <button class ="delete-btn"> Delete</button>
                </div>

                 
        `;

        li.querySelector('.complete-btn').addEventListener('click',()=>{
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTask();
        });

        li.querySelector('.delete-btn').addEventListener('click',()=>{
            tasks.splice(index,1);
            saveTasks();
            renderTask();
        });
        taskList.appendChild(li);
    });
}

taskForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if(taskText){
        tasks.push({text: taskText, completed:false});
        saveTasks();
        renderTask();
        taskInput.value='';
    }
 
})

renderTask();
