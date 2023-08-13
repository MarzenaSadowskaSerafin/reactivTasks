{
    const tasks = [];

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;

        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks.push({ content: newTaskContent });

        render();
    };

    const bindEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    }

    const render = () => {
        let tasksListHTMLContent = "";

        for (const task of tasks) {
            tasksListHTMLContent += `
              <li class="listTask__item js-task">
                <button class="listTask__button listTask__button--toggleDone js-toggleDone">
                    ${task.done ? "👍" : ""}
                </button>
                <span class="listTask__content ${task.done ? "listTask__content--done" : ""}">
                    ${task.content}
                </span>
                <button class="listTask__button listTask__button--remove js-remove">
                    🗑
                </button>
              </li>
            `;
        }

        document.querySelector(".js-task").innerHTML = tasksListHTMLContent;

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskItem = document.querySelector(".js-newTask");
        const newTaskContent = newTaskItem.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskItem.value = "";
        }

        newTaskItem.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}