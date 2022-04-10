// select elements 
const theTemplete = document.querySelector("template"),
      usersWrapper = document.querySelector(".users"),
      inputSearch = document.querySelector("#search-input");


      
// array to put names, emails and user div
// to find the text that user write
let usersArr = [];



// Find similar words and hide the ones that are not
inputSearch.addEventListener("input", function(e){
    const value = e.target.value;
    usersArr.forEach(user => {
        if(user.name.includes(value) || user.email.includes(value)){
            user.element.classList.remove("hide");
        }else{
            user.element.classList.add("hide");
        }
    });
});




// bring names & emails from placeholder JSON
fetch("https://jsonplaceholder.typicode.com/users")
.then(res => {
    return res.json();
})

.then(users => {
    /*
    1 - make a copy of user div
    2 - bring name and email from user div
    3 - put name and email inside the user div
    4 - append the div user to the wrapper show it
    5 - return the name, email and the user div in an array
    */
    usersArr =  users.map(user => {
        const cloneUser = theTemplete.content.cloneNode(true).children[0];
        const userName = cloneUser.querySelector(".name");
        const userEmail = cloneUser.querySelector(".email");
        userName.innerText = user["name"];
        userEmail.innerText = user["email"];
        usersWrapper.appendChild(cloneUser);
        return {"name": user["name"], "email": user["email"], element: cloneUser};
    });
});