// Select DOM elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const notification = document.getElementById('notification');

// Initialize tasks array from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks
const renderTasks = () => {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) li.classList.add('completed');

        // Create edit and delete buttons
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editTask(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(index);

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
};

// Function to add a new task
const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        renderTasks();
        showNotification('Task added successfully!');
    } else {
        showNotification('Please enter a task.', true);
    }
};

// Function to edit a task
const editTask = (index) => {
    const newTaskText = prompt('Edit task:', tasks[index].text);
    if (newTaskText !== null && newTaskText.trim()) {
        tasks[index].text = newTaskText.trim();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        showNotification('Task updated successfully!');
    }
};

// Function to delete a task
const deleteTask = (index) => {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    showNotification('Task deleted successfully!');
};

// Function to mark a task as completed
const toggleTaskCompletion = (index) => {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
};

// Function to show notification
const showNotification = (message, isError = false) => {
    notification.textContent = message;
    notification.className = isError ? 'notification error' : 'notification';
    setTimeout(() => {
        notification.textContent = '';
    }, 3000);
};

// Event listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Initial render
renderTasks();
