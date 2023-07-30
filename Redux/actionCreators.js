import { addTodo, doTodo, removeTodo, getAllTodos } from './actions.js';

function addTodoAction(title){
    return {
        type: addTodo,
        title
    }
}
function removeTodoAction(id){
    return {
        type: removeTodo,
        id
    }
}
function doTodoAction(id){
    return {
        type: doTodo,
        id
    }
}
function getAllTodosAction(){
    return {
        type: getAllTodos
    }
}

export {
    addTodoAction,
    removeTodoAction,
    doTodoAction,
    getAllTodosAction,
}