var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');
var baseURL = location.pathname.split('/').slice(0, -1).join('/');
console.log(baseURL);

var username = localStorage.getItem('clientUsername');
if (username) {
    document.getElementById('username').innerText = "Welcome " + username;
}

var signUpList = JSON.parse(localStorage.getItem('users')) || [];

function isEmpty() {
    return signupName.value && signupEmail.value && signupPassword.value;
}

function isEmailExist() {
    return signUpList.some(user => user.email.toLowerCase() === signupEmail.value.toLowerCase());
}

function signUp() {
    if (!isEmpty()) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return false;
    }
    
    if (isEmailExist()) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">Email already exists</span>';
        return false;
    }
    
    var newUser = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    };
    
    signUpList.push(newUser);
    localStorage.setItem('users', JSON.stringify(signUpList));
    document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>';
    return true;
}

function loginNull() {
    return signinEmail.value && signinPassword.value;
}

function login() {
    if (!loginNull()) {
        document.getElementById('incorrect').innerHTML = '<span class="text-warning m-3">Enter all requirements</span>';
        return false;
    }

    var email = signinEmail.value.toLowerCase();
    var password = signinPassword.value.toLowerCase();

    var user = signUpList.find(user => user.email.toLowerCase() === email && user.password.toLowerCase() === password);

    if (user) {
        localStorage.setItem('clientUsername', user.name);
        location.replace(baseURL + '/home.html');
    } else {
        document.getElementById('incorrect').innerHTML = '<span class="p-2 text-warning">Incorrect Email or Password</span>';
    }
}

function logout() {
    localStorage.removeItem('clientUsername');
}
