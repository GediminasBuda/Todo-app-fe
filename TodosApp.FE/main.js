// variables
var todoForm = document.getElementById("todo-form");
var todoList = document.getElementById("todos");
var doneList = document.getElementById("dones");
var titleInput = document.getElementById("todo-input");
var description = document.getElementById('descrip-input');
var difficulty = document.getElementById('diffic-input');
var editInput = document.getElementById('edit-input');

const editTitle = document.getElementById('edit-input');
const editDescription = document.getElementById('edit-description');
let currentId;

window.onload = async () => {
  const todos = await getTodos();

  todos.forEach(todo => {
    var todoItem = `
    <div class="border border-1 shadow-sm p-3 mb-3 rounded todo-item" data-id=${todo.id}>
        <h5 id="todoItem-title" class="text-center mb-2 input-name" style="box-shadow: 0px 10px 13px -7px #000000, -20px 18px 15px 0px rgba(0, 0, 0, 0);">${todo.title}</h5>
        <br>
        <p id="todoItem-description" class="mb-3 input-name" style="color: white; background-color: rgb(66, 75, 60);">${todo.description}</p>
        <p class="mb-3 input-name" style="border: solid 0.5px black; ">Difficulty: ${todo.difficulty}</p>
        <button type="button" class="btn btn-danger delete">Delete</button>
        <button type="button" class="btn btn-success move-todo" >${!todo.isDone ? "Move to Done": "Move Back"}</button>
        <button type="button" class="btn btn-warning edit" data-bs-toggle="modal"
            data-bs-target="#edit-modal">Edit</button>
    </div>
    `;
    if (todo.isDone) {
      doneList.innerHTML += todoItem;
      return;
    } 
      todoList.innerHTML += todoItem;
  })
};

todoForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  if (titleInput.value.length > 0 ) {
    titleInput.classList.remove("is-invalid");
    var todoItem = {
            title: titleInput.value,  
            description: description.value,
            difficulty: difficulty.value,
    }
    var response = await createTodo(todoItem);
    location.reload();
  } else {
    titleInput.classList.add("is-invalid");
  }
});

// Todo item card actions
document.addEventListener("click", async function (e) {

  if (e.target.matches(".delete")) {
    currentId = e.target.closest(".todo-item").getAttribute("data-id");
    await deleteTodo(currentId);
    location.reload();
    return;
  }
  if (e.target.matches(".edit")) {
    const todoItem = e.target.closest(".todo-item");// gali buti ir var, ir const, gera praktika const
    const title = todoItem.querySelector("#todoItem-title").innerText;
    const description = todoItem.querySelector("#todoItem-description").innerText;
    currentId = todoItem.getAttribute("data-id");

    editTitle.value = title;
    editDescription.value = description;
  }
    if (e.target.matches("#edit-submit")) {

      const updateTodo = {
        id: currentId,
        title: editTitle.value,
        description: editDescription.value,
      };
    await editTodo(updateTodo);
    location.reload();
  }
  if (e.target.matches(".move-todo")) {
    var todoItem = e.target.closest(".todo-item");
    var id = todoItem.attributes['data-id'].value;
    await changeStatusTodo(id);
    location.reload();
  }
});
