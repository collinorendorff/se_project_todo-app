import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import TodoCounter from '../components/TodoCounter.js';

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, '.counter__text');

const newFormVal = new FormValidator(validationConfig, addTodoForm);

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete() {
  todoCounter.updateTotal(false);
}

// The logic in this function is all handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  todoCounter.updateTotal(true);
  return todoElement;
};

const section = new Section({
  items: initialTodos, // pass initialtodos
  renderer: (item) => {
    const todo = generateTodo(item);
    section.addItem(todo);
  },
  containerSelector: ".todos__list",
});
//call section instance's renderItems() method
section.renderItems();

const addTodoPopup = new PopupWithForm("#add-todo-popup", (values) => {
  // All of the below logic of getting field values moved to private method in
  // PopupWithForm class

  // //evt.preventDefault();
  // const name = evt.target.name.value;
  // const dateInput = evt.target.date.value;

  // // Create a date object and adjust for timezone
  // const date = new Date(dateInput);
  // date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  // // Create new unique ID with UUID imported function
  // const id = uuidv4();

  // const values = { id, name, date };
  const todo = generateTodo(values);
  section.addItem(todo);
  addTodoPopup.close();
  newFormVal.resetValidation();
});
addTodoPopup.setEventListeners();

// These open/close functions below were moved/refactored into the Popup class
// const openModal = (modal) => {
//   modal.classList.add("popup_visible");
//   //callback function in this listener allows user to close "add todo" modal with Esc
//   window.addEventListener('keydown', escapeToClose);
// };

// const closeModal = (modal) => {
//   modal.classList.remove("popup_visible");
//   //removes listener upon closing modal to optimize performance
//   window.removeEventListener('keydown', escapeToClose);
// };

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

// This event listener adding was passed into the PopupWithForm instance above as a 
// callback function
// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const name = evt.target.name.value;
//   const dateInput = evt.target.date.value;

//   // Create a date object and adjust for timezone
//   const date = new Date(dateInput);
//   date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

//   // Create new unique ID with UUID imported function
//   const id = uuidv4();

//   const values = { id, name, date };
//   const todo = generateTodo(values);
//   todosList.append(todo);
//   addTodoPopup.close();
//   newFormVal.resetValidation();
// });

newFormVal.enableValidation();