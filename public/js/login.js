
var loginBtn = document.querySelector('.login-btn')

loginBtn.addEventListener('click', ()=>{
    
    const username = document.getElementById("usernametxt").value
    const password = document.getElementById("passwordtxt").value
    
    if(username && password){
        var loginEmail = username + '@gmail.com'
        auth.signInWithEmailAndPassword(loginEmail, password)
        .then((userCredential)=>{
            console.log('login success')
        })
        .catch((err)=>{
            console.log(err.message)
            if(err.message == `{"error":{"code":400,"message":"INVALID_LOGIN_CREDENTIALS","errors":[{"message":"INVALID_LOGIN_CREDENTIALS","domain":"global","reason":"invalid"}]}}`){
                alert('Enter valid admin panel username and password')
            }
        })
    }
    else{
        alert('Enter username and password')
    }
    
    
    
})


auth.onAuthStateChanged((user)=>{
    if(user){
        location.replace('/dashboard')
    }else{
        document.querySelector('.login-container').style.display = "block"
    }
})