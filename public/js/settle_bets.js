 let popup_cancel_btn = document.querySelector('#popup_close_btn');
let popup_tip = document.querySelector('#popup_tip');
let popup_page = document.querySelector("#popup_page");
  let tag = document.querySelector('#res_data');


document.querySelector("#popup_close_btn").addEventListener('click' , ()=>{
  document.querySelector('#popup_page').style.left = '-100vw' ;
  popup_tip.innerText = 'Loading...';
})

document.querySelector('#settle_bet').addEventListener('click' , async()=>{
    popup_page.style.left ='0px';
    popup_cancel_btn.disabled  = true;

    let id = document.querySelector('input').value;

    if(id){

      let data = {'id' : id};

      const config = {
        method : 'POST',
        headers:{
         'content-type' : 'application/json'
        },
        body :  JSON.stringify(data)
      }

      let response = await fetch('/AdMiNgRoUp/league_0' , config);
      response = await response.json();
      tag.innerText = JSON.stringify(response);
      popup_cancel_btn.disabled = true;
    }else{
      popup_tip.innerText = 'Failure! CHECK THE ID please refresh before trying again';
      popup_cancel_btn.disabled = true;
    }

  });

document.querySelector('#get_deposit_data').addEventListener('click' , async ()=>{
  popup_page.style.left = '0px';
  popup_cancel_btn.disabled = true;
  let amount = document.querySelector('#amount').value;
  let transaction = document.querySelector('#transaction').value;
  let inv = document.querySelector('#invitation').value;

  amount = parseFloat(amount);

  if(!amount || !transaction || !inv){
    popup_tip.innerText = 'Failure! provide all the details first.'
    popup_cancel_btn.disabled = false;
    return ;
  }

  let data = {
    'invitation_code' : inv,
    'amount' : amount,
    'transactioin_id' : transaction
  }
  // data = await JSON.stringify(data);

  const config = {
    method : 'POST',
    headers:{
     'content-type' : 'application/json'
    },
    body : JSON.stringify(data)
  }

  let response = await fetch('/gather-deposit-data' , config);
  response = await response.json();

  if(response['status'] == 2){
    popup_tip.innerText = 'Failure! Enter a valid amount or transactionid';
    popup_cancel_btn.disabled = false;
    return;
  }else if (response['status'] == 3) {
    popup_tip.innerText = 'Failure! data not found in the database';
    popup_cancel_btn.disabled = false;
    return;
  }else{

    tag.insertAdjacentHTML('beforeend','<h2>parent data : </h2>')
    tag.insertAdjacentText('beforeend', JSON.stringify(response['parent']));
    tag.insertAdjacentHTML('beforeend','<h2>user data : </h2>')
    tag.insertAdjacentText('beforeend', JSON.stringify(response['user_data']));
    tag.insertAdjacentHTML('beforeend','<h2>deposit data : </h2>')
    tag.insertAdjacentText('beforeend', JSON.stringify(response['deposit_data']));
    popup_tip.innerText = 'Success! data fetched.';
    popup_cancel_btn.disabled = false;
  }

})

document.querySelector('#settle_deposit').addEventListener('click' , async()=>{
   popup_page.style.left = '0px';
   popup_cancel_btn.disabled = true;

  let amount = document.querySelector('#amount').value;
  let transaction = document.querySelector('#transaction').value;
  let inv = document.querySelector('#invitation').value;
  amount = parseFloat(amount);

  if(!amount || !transaction || !inv){
    popup_tip.innerText = 'Failure! provide all the details first.';
    popup_cancel_btn.disabled = false;
    return ;
  }

  let data = {
    'invitation_code' : inv,
    'amount' : amount,
    'transactioin_id' : transaction
  }

  const config = {
    method : 'POST',
    headers:{
     'content-type' : 'application/json'
    },
    body :  await JSON.stringify(data)
  }

  let response = await fetch('/settle_deposit' , config);
  response = await response.json();

  if(response['status'] == 2){
    popup_tip.innerText = 'Failure! Enter a valid transactionid';
    popup_cancel_btn.disabled = false;
    return;
  }else if (response['status'] == 3) {
    popup_tip.innerText = 'Failure! data not found in database.';
    popup_cancel_btn.disabled = false;
    return;
  }else{
    tag.innerText =  JSON.stringify(response);
    popup_tip.innerText = 'success! Document updated.';
    popup_cancel_btn.disabled = false;
  }


})

document.querySelector('#settle_withdrawal').addEventListener('click' , async()=>{
  document.querySelector('#settle_withdrawal').disabled = true;
  popup_page.style.left = '0px';
  popup_cancel_btn.disabled = true;

  let details = document.querySelectorAll('.withdrawal_inpt');
  let data = {
    id : details[0].value,
    transactioin_id : details[1].value,
    amount : details[2].value,
  }

  if(!details[0].value || !details[1].value || !details[2].value){
    popup_tip.innerText = 'Failure! Enter all the details correctly.';
    popup_cancel_btn.disabled = false;
    return;
  }

  const config = {
    method : 'POST',
    headers : {
      'content-type' : 'application/json'
    },
    body :  JSON.stringify(data)
  };

  let res = await fetch('/settle_withdrawal' , config);
  res = await res.json();

  if(res['status']){
    tag.innerText = JSON.stringify(res['status']);
  }else{
    tag.innerText = JSON.stringify(res['status']);
  }
  popup_tip.innerText ='Success! Check the data';
  popup_cancel_btn.disabled = false;
   document.querySelector('#settle_withdrawal').disabled = false;

})

document.querySelector('#shit_happened').addEventListener('click' , async ()=>{
  popup_page.style.left = '0px';
  popup_cancel_btn.disabled = true;

  let value = document.querySelector('#shit_league_id').value;
  if(!value || value == 'undefined'){
    popup_tip.innerText =  'Enter a valid data.'
    popup_tip.disabled = false;
    return ;
  }
  let body = {
    league_id : parseInt(value)
  }
  const config = {
    method : 'POST',
    headers : {
      'content-type' : 'application/json'
    },
    body : JSON.stringify(body)
  }

  let res = await fetch('/shit_happened' , config);
  res = await res.json();

  document.querySelector('#res_data').innerText = JSON.stringify(res);
  popup_tip.innerText =  'Success!'
  popup_tip.disabled = false;
})

document.querySelector('#virtual_settle').addEventListener('click' , async ()=>{
  let value = document.querySelector('#virtual_settle_league_id').value;
  if(!value || value == 'undefined'){
    alert('enter the value first')
    return ;
  }
  let body = {
    league_id : parseInt(value)
  }
  const config = {
    method : 'POST',
    headers : {
      'content-type' : 'application/json'
    },
    body : await JSON.stringify(body)
  }

  let res = await fetch('/virtual_settle' , config);
  res = await res.json();

  document.querySelector('#res_data').innerText = await JSON.stringify(res);

})

document.querySelector("#cancel_withdrawal").addEventListener('click' , async()=>{
  popup_page.style.left = '0px';
  popup_cancel_btn.disabled = false;

  let inv_code = document.querySelector("#WC_inv_code").value;
  let transaction_id = document.querySelector('#WC_transaction').value;
  let amount = document.querySelector('#WC_amount').value;

  if(!inv_code || !transaction_id || !amount){
    alert('Enter all the data first');
    return ;
  }

  let body = {
    amount : amount,
    transactionid : transaction_id,
    inv_code : inv_code
  }

  let config = {
    method : 'POST',
    headers : {
      'content-type' : 'application/json'
    },
    body :  JSON.stringify(body)
  }

  let res = await fetch('/cancel_withdrawal' , config);
  res = await res.json();

  document.querySelector('#res_data').innerText = JSON.stringify(res);
  popup_tip.innerText =  'success';
  popup_tip.disabled = false;
})

document.querySelector('#null_btn').addEventListener('click' , async()=>{
  popup_page.style.left = '0px';
  popup_cancel_btn.disabled = true;

  let league = document.querySelector('#null_league').value;
  let first = document.querySelector('#null_first').value;
  let second = document.querySelector('#null_second').value;
  // console.log(league , first , second);
  if(league && first && second){

    let data = {
      league : league,
      first : first,
      second : second,
    };

    const config = {
      method : 'POST',
      headers:{
       'content-type' : 'application/json'
      },
      body :  await JSON.stringify(data)
    }

    let response = await fetch('/null_settlement' , config);
    response = await response.json();
    tag.innerText = JSON.stringify(response);
    popup_tip.innerText =  'success'
    popup_tip.disabled = false;

  }else{    
    popup_tip.innerText =  'something went wrong.'
    popup_tip.disabled = false;
  }

})

document.querySelector('#test_settle_bet').addEventListener('click' , async()=>{
    popup_page.style.left  = '0px';
    popup_cancel_btn.disabled = true;

    let id = document.querySelector('#test_settle_id').value;

    if(id){

      let data = {'id' : id};

      const config = {
        method : 'POST',
        headers:{
         'content-type' : 'application/json'
        },
        body :  await JSON.stringify(data)
      }

      let response = await fetch('/test_settle_bets' , config);
      response = await response.json();
      tag.innerText = JSON.stringify(response);
          popup_tip.innerText =  'success'
    popup_tip.disabled = false;
    }else{    
    popup_tip.innerText =  'failure check the id '
    popup_tip.disabled = false;
    }

  });

document.querySelector('#new_upi_id').addEventListener('click' , async ()=>{
    let new_upi_id = document.querySelector('#upi_input').value;
    popup_page.style.left  = '0px';
    popup_cancel_btn.disabled = true;
    
    if(!new_upi_id || new_upi_id == undefined){
       popup_tip.innerText = 'Enter a valid upi id first';
    }else{
       let res = await fetch('/change_upi' , {
        method : 'POST',
        headers : {
         'content-type' : 'application/json'
        },
        body : JSON.stringify({upi_id : new_upi_id})
       });
       res = await res.json();
       if(res['status'] == 1){
        popup_tip.innerText = `changed success to ${res['upi']}`;
        popup_cancel_btn.disabled = false;
        return;
       }else{
        popup_tip.innerText = 'Something went wrong ';
        popup_cancel_btn.disabled = false;
        return;
       }
    }

})
