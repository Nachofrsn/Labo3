const API_URL = "https://api.github.com/users/";

const $main = document.querySelector("#main");
const $form = document.querySelector("#form");
const $search = document.querySelector("#search");

async function getUser(userName) {
  try {
    const response = await fetch(API_URL + userName);
  
    if (response.status === 404) {
      createErrorCard("No profile with this userName");
      return;
    } 
  
    if (response.ok){
      const data = await response.json();
      createUserCard(data);
      getRepos(userName);
    }
  }
  catch (error) {
    createErrorCard("Problem fetching userName");
  }
}

async function getRepos(userName) {
  try {
    const response = await fetch(`${API_URL + userName}/repos?sort=created`);
    const data = await response.json();
    addReposToCard(data)
  }
  catch (e) {
    createErrorCard("Problem fetching repos");
  }
}

function createErrorCard(msg) {
  const cardHTML = `
    <div class="card">
      <h1>${msg}</h1> 
    </div>
  `;

  $main.innerHTML = cardHTML;
}

function createUserCard(user) {
  const userID = user.name || user.login;
  //logicos -> false, falsy, true, truthy
  //null o undefined 

  //nullish coalescing ?? 

  const userBio = user.bio ? `<p>${user.bio}</p>` : "";
  const cardHTML = `
  <div class="card">
  <section>
    <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
  </section>
  <section class="user-info">
    <h2>${userID}</h2>
    ${userBio}
    <ul>
      <li>${user.followers}<strong>Followers</strong></li>
      <li>${user.following}<strong>Following</strong></li>
      <li>${user.public_repos}<strong>Repos</strong></li>
    </ul>
    <div id="repos"></div>
  </section>
</div>
  `;

  $main.innerHTML = cardHTML;
}
function addReposToCard(repos) {
  const $repos = document.querySelector("#repos");

  repos.slice(0, 5).forEach(repo => {
    const $repo = document.createElement("a");
    $repo.classList.add("repo");
    $repo.href = repo.html_url;
    $repo.target = "_blank";
    $repo.innerText = repo.name;
    
    $repos.appendChild($repo);
  });
}

$form.addEventListener("submit", (event) => {
  event.preventDefault();

  const user = $search.value;

  if (user) {
    getUser(user);

    $search.value = "";
  }
})

