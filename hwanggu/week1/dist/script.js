"use strict";
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');
let todos = [];
let dones = [];
let nextId = 1;
const addTodo = () => {
    const text = todoInput.value.trim();
    if (text === '')
        return;
    const todo = { id: nextId++, text };
    todos.push(todo);
    todoInput.value = '';
    render();
};
const completeTodo = (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo)
        return;
    todos = todos.filter((t) => t.id !== id);
    dones.push(todo);
    render();
};
const deleteDone = (id) => {
    dones = dones.filter((d) => d.id !== id);
    render();
};
const render = () => {
    todoList.innerHTML = '';
    doneList.innerHTML = '';
    todos.forEach((todo) => {
        var _a;
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <span class="todo-item__text">${todo.text}</span>
            <button class="todo-item__button todo-item__button--complete" data-id="${todo.id}">완료</button>
        `;
        (_a = li.querySelector('button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => completeTodo(todo.id));
        todoList.appendChild(li);
    });
    dones.forEach((done) => {
        var _a;
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <span class="todo-item__text">${done.text}</span>
            <button class="todo-item__button todo-item__button--delete" data-id="${done.id}">삭제</button>
        `;
        (_a = li.querySelector('button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => deleteDone(done.id));
        doneList.appendChild(li);
    });
};
addButton.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter')
        addTodo();
});
