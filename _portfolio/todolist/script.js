class Todos {
  constructor(STORAGE_KEY) {
    this.STORAGE_KEY = STORAGE_KEY
    this.list = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  }

  add(text, isCompleted = false) {
    if (text === "") return
    const id = Date.now().toString()
    this.list[id] = { text, isCompleted }
    this.updateLocalStorage()
  }

  toggleChecked(id) {
    this.list[id].isCompleted = !this.list[id].isCompleted
    this.updateLocalStorage()
  }

  remove(id) {
    delete this.list[id]
    this.updateLocalStorage()
  }

  updateLocalStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.list))
  }
}

const form = document.querySelector("#new-todo-form")
const todoList = document.querySelector("#todo-list")
const doneList = document.querySelector("#done-list")
const input = document.querySelector("#todo-input")
const template = document.querySelector("template")
const toggleBtn = document.querySelector(".toggle-btn")
const filterBtn = toggleBtn.closest(".filter-btn")
const STORAGE_KEY_PREFIX = "TODO_LIST_WITH_LOCAL_STORAGE"
const STORAGE_KEY = `${STORAGE_KEY_PREFIX}-todoList`
const todos = new Todos(STORAGE_KEY)

renderTodos()
today()

form.onsubmit = event => {
  todos.add(input.value)
  renderTodos()

  event.preventDefault()
  input.value = ""
}

// Render all stored items to either todo-list or done-list
// based on their isComplete status
function renderTodos() {
  todoList.innerHTML = ""
  doneList.innerHTML = ""
  for (const [id, { text, isCompleted }] of Object.entries(todos.list)) {
    const todo = createTodoItem(id, text, isCompleted)
    if (isCompleted) {
      doneList.prepend(todo)
    } else {
      todoList.prepend(todo)
    }
  }
}

// Create the HTML for a new item using the template
function createTodoItem(id, text, isCompleted = false) {
  const clone = template.content.cloneNode(true)
  const listItem = clone.querySelector(".list-item")
  const todoText = listItem.querySelector("[data-list-item-text]")
  const checkbox = listItem.querySelector("[data-list-item-checkbox]")
  const delBtn = listItem.querySelector(".remove")
  listItem.dataset.id = id
  todoText.textContent = text
  delBtn.onclick = deleteTodo
  checkbox.onchange = toggleComplete
  checkbox.checked = isCompleted
  return listItem
}

// Update the storage when item is completed or uncompleted,
// so item is moved to appropriate list and styled differently.
function toggleComplete(event) {
  const todoItem = event.target.closest(".list-item")
  const id = todoItem.dataset.id

  todos.toggleChecked(id)
  todoItem.remove()

  if (todos.list[id].isCompleted) {
    doneList.prepend(todoItem)
  } else {
    todoList.prepend(todoItem)
  }
}

// Delete item from the dataset and remove from list
function deleteTodo(event) {
  const todoItem = event.target.closest(".list-item")
  todos.remove(todoItem.dataset.id)
  todoItem.remove()
}

function today() {
  const dateInput = document.querySelector("#date-input")
  let today = new Date()
  let date = today.getDate().toString().padStart(2, 0)
  let month = (today.getMonth() + 1).toString().padStart(2, 0)
  let year = today.getFullYear().toString()

  today = `${year}-${month}-${date}`
  dateInput.value = today
  return today
}

toggleBtn.addEventListener("click", () => {
  filterBtn.classList.toggle("open")
})

const sortASC = () => {
  todos.sortTodoList(false)
  renderTodos()
}

window.sortASC = sortASC

const sortDES = () => {
  todos.sortTodoList(true)
  renderTodos()
}

window.sortDES = sortDES
