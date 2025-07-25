const addButton = document.querySelector('.add-button');
const todoInput = document.querySelector('.todo-input');
const taskList = document.querySelector('.task-list');

// Make a single function to attach editing behavior to a task
function makeTaskEditable(span) {
    span.addEventListener('click', () => {
        span.setAttribute('contenteditable', 'true');
        span.focus();

        span.addEventListener('blur', () => {
            span.removeAttribute('contenteditable');
        });

        span.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                span.blur();
            }
        });
    });
}

// Make all pre-existing tasks editable
document.querySelectorAll('.editable-task').forEach(makeTaskEditable);

addButton.addEventListener('click', () => {
    const taskText = todoInput.value.trim();

    if (taskText !== '') {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="task-row">
                <span class="editable-task" contenteditable="false">${taskText}</span>
                <div class="task-actions">
                    <button class="done-btn">✓</button>
                    <button class="delete-btn">✕</button>
                </div>
            </div>
        `;
        
        const noTaskLi = document.querySelector('li.no-task');
        if (noTaskLi) {
            noTaskLi.remove();

        }

        
        taskList.appendChild(li);
        todoInput.value = '';

        const newTask = li.querySelector('.editable-task');
        const deleteBtn = li.querySelector('.delete-btn');
        const doneBtn = li.querySelector('.done-btn');

        makeTaskEditable(newTask); // ✅ Make the new task editable
        deleteBtn.addEventListener('click', () => {
            li.remove();

            // Check if ul is now empty
            if (taskList.children.length === 0) {
                const noTaskMsg = document.createElement('li');
                noTaskMsg.className = 'no-task';
                noTaskMsg.innerHTML = `<p>You have no task..</p>`;
                taskList.appendChild(noTaskMsg);
            }
        });

        doneBtn.addEventListener('click', () => {
            newTask.style.textDecoration = 'line-through';
        });
    }
});

