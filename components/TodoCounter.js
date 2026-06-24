class TodoCounter {
  // todos should be the array of initial todos
  // selector is the selector for the counter text element
  constructor(todos, selector) {
    this._element = document.querySelector(selector);

    this._completedTodos = todos.filter(todo => todo.completed);
    this._completed = this._completedTodos.length;// number of completed todos

    this._total = 0;// the total number of todos -- initial number incremented upon
                    // calling of generateTodo() in index.js    
                    
    this._updateText();
  }
  
  // Call this when a checkbox is clicked, and when a completed
  // to-do is deleted.
    updateCompleted = (increment) => {
    // if increment is true, add 1 to this._completed. Otherwise,  
    // subtract 1.
    increment ? this._completed ++ : this._completed --;
    this._updateText();
  };

  // Call this when a to-do is deleted, or when a to-do is   
  // created via the form. 
  updateTotal = (increment) => {
    // if increment is true, add 1 to this._total. Otherwise, 
    // subtract 1.
    increment ? this._total ++ : this._total --;
    this._updateText();
  };

  // Call the method to update the text content
  _updateText() {
    // Sets the text content of corresponding text element.  
    // Call this in the constructor, and whenever the counts get updated.
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;