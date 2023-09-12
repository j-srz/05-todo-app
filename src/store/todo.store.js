import { Todo } from "../todos/models/todo.model";

export const Filters = {
  All: "All",
  Completed: "Completed",
  Pendenting: "Pending",
};

const state = {
  todos: [
    new Todo("Agregar una nueva tarea"),

  ],
  filter: Filters.All,
};

const initStore = () => {
  loadStore();
  console.log("InitStore 🦄");
};

const loadStore = () => {
  if (!localStorage.getItem('state')) return;

  const {todos = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));
  state.todos = todos;
  state.filter = filter;
};

const seveStateToLocalStorage = () => {
  localStorage.setItem('state', JSON.stringify(state))
}


const getTodos = (filter = Filters.All) => {
  switch (filter) {
    case Filters.All:
			// ? ¿Por que se aplico la desestructurracion de arreglos y que devuelve en caso de no usarse?
      return [...state.todos];
    case Filters.Completed:
      return state.todos.filter((todo) => todo.done);

		case Filters.Pendenting:
      return state.todos.filter((todo) => !todo.done);

		default:
			throw new Error(`Option ${ filter } is not valid`)

  }
};

const addTodo = (descripcion) => {
  if ( !descripcion) throw new Error('Description is required');

	state.todos.push (new Todo(descripcion))

  seveStateToLocalStorage();
};

const toggleTodo = (todoId) => {
	state.todos = state.todos.map(todo => {
		if (todo.id === todoId) {
			todo.done = !todo.done;
		}
		return todo;
	})
  seveStateToLocalStorage();
};

const deleteTodo = (todoId) => {
  state.todos = state.todos.filter(todo => todo.id !== todoId);
  seveStateToLocalStorage();
};

const deleteCompleted = () => {
	state.todos = state.todos.filter(todo => !todo.done );
  seveStateToLocalStorage();
};


/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
	// ! Agregar validacion de que el filtro exista
	state.filter = newFilter;
  seveStateToLocalStorage();
};

const getCurrentFilter = () => {
  return state.filter;
};

export default {
  getTodos,
  addTodo,
  deleteCompleted,
  deleteTodo,
  getCurrentFilter,
  initStore,
  loadStore,
  setFilter,
  toggleTodo,
};
