const $results = document.querySelector("#result");
const $filter = document.querySelector("#filter");

const listItems = [];

getData().catch(() => {
    $results.innerHTML = '<h3>Something went wrong!</h3>';
});

$filter.addEventListener("input", ({target}) => filterData(target.value));

async function getData() {
    const res = await fetch("https://jsonplaceholder.org/users"); // resuelve la promesa 
    if (!res.ok) {
        console.error("Something went wrong!");
    }

    const results = await res.json();

    $results.innerHTML = "";

    results?.forEach((user) => {
        const li = document.createElement("li");
        listItems.push(li);

        li.innerHTML = `
        <div class = "user-info"> 
            <h4>${user?.firstname} ${user?.lastname}</h4>
            <p>${user?.address?.street}, ${user?.address?.suite}</p>
        </div>
        `;

        $results.appendChild(li);
    });
}

//async / await

function filterData(search) {
    listItems.forEach((item) => {
        if(item.innerText.toLowerCase().includes(search.toLowerCase())){
            item.classList.remove("hide");
        }
        else {
            item.classList.add("hide");
        }
    });
}