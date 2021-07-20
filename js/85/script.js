// https://github.com//eveningwater/my-web-projects
const githubAPI = 'https://api.github.com/users/';
const $ = v => document.querySelector(v);
const main = $("#main");
const search = $("#search");
async function getUsers(username){
    try {
        const res = await fetch(githubAPI + username);
        const data = await res.json();
        if(!data.id)return createErrorCard("查无此用户");
        createUserCard(data);
        getRepoList(username);
    } catch (error) {
        if(error.response.status == 404){
            createErrorCard("查无此用户");
        }
    }
}
async function getRepoList(username){
    try {
        const { data } = await axios(githubAPI + username + '/repos?sort=created');
        addRepoList(data);
    } catch (error) {
        if(error.response.status == 404){
            createErrorCard("查找仓库出错!");
        }
    }
}
function createUserCard(user){
    const cardHTML = `
    <div class="card">
        <div>
          <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
        </div>
        <div class="user-info">
          <h2>${user.name}</h2>
          <p>${user.bio}</p>
          <ul>
            <li>${user.followers} <strong>Followers</strong></li>
            <li>${user.following} <strong>Following</strong></li>
            <li>${user.public_repos} <strong>Repos</strong></li>
          </ul>
          <div id="repo-container"></div>
        </div>
     </div>
    `;
    main.innerHTML = cardHTML;
}
function createErrorCard(msg){
    const cardHTML = `
        <div class="card error-card">
            <p>${ msg }</p>
        </div>
    `;
    main.innerHTML = cardHTML;
}
function addRepoList(repoList){
    const repoContainer = $("#repo-container");
    repoList.slice(0,5).forEach(repo => {
        const a = document.createElement("a");
        a.classList.add("repo");
        a.href = repo.html_url;
        a.target = '_blank';
        a.textContent = repo.name;
        repoContainer.appendChild(a);
    });
}
window.onload = () => {
    search.addEventListener("keydown",e => {
        if(e.keyCode === 13){
            getUsers(e.target.value.trim());
            setTimeout(() => {
                e.target.value = "";
            })
        }
    })
}