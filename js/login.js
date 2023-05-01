/* variables */

let logIn = document.getElementById("login-btn");
let loginForm = document.querySelector(".login-form");

logIn.addEventListener("click", (e) => {
    e.preventDefault();


    let emailId = document.getElementById('email').value;
    let userPwd = document.getElementById('password').value;
    const userData = JSON.parse(localStorage.getItem('userData')) || [];
  


let keyProp = Object.keys(userData);

let propertyValue = Object.values(userData);

let email, passwd;
let found = "n";

for(let i = 0; i < keyProp.length; i++){ 
        email = propertyValue[i].userEmail;
        passwd = propertyValue[i].password;
        console.log(email);
        console.log(passwd);
        
        if( passwd === userPwd && email === emailId) {
            window.open("./index.html", target="_self");
            found = "y";
            break;
        } 
}
if(found === "n"){
        alert("Invalid Login Credentials!");
}
loginForm.reset();

});

