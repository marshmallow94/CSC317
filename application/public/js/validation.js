
var b1 = false, b2 = false,b3 = false,b4= false,b5= false,b6=false,b7 = false;

document.getElementById('username').addEventListener('input', 
function(ev){
    let usernameElem = ev.target;
    let username = usernameElem.value;

    let a = document.getElementById("alpha");
    let n = document.getElementById("alphanum");



    if (/^[a-z]+$/i.test(username.charAt(0))){
        a.style.color = 'darkgreen';
        b1 = true;
    } else {
        a.style.color = 'darkred';
    }
    console.log(b1);

    function numOfAlpha_UserName(user_name){
        if(user_name.length < 2){
            return false;
        }
        let count = 0;
        for(let i = 0; i < user_name.length; i++){
            if(/^[a-z0-9]+$/i.test(user_name.charAt(i))){
                ++count;
                if(count > 2){
                    return true;
                }
            }
        }
        return false;
    }

    if(numOfAlpha_UserName(username)){
        n.style.color = 'darkgreen';
        b2 = true;
    }else{
        n.classList("invalid-text");
        n.style.color = 'darkred';
    }

})

document.getElementById('Password').addEventListener('input',
function(ev){
    let passElem = ev.target;
    let password = passElem.value;

    let l = document.getElementById("len");
    let u = document.getElementById("upper");
    let n = document.getElementById("num");
    let s = document.getElementById("special");

    
    if (password.length > 8){
        l.style.color = 'darkgreen';
        b3 = true;
    } else {
        l.style.color = 'darkred';
    }
    
    function containsUpper(password) {
        for(let i = 0; i < password.length; i++){
            const c = password.charAt(i);
            if(c.toUpperCase() === c){
                return true;
            }
        }
        return false;
    }

    if (containsUpper(password)){
        u.style.color = 'darkgreen';
        b4 = true;
    } else {
        u.style.color = 'darkred';
    }
    
    function containsNum(password){
        for(let i = 0; i < password.length; i++){
            const c = password.charAt(i);
            if(/^[0-9]+$/.test(c)){
                return true;
            }
        }
        return false;
    }

    if (containsNum(password)){
        n.style.color = 'darkgreen';
        b5 = true;
    } else {
        n.style.color = 'darkred';
    }
    
    function containsSpecialChar(password){
        for(let i = 0; i < password.length; i++){
            const c = password.charAt(i);
            if(/^[\/\*\-+!@#\$\^\&~\[\]]+$/.test(c)){
                return true;
            }
        }
        return false;
    }
    
    if (containsSpecialChar(password)){
        s.style.color = 'darkgreen';
        b6 = true;
    } else {
        s.style.color = 'darkred';
    }

})

document.getElementById('Confirm_Password').addEventListener('input',
function(ev){
    let p = ev.target.value;
    let m = document.getElementById("match");
    let original = document.getElementById("Password");

    if(original.value === p){
        m.style.color = 'darkgreen';
        b7 = true;
    } else {
        m.style.color = 'darkred';
    }
    
})

function validateForm(){
    submittable = b1 && b2 && b3 && b4 && b5 && b6 && b7;
    if (!submittable){
        alert("invalid form, please try again");
        window.location.reload();
    } else {
        alert("You have successfully created an account!");
    }
}

