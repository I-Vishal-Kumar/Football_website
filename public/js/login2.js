 let popup_cancel_btn = document.querySelector('#popup_close_btn');
let popup_tip = document.querySelector('#popup_tip');
let popup_page = document.querySelector("#popup_page");
 
 const loginText = document.querySelector(".title-text .login");
      const loginForm = document.querySelector("form.login");
      const loginBtn = document.querySelector("label.login");
      const signupBtn = document.querySelector("label.signup");
      const signupLink = document.querySelector("form .signup-link a");
      signupBtn.onclick = (()=>{
        loginForm.style.marginLeft = "-50%";
        loginText.style.marginLeft = "-50%";
      });
      loginBtn.onclick = (()=>{
        loginForm.style.marginLeft = "0%";
        loginText.style.marginLeft = "0%";
      });
      signupLink.onclick = (()=>{
        signupBtn.click();
        return false;
      });


      
document.querySelector('#login_btn').addEventListener('click' , async function(e){

  e.preventDefault();
  
  popup_page.style.left = '0px';
  popup_cancel_btn.disabled = true;

  let l_name = document.querySelector('input[name = "l-name"]');
  let l_password = document.querySelector('input[name = "l-pass"]');

  if(!l_name.value || !l_password.value){
    popup_tip.innerText = 'Invalid credentials.'
    popup_cancel_btn.disabled = false;
    return;
  }

  l_name = l_name.value;
  l_password = l_password.value;

  const data = {
    name : l_name,
    pass : l_password
  }
  const config = {
    method : 'POST',
    headers:{
      'content-type' : 'application/json'
    },
    body : JSON.stringify(data)
  }

  let res = await fetch('./login' , config);
  let res_data = await res.json();
 
  if(res_data['status'] == 1){
    popup_tip.innerText = 'Success! Logged in.';
    window.location.href = window.location.origin + '/home';
    popup_cancel_btn.disabled = false;
  }else{
    popup_tip.innerText = 'Failure! something went wrong , please try again.'
    popup_cancel_btn.disabled = false;
  }
})

document.querySelector('#signup_btn').addEventListener('click' , async function(e){

  e.preventDefault();
  popup_cancel_btn.disabled = true;
  popup_page.style.left = '0vw';

  let values = document.querySelectorAll('.sign-input')
  let name = values[0].value;
  let s_pass = values[1].value;
  let s_pass_match = values[2].value;
  let s_inv_code = values[3].value;
  let s_contact = document.querySelector('#contact_num').value;
  let s_otp = values[5].value;

  s_inv_code = (s_inv_code === '')? 0 : s_inv_code;
  
  if(s_pass.localeCompare(s_pass_match) !== 0 || !name){
    values[2].lastElementChild.value = '';
    popup_tip.innerText = 'password not matched';
      popup_close_btn.disabled = false;    return;
  }else if(s_contact.length !== 10){
    popup_close_btn.disabled = false;
    popup_tip.innerText = 'Enter a 10 digit number';
    values[4].value = '';
    return;
  }else if(s_otp == 0 || s_otp === undefined ){
    popup_tip.innerText = 'Enter an valid OTP';
    popup_close_btn.disabled = false;
    return;
  }else{
   name = name.trim();
  const data = {
    name,
    password : s_pass,
    invitation_code : s_inv_code,
    contact : s_contact,
    otp : s_otp
  }

  const config = {
    method : 'POST',
    headers : {
      'content-type' : 'application/json'
    },
    body :  JSON.stringify(data)
  }

  let res = await fetch('./signup' , config);
  let res_data = await res.json();


  if(res_data){

    if(res_data.status === 404){ //name already exits
      popup_tip.innerText = 'Failure! This user name already exists.';
      popup_close_btn.disabled = false;

    }else if (res_data.status === 101) {  
      //phone number already exits
       popup_tip.innerText = 'Failure! contact already exists.';
      popup_close_btn.disabled = false;

    }else if(res_data.status === 0){ //someting went wrong
      window.location.reload();
    }else if(res_data.status === 1){ //user created
      window.location.href = window.location.origin + '/home';
    }else{
      popup_tip.innerText = res_data['status'];
      popup_close_btn.disabled = false;
    }
  }

  return;

 }
})

function disable_btns(){
  setTimeout(()=>{
    document.querySelector('#contact_num').disabled = false;
    document.querySelector('#otp_btn').disabled = false;
    document.querySelector('#otp_btn').style.background = '-webkit-linear-gradient(right, #003366, #004080, #0059b3, #0073e6)';
  }, 30*1000)
}

document.querySelector('#otp_btn').addEventListener('click' , async ()=>{

  document.querySelector('#otp_btn').disabled = true;
  popup_cancel_btn.disabled = true;
  popup_page.style.left = '0vw';
  
  let contact = document.querySelector('#contact_num').value;
   document.querySelector('#contact_num').disabled = true;

  if(!contact || contact === undefined){
    document.querySelector('#contact_num').style.border  = '1px solid red';
    return;
  }else{
     let config = {
      method : "POST",
      headers : {
        'content-type' : 'application/json'
      },
      body : JSON.stringify({contact})
     }
     let response = await fetch('/get_otp' , config);
     response = await response.json();
     if(response['status'] == 1){
      popup_tip.innerText = 'Success! otp sent wait 30sec to send again.';
      popup_close_btn.disabled = false;
       document.querySelector('#otp_btn').style.background = 'grey';
     }else if(response['status'] === 2){
      popup_tip.innerText = 'wait 30 sec before trying again.';
      popup_close_btn.disabled = false;
      document.querySelector('#otp_btn').style.background = 'grey';
     }else{
       popup_tip.innerText = 'Failure! something went wrong try again after 30sec.';
       popup_close_btn.disabled = false;
       document.querySelector('#otp_btn').style.background = 'grey';
     }

    disable_btns();

  }

})

document.querySelector("#popup_close_btn").addEventListener('click' , ()=>{
  document.querySelector('#popup_page').style.left = '-100vw' ;
  popup_tip.innerText = 'Loading...';
})

window.addEventListener('DOMContentLoaded' , ()=>{
  if(window.location.href.search('id') !== -1 ){
    document.querySelector('input[name = "inv-code"]').disabled = true;
    signupBtn.click();
  }
})
