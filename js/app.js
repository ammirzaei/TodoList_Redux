import { addTodo, removeTodo, doTodo, getAllTodos } from "../Redux/actions.js"
import { addTodoAction, doTodoAction, removeTodoAction, getAllTodosAction } from './../Redux/actionCreators.js';

const form = document.querySelector('#form'),
    input = document.querySelector('.todo-input'),
    todoList = document.querySelector('.todo-list'),
    filterTodo = document.querySelector('.filter-todo');

// Asseign Functions
window.onDeleteTodo = onDeleteTodo;
window.onChangeCompleted = onChangeCompleted;

// Create Todolist Reducer
function todolistReducer(state = [], action) {
    switch (action.type) {
        case addTodo: {
            const temp = [...state];
            temp.push({
                id: crypto.randomUUID(),
                title: action.title,
                isCompleted: false,
            });
            return temp;
        }
        case removeTodo: {
            const temp = [...state];
            return temp.filter((todo)=> todo.id !== action.id);
        }
        case doTodo: {
            const temp = [...state];
            return temp.map((todo)=> {
                if(todo.id == action.id) todo.isCompleted = !todo.isCompleted;
                return todo;
            })
        }
        case getAllTodos: {
            return state;
        }
        default: {
            return state
        }
    }
}

// Create Store
const store = Redux.createStore(todolistReducer)

// Events
form?.addEventListener('submit', (event)=>{
    event.preventDefault();
    store.dispatch(addTodoAction(input.value));
    generateTodoInDOM(getState());
    resetInput();
});
filterTodo.addEventListener('change', (event)=>{
    const value = event.target.value;
    store.dispatch(getAllTodosAction());
    let temp = getState();
    switch(value){
        case 'all' : {
            break;
        }
        case 'completed' : {
            temp = temp.filter((todo)=> todo.isCompleted);
            break
        }
        case 'incomplete' : {
            temp = temp.filter((todo)=> !todo.isCompleted);
            break;
        }
    }
    generateTodoInDOM(temp);
})

// Functions
function getState(){
    return store.getState();
}
function resetInput(){
    input.value = '';
}
function onDeleteTodo(id){
    if(id){
        store.dispatch(removeTodoAction(id));
        generateTodoInDOM(getState());
    }
}
function onChangeCompleted(id){
    if(id){
        store.dispatch(doTodoAction(id));
        generateTodoInDOM(getState());
    }
}
function generateTodoInDOM(states){
    let todos = '';
    states?.forEach((todo)=>{
        todos += `
          <div class="todo ${todo.isCompleted && 'completed'}">
                <li class="todo-item">${todo.title}</li>
                <button class="complete-btn" onclick="onChangeCompleted('${todo.id}')">
                    <i class="fas ${todo.isCompleted ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                </button>
                <button class="trash-btn" onclick="onDeleteTodo('${todo.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>`;
    });
    todoList.innerHTML = todos;
}