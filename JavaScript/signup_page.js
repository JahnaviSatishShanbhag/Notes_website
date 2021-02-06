function checkName() {
    var name = document.getElementById("username");
    var naRegx = /^([a-z A-Z]+){5,40}$/;
    if (name.value.trim() == "") {
        document.getElementById("lb1").style.display = "inline";
        name.style.border = "2px solid red";
        return false;
    }
    else if (naRegx.test(name.value.trim())) {
        name.style.border = "1px solid #e1e1e1";
        document.getElementById("lb1").style.display = "none";
        return true;
    }
    else {
        document.getElementById("lb1").style.display = "inline";
        name.style.border = "2px solid red";
        return false;
    }
}

function checkEmail() { 
    var email = document.getElementById("email");
    var emRegx = /^([a-z 0-9/.-]+)@([a-z 0-9-]+).([a-z]{2,8})(.[a-z]{2,8})$/;
    if (email.value.trim() == "") {
        email.style.border = "2px solid red";
        document.getElementById("lb2").style.display = "inline";
        return false;
    }
    else if (emRegx.test(email.value.trim())) {
        email.style.border = "1px solid #e1e1e1";
        document.getElementById("lb2").style.display = "none";
        return true;
    }
    else {
        email.style.border = "2px solid red";
        document.getElementById("lb2").style.display = "inline";
        return false;
    }
}

function checkPassword() { 
    var password = document.getElementById("password");
    var paRegx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    if (password.value.trim() == "") {
        password.style.border = "2px solid red";
        document.getElementById("lb3").style.display = "inline";
        return false;
    }
    else if (paRegx.test(password.value.trim())) {
        password.style.border = "1px solid #e1e1e1";
        document.getElementById("lb3").style.display = "none";
        return true;
    }
    else {
        password.style.border = "2px solid red";
        document.getElementById("lb3").style.display = "inline";
        return false;
    }
}

function checkAll()
{
    var username=checkName();
    var email=checkEmail();
    var password=checkPassword();
    if (username==true && email==true && password==true)
    {
        location.href="login_page.html";
    }
}
