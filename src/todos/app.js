import todoStore from "../store/todo.store";
import html from "./app.html?raw";
import { renderTodos } from "./use-cases";

const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
}

/**
 * @param {string} elementId
 */
export const App = (elementId) => {


    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
    }


    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    // referencias HTML 
    const newDescriptionInfo = document.querySelector(ElementIDs.NewTodoInput);

    // listeners
    newDescriptionInfo.addEventListener('keyup', e => {
        if (e.keyCode !== 13) return;
        if (e.target.value.trim().length === 0) return;

        todoStore.addTodo(e.target.value);
        displayTodos()
        e.target.value = '';

    })

}