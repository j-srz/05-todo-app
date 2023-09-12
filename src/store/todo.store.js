import { Todo } from "../todos/models/todo.model";

const Filters = {
  All: "All",
  Completed: "Completed",
  Pendenting: "Pending",
};

const state = {
  todos: [
    new Todo("Piedra del alma"),
    new Todo("Piedra del infinito"),
    new Todo("Piedra del tiempo"),
  ],
  filter: Filters.All,
};

const initStore = () => {
  console.log(state);
  console.log("InitStore 🦄");
};

const loadStore = () => {
  throw new Error("Not implemented");
};

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
};

const toggleTodo = (todoId) => {
  throw new Error("Not implemented");
};

const deleteTodo = (todoId) => {
  state.todos = state.todos.filter(todo => todo.id !== todoId);
};

const deleteCompleted = () => {
	state.todos = state.todos.filter(todo => todo.done );
};


/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
	// ! Agregar validacion de que el filtro exista
	state.filter = newFilter;
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
