window.addEventListener('load', () => {
    const form = document.querySelector(".task-form");
    const input = document.querySelector("#task-form-input");
    const lists = document.querySelector(".tasks");

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTask = (task) => {
        const task_el = document.createElement("div")
        task_el.classList.add("task");

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        const task_input = document.createElement("input");
        task_input.classList.add("text");
        task_input.type = "text";
        task_input.value = task;
        task_input.setAttribute("readonly", "readonly");
        task_content_el.appendChild(task_input);

        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");

        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "Edit";

        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "Delete";

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);
        task_el.appendChild(task_content_el);
        task_el.appendChild(task_actions_el);

        lists.appendChild(task_el);

        task_edit_el.addEventListener('click', () => {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_input.removeAttribute('readonly');
                task_input.focus();
                task_edit_el.innerText = "Save";
            } else {
                task_input.setAttribute("readonly", "readonly");
                task_edit_el.innerText = "Edit";
                tasks.push(task_input.value);
                saveTasks();
            }
        });

        task_delete_el.addEventListener('click', () => {
            tasks.splice(tasks.indexOf(task), 1);
            saveTasks();
            lists.removeChild(task_el);
        });
    };

    for (let task of tasks) {
        addTask(task);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = input.value;
        if (!task) {
            alert("Bhai Apna task bharo");
            return;
        }
        addTask(task);
        tasks.push(task);
        saveTasks();
        input.value = "";
    });
});
