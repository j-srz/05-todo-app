import todoStore, { Filters } from "../store/todo.store";
import html from "./app.html?raw";
import { renderTodos, renderPendingTodos } from "./use-cases";

const ElementIDs = {
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
  ClearCompletedButton: '.clear-completed',
  TodoFilters: '.filtro',
  PendingCountLabel: '#pending-count'
};

/**
 * @param {string} elementId
 */
export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(ElementIDs.TodoList, todos);
  updatePendingCount();
  };

  const updatePendingCount = () => {
    renderPendingTodos(ElementIDs.PendingCountLabel)
  }

  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  // referencias HTML
  const newDescriptionInfo = document.querySelector(ElementIDs.NewTodoInput);
	const todoListUl = document.querySelector(ElementIDs.TodoList);
  const clearCompletedButton = document.querySelector(ElementIDs.ClearCompletedButton);
  const filtersLIs = document.querySelectorAll( ElementIDs.TodoFilters);


  // listeners
  newDescriptionInfo.addEventListener("keyup", (e) => {
    if (e.keyCode !== 13) return;
    if (e.target.value.trim().length === 0) return;

    todoStore.addTodo(e.target.value);
    displayTodos();
    e.target.value = "";
  });

	todoListUl.addEventListener('click', e => {
		const element = e.target.closest('[data-id]');
		todoStore.toggleTodo(element.getAttribute('data-id'));
		displayTodos();
	})

	todoListUl.addEventListener('click', e => {

		if (e.target.classList.toString() === 'destroy') {
			const element = e.target.closest('[data-id]');
			todoStore.deleteTodo(element.getAttribute('data-id'));
			displayTodos();
		}

	})

  clearCompletedButton.addEventListener('click', () => {
    todoStore.deleteCompleted();
    displayTodos();
  })

  filtersLIs.forEach( element => {
    element. addEventListener('click', element => {
      filtersLIs.forEach(el => el.classList.remove('selected'));
      element.target.classList.add('selected');

      switch (element.target.text) {
        case 'Todos':
          todoStore.setFilter( Filters.All )
          break;
        case 'Pendientes':
          todoStore.setFilter( Filters.Pendenting )
          break;
        case 'Completados':
          todoStore.setFilter( Filters.Completed )
          break;
      }

      displayTodos();
    })
  })


};
