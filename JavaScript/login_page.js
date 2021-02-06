const users_data = [];

window.onload = function () {
    fetch('http://localhost:5500/getData')
        .then((response) => response.json())
        .then((data) => {
            data.forEach((user) => {
                users_data.push({ name: user.name, email: user.email, password: user.password });
            });
        });
}

function checkDetails()
{
    let username=document.getElementById('username').value;
    let password=document.getElementById('password').value;
    let userExist=false;
    users_data.forEach((user)=>
    {
        if (username==user.name && password==user.password)
        {
            userExist=true;
        }
    });
    if (userExist==true)
    {
        location.href="signup_page.html";
    }
    else
    {
        document.getElementById('lb3').style.display='inline';
    }
}