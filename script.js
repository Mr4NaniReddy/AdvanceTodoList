$(document).ready(function(){
    const form = $('#form');
    const taskInput = $('#input');
    const taskList = $('#todos');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    form.on('submit', function(e){
        e.preventDefault();
        addTask();
    });

    function addTask(){
        const taskText = taskInput.val();
        if(taskText){
            const task = {text: taskText};
            tasks.push(task);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskInput.val('');
            displayTasks();
        }
    }

    function deleteTask(index){
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }

    function editTask(index){
        const $li = taskList.find(`li:eq(${index})`);
        const $span = $li.find('span');
        const $editInput = $('<input type="text" class="input" value="' + tasks[index].text + '">');
        $span.replaceWith($editInput);
        $editInput.focus();

        $editInput.on('blur keyup', function(e) {
            if (e.type === 'blur' || (e.type === 'keyup' && e.key === 'Enter')) {
                const newTaskText = $editInput.val().trim();
                if (newTaskText) {
                    tasks[index].text = newTaskText;
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    displayTasks();
                } else {
                    alert('Task cannot be empty.');
                    editTask(index);
                }
            }
        });
    }

    function displayTasks() {
        taskList.empty();

        tasks.forEach((task, index) => {
            const $li = $('<li>');

            $li.html(`
                <span>${index+1}. ${task.text}</span><br>
                <button class="edit-button" data-index="${index}">Edit</button>
                <button class="delete-button" data-index="${index}">Delete</button>
                <br>
            `);
            taskList.append($li);
        });

        $('.edit-button').off('click').on('click', function() {
            const index = $(this).data('index');
            editTask(index);
        });

        $('.delete-button').off('click').on('click', function() {
            const index = $(this).data('index');
            deleteTask(index);
        });
    }

    displayTasks();
});
