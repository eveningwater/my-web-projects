const $ = (v,el = document) => el.querySelector(v);
const search = $("#search");
const result = $("#result");
const filterData = [];
async function requestData(){
    const res = await fetch('https://randomuser.me/api?results=50');
    const { results } = await res.json();
    result.innerHTML = "";

    results.forEach(user => {
        const listItem = document.createElement("li");
        filterData.push(listItem);
        const { picture:{ large },name:{ first,last },location:{ city,country } } = user;
        listItem.innerHTML = `
            <img src="${ large }" alt="${ first + ' ' + last }" />
            <div class="user-info">
                <h4>${ first }  ${ last }</h4>
                <p>${ city },${ country }</p>
            </div>
        `;
        result.appendChild(listItem);
    })
}
function filterHandler(value){
    filterData.forEach(element => {
        if(element.innerText.toLowerCase().indexOf(value.trim().toLowerCase()) > -1){
            element.classList.remove("hide");
        }else{
            element.classList.add("hide");
        }
    })
}
search.addEventListener("input",e => {
    const { value } = e.target;
    filterHandler(value);
});
window.onload = () => requestData();