const $form = document.querySelector("#form");
const $input = document.querySelector("#input");
const $ul = document.querySelector("#todos");

const todos = JSON.parse(localStorage.getItem("todos"));

if(todos){
    todos.forEach((todos) => addTodo(todos));
}

$form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();
});

function addTodo() {
    let todoText = $input.value;

    if(todos) {
        todoText = todos.Text;
    }

    if (todoText) {
        const $li = document.createElement("li");
        if(todos && todos.completed){
            $li.classList.add("completed");
        }
        $li.innerText = todoText;

        $li.addEventListener("click", () =>{
            $li.classList.toggle("completed");
            updateLocalStorage();
        });

        $li.addEventListener("contextmenu", (e) =>{
            e.preventDefault();

            $li.remove();
            updateLocalStorage();
        });

        $ul.appendChild($li);

        $input.value = "";

        updateLocalStorage();
    }
}

function updateLocalStorage() {
    const $todosel = document.querySelectorAll("li");
    const todos = [];
    $todosel.forEach(($todosel) => {
        todos.push({
            Text: $todosel.innerText,
            completed: $todosel.classList.contains("completed"), 
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}