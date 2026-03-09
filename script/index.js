function login(){

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if(username === "admin" && password === "admin123"){
        window.location.href = "home.html";
    }
    
    else if(username === "" || password === ""){
    alert("Please fill in all fields");
}
    else{
        alert("Please enter the correct username or password");
    }

}