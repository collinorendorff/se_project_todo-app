import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

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
  //Date conversion
  const date = new Date(values["date"]);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  values["date"] = date;

  // Create new unique ID with UUID imported function
  const id = uuidv4();
  values["id"] = id;
  const todo = generateTodo(values);
  todoCounter.updateTotal(true);
  section.addItem(todo);
  addTodoPopup.close();
  newFormVal.resetValidation();
});
addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

newFormVal.enableValidation();
