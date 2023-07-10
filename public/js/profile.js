function select(tag){
    return document.querySelector(`${tag}`);
  }
  function selectAll(tag){
    return document.querySelectorAll(`${tag}`);
  }
  
//   ----------------------- calling the current page---------------
window.addEventListener('load' , ()=>{
    let profile_page = document.querySelector('#profile_page');
    load_main_pages(profile_page);
    let scale_object = select('.scale_object');
    scale_object.style.animation = 'scale 3s forwards ease-in-out';
    setTimeout(()=>{
    let elem = select('#loading');
    elem.remove();
    } , 3000)

})


  let popup_cancel_btn = select('#popup_close_btn');
  let popup_tip = select('#popup_tip');
  let popup_page = select("#popup_page");
  
  // ------------------popup page ------------
  
  select("#popup_close_btn").addEventListener('click' , ()=>{
    select('#popup_page').style.left = '-100vw' ;
    popup_tip.innerText = 'Loading...';
  })
  
  // ------------------popup page done--------
  
  // logout btn
  
  select('#logout').addEventListener('click' , async ()=>{
    let config = {
       method : 'GET',
       headers : {
         'content-type' : 'application/json'
       }
     }
    fetch('/logout' , config);
    window.location.href = window.location.origin + '/login';
  })
  
  // setting profits
  
  // am profit percents 
  
  
  let back_btn = selectAll('.back_btn');
  
  back_btn.forEach((item, i) => {
  
    item.addEventListener('click' , ()=>{
      select('#home_page').style.overflowY = 'scroll';
      item.parentElement.style.left = '-100vw';
    })
  
  });
  
  selectAll('.cancel').forEach((item, i) => {
    item.addEventListener('click' , ()=>{
      select('#home_page').style.overflowY = 'scroll';
      item.parentElement.parentElement.parentElement.style.left = '-100vw';
    })
  });
  
  
  // linking all the front end of profile pages
  
  selectAll('.profile_popup_btns').forEach((item, i) => {
    item.addEventListener('click' , ()=>{
      if(i !== 4){
        selectAll('.profile_pops')[i].style.left = '0vw';
      }else{
        window.open('https://t.me/CustomerService_96', '_blank');
      }
    })
  });
  
  selectAll('.info_change_btns').forEach((item, i) => {
    item.addEventListener('click' , ()=>{
      selectAll('.info_inner_popups')[i].style.left =  '0vw';
    })
  });
  
  select('.account_btns').addEventListener('click' , ()=>{
    select('.account_inner_popups').style.left = '0vw';
  })
  
  selectAll('#upi_amm_choose > span').forEach((item, i) => {
    item.addEventListener('click' , ()=>{
      select('#deposit_inpt').value = parseInt(item.innerText);
    })
  });
  
  select('#deposit_btn').addEventListener('click' , ()=>{
    select('#deposit_page').style.left = '0vw';
  })
  select('#withdraw_btn').addEventListener('click' , ()=>{
    select('#withdrawal_page').style.left = '0vw';
  })
  
  // vip page linking;
  select('.profile_vip').addEventListener('click' , ()=>{
    select('#vip_page').style.left  = "0vw";
  })
  
  
  // usdt page;
  select('#usdt_btn').addEventListener('click' , ()=>{
    select('#usdt_page').style.left = '0vw';
  })
  
  selectAll('#usdt_amm_choose > span').forEach((item, i) => {
    item.addEventListener('click' , ()=>{
      select('#usdt__inpt').value = parseInt(item.innerText);
      // console.log(select('#usdt_amount_inpt'));
    })
  });
  
  
  var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    observer : true,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    },
    on: {
      slideChange: function () {
        const index_currentSlide = this.realIndex;
  
        const values = [[200,1000] , [200 , 3000] , [200,8000] , [200,27000] , [200,51000]];
  
        const upgrade_values = [['3200','8499'] , ['8500' , '18999'] , ['19000','52999'] , ['53000','109999'] , ['110000','300000']];
  
        let max_withdrawal = values[index_currentSlide][1];
        let range = ' ₹ '+ upgrade_values[index_currentSlide][0]
                    +' - '+
                    upgrade_values[index_currentSlide][1];
  
  
        select('#vip_update_req').innerText = range;
        select('#max_withdrawal_fillup').innerText  = max_withdrawal;
  
      },
    },
  });
  
  // profile_page linking done
  
  // making the pages come and go when footer is clicked;
  
   function load_main_pages( page ) {
  
     selectAll(".main_pages").forEach((item, i) => {
       item.style.left = '-100vw';
       item.style.zIndex = '0'
     });
     let popup = select('#footer_menue_popup');
     popup.style.display = 'none';
     page.style.zIndex = '3';
  
     if(window.innerWidth <= 950){
       page.style.width = '100%';
       page.style.left = "0px";
     }else{
       page.style.width = 'calc(100% - 70px)';
       page.style.left = "70px";
     }
     select('#home_page').style.left = '0vw';
     select('#home_page').style.width = '100%';
    
   }
  
   document.addEventListener('backbutton', function(){
     if(window.innerWidth <= 950){
       let page = select('#home_page');
       load_main_pages(page);
     }
   });
  
  selectAll('.home').forEach((item, i) => {
     item.addEventListener('click' , ()=>{
        let page = select('#home_page');
       window.location.href = window.location.origin + '/home'; 
    })
   });
  
  
  selectAll('.records').forEach((item, i) => {
    item.addEventListener('click' , ()=>{
      let page = select('#records_page');
      window.location.href = window.location.origin + '/records'; 
    })
  });
  
  selectAll('.trades').forEach((item, i) => {
    item.addEventListener('click' , ()=>{
      let page = select('#trade_page');
      window.location.href = window.location.origin + '/trades'; 
    })
  });
  
  selectAll('.profile').forEach((item, i) => {
    item.addEventListener('click' , ()=>{
      let page = select('#profile_page');
      load_main_pages(page);
    })
  });
  
  
  // home page
  function load_bet_box() {
    selectAll(".bet_card").forEach((item, i) => {
  
    item.addEventListener('click' , ()=>{
  
      select('#final_league_id').innerText = item.querySelector('#league_id').innerText;
      let team_a = item.querySelector('#initial_team_a').innerText;
      let team_b = item.querySelector('#initial_team_b').innerText;
      selectAll('.final_league').forEach((item2, i) => {
        item2.innerText = item.querySelector('#final_league_name').innerText;
      });
      select('#b_time').innerText = item.querySelector('#initial_time').innerText;
      selectAll('.team_a').forEach((item1, i) => {
        item1.innerText = team_a;
      });
      selectAll('.team_b').forEach((item1, i) => {
        item1.innerText = team_b;
      });
  
      let today = new Date();
      select('#b_date').innerText = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`
  
      select('#home_page').scrollTo(0 , 0);
      select('#home_page').style.overflow = 'hidden';
  
      if(window.innerWidth <= 950){
        select('#bet-box').style.left  = '0vw';
      }else{
        select('#bet-box').style.left  = '70px';
  
      }
    })
  
  });
  }
  
  function calc_available() {
    let value = parseFloat(select('#bet_amount').value);
    if(!value){
      select('#available').innerText = '00'
    }else{
      let profit = select('#profit').innerText.replace(/\d%/ , '');
      profit = parseFloat(profit);
      value = parseFloat(((value/100)*profit).toFixed(2));
      select('#available').innerText = value;
    }
  }
  
  select('#bet_amount').addEventListener('keyup' , calc_available);
  // bets_amount input_btns
  selectAll('.bet_btns > span').forEach((item, i) => {
    item.addEventListener('click' , ()=>{
      if(i !== 4){
        let value = item.innerText.replace(/\D/ , '');
        // console.log(value);
        select('#bet_amount').value = parseFloat(value);
        calc_available();
      }else{
        let text = select('.s_balance').innerText;
        let values = text.match(/[+-]?\d+(\.\d+)?/g);
        select('#bet_amount').value = parseFloat(values[0]);
        calc_available()
      }
    })
  });
  
  
  select('#footer_popup_back').addEventListener('click' , ()=>{
    let popup = select('#footer_menue_popup');
    popup.style.display = 'none';
  })
  
  // mobile menue btn ends THERE
  
  selectAll('.bet_profit_data > div').forEach((item, i) => {
    item.addEventListener('click' , ()=>{
      select('.place_bet_popup').style.display = 'block';
  
      let data = item.querySelectorAll('h3'); //taking out the score and profit data
      select('#score').innerText = data[0].innerText;
      select('#profit').innerText = data[1].innerText;
    })
  });
  
  // -----------------function to reload pages ------------
  function reload(){
    setTimeout(()=>{
      window.location.reload();
    } , 3*1000)
  }
  
   // place bet btn
  select('#place_bet').addEventListener('click' , async ()=>{
    
    let button = select("#place_bet");
    button.disabled = true;
    popup_tip = select('#popup_tip');
    popup_page.style.left = '0px';
    popup_cancel_btn.disabled = true;
  
    let league_id = select('#final_league_id').innerText;
    let league_name = select('#league_name').innerText;
    let teama = select('#team_a').innerText;
    let teamb = select('#team_b').innerText;
    let date = select('#b_date').innerText;
    let time = select('#b_time').innerText;
    let amount = select('#bet_amount').value;
    let score = select('#score').innerText;
    let profit = select('#profit').innerText;
    score = score.split('-');
    let score_first = parseInt(score[0]);
    let score_second = parseInt(score[1]);
  
    let data = {};
  
    data['league_id'] = parseInt(league_id);
    data['league']  =    league_name;
    data['team_a']  =    teama;
    data['team_b']  =    teamb;
    data['date']    =    date;
    data['time']    =    time;
    data['first']   =    score_first;
    data['second']  =    score_second;
    data['profit']  =    parseFloat(profit.replace(/\b%/ , '') );
    data['ammount'] =    parseFloat(amount);
    data['l_type']  =    parseInt((league_name === 'virtual' || league_name === 'VIRTUAL')? 0 : 1);
  
    if(
      data['league_id'] == undefined   || !data['league_id'] ||
      data['league']    == undefined   || !data['league']    ||
      data['team_a']    == undefined   || !data['team_a']    ||
      data['team_b']    == undefined   || !data['team_b']    ||
      data['date']      == undefined   || !data['date']      ||
      data['time']      == undefined   || !data['time']      ||
      data['first']     == undefined   || data['first'] === ''  ||
      data['second']    == undefined   || data['second'] === ''    ||
      data['profit']    == undefined  || !data['profit']    ||
      data['ammount']   == undefined || !data['ammount']   ||
      data['l_type']    == undefined  || data['l_type'] === ''
    ){
      popup_tip.innerText = 'Enter all the details first after refreshing';
      popup_cancel_btn.disabled = false;
      
      return;
    }
  
    if(data['ammount'] < 1000){
      popup_tip.innerText = 'Minimum bet amount is 1000';
      popup_cancel_btn.disabled = false;
      
      button.disabled = false;
      return;
    }
      const config = {
      method : 'POST',
      headers:{
        'content-type' : 'application/json'
      },
      body : JSON.stringify(data)
    }
  
      let res = await fetch('/placebet' , config);
      res = await res.json();
  
      if(res['status'] == 1){
        popup_tip.innerText = 'Success! Bet Placed ';
        popup_cancel_btn.disabled = false;
        
        button.disabled = true;
        reload();
       }else if(res['status'] == 2){
         popup_tip.innerText = 'Failuree! Bet already exist';
         popup_cancel_btn.disabled = false;
          
         button.disabled = true;
       }else if(res['status'] == 0){
         popup_tip.innerText = 'Something went wrong try again after refreshing !';
         popup_cancel_btn.disabled = false;
          
         button.disabled = true;
         reload();
  
        }else if(res['status'] == 3){
         popup_tip.innerText = 'Failure! Bet time out';
         popup_cancel_btn.disabled = false;
          
         button.disabled = true;
         reload();
  
        }else if (res['status'] == 4){
         popup_tip.innerText = 'Failure! You have low balance';
         popup_cancel_btn.disabled = false;
          
         button.disabled = true;
         reload();
        }else if(res['status'] == 5){
         popup_tip.innerText = 'Failure! Minimum bet amount is 1000.';
         popup_cancel_btn.disabled = false;
          
         button.disabled = true;
       }
  });
  
  
  // promotion page linking
  selectAll('.promotion_page_btn').forEach((item, i) => {
    item.addEventListener('click' , ()=>{
      let page = select('#promotion_page');
      load_main_pages(page)
    })
  });
  // linking the tutorial pages
  selectAll('.tutorial_page_btn').forEach((item, i) => {
    item.addEventListener('click' , ()=>{
      let page = select('#tutorial_page');
      load_main_pages(page)
    })
  });
  
  // affiliate page
    // linking the affiliate pages
  
  selectAll('.affiliate_center_btn').forEach((item, i) => {
        item.addEventListener('click' , ()=>{
          let page = select('#affiliate_page');
          load_main_pages(page);
        })
    });
  
  selectAll('.aff-new-register').forEach((item, i) => {
      item.addEventListener('click' , ()=>{
        selectAll('.aff_bottom_popups')[i].style.left = '0vw';
        selectAll('.aff_bottom_popups')[i].style.zIndex = '3';
        select('#affiliate_page').scrollTo(0,0);
        select('#affiliate_page').style.overflowY = 'hidden';
      })
    });
  
  select('#report_btn').addEventListener('click' , ()=>{
    select('#report_pop').style.left = '0vw';
    select('#report_pop').style.zIndex = '3';
    select('#affiliate_page').scrollTo(0,0);
    select('#affiliate_page').style.overflowY = 'hidden';
  })
  
  select('#invitation_link_cpy_btn').addEventListener('click' ,  ()=>{
    let text = select('#invitation_link').innerText;
    popup_cancel_btn.disabled = true;
    popup_page.style.left = '0px';
  
    navigator.clipboard
    .writeText(text)
    .then(() => {
      popup_tip.innerText  = 'successfully copied';
      popup_cancel_btn.disabled = false;
      
    })
    .catch(() => {
      popup_tip.innerText  = 'something went wrong';
      popup_cancel_btn.disabled = false;
      
    });
  
  })
  
  selectAll('.aff_back_btn').forEach((item, i) => {
        item.addEventListener('click' , ()=>{
  
          selectAll('.aff_bottom_popups').forEach((item, i) => {
            item.style.zIndex = '0';
          });
  
          select('#affiliate_page').style.overflowY = 'scroll';
          item.parentElement.style.left = '-100vw';
        })
  });
  
  
  
  // home page ends here
  
  // footer linking done;
  
  
  // backend part
  
  
  
  // profile page connections
  
     // usdt pages
  
    select('#usdt_submit').addEventListener('click' , async ()=>{
  
      let usdt_amount = parseFloat(select('#usdt__inpt').value);
  
      if(usdt_amount == '' || !usdt_amount){
        alert("Enter a valid data first");
        return;
      }else if(usdt_amount < 200 ){
        alert("Amount is less than minimum withdrawal");
        return;
      }
  
      let data = {
        amount : usdt_amount,
      }
  
      let config = {
        method : 'POST',
        headers : {
          'content-type' : 'application/json'
        },
        body : JSON.stringify(data)
      }
  
      let response = await fetch('/usdt' , config)
      response = await response.json();
  
      if(response['status'] == 1){
        alert('YOUR PAYMENT IS IN PROCESS');
        window.location.reload();
      }else if(response['status'] == 0){
        alert('something went wrong');
        window.location.reload();
      }else{
        alert(response['status']);
      }
  
  
    })
  
  
  // withdrawal_procede
  
  document.querySelector('#withdraw_request').addEventListener('click' , async()=>{
  
  
      let amount = select('#withdraw_amount').value;
      let withdrawal_code = select("#withdrawal_code").value;
  
      amount = parseFloat(amount);
      popup_page.style.left = '0px';
      
      if(amount == '' || !amount || !withdrawal_code || withdrawal_code == ''){
        popup_tip.innerText = 'Enter valid data'
        popup_cancel_btn.disabled = false
        return;
      }else if(amount < 200 ){
        popup_tip.innerText = 'Minimum withdrawal amount is 200'
        popup_cancel_btn.disabled = false
         return;
      }
  
      let data = {
        withdrawal_code : parseInt(withdrawal_code),
        amount : amount,
      }
  
      let config = {
         method : 'POST',
         headers : {
           'content-type' : 'application/json'
         },
         body : JSON.stringify(data)
       }
  
      let response = await fetch('/withdrawal' , config)
      response = await response.json();
  
      if(response['status'] == 1){
        
        popup_tip.innerText = 'Done! your payment is in processing'
        popup_cancel_btn.disabled = false
        reload();
      }else if(response['status'] == 0){
  
        popup_tip.innerText = 'Something went wrong try after some time'
        popup_cancel_btn.disabled = false 
         reload();
      }else{
        popup_tip.innerText = `${response['status']}`
        popup_cancel_btn.disabled = false
      }
  
  })
  
  // deposit procede
  
  // select('#deposit_procede').addEventListener('click', async()=>{
  //   let amount = select('#deposit_inpt').value;
  //   amount = parseFloat(amount);
  //   let trans_id = select('#trans_id').value;
  //   popup_page.style.left = '0px';
  
  //   if(!trans_id){
  //     popup_tip.innerText = 'Enter the transaction id first.'
  //     popup_cancel_btn.disabled = false
  //     return;
  //   }
  //   trans_id = trans_id.trim();
  //   let body = {'amount' : amount , "transactioin_id" : trans_id};
  
  //   const config = {
  //     method : 'POST',
  //     headers : {
  //       'content-type' : 'application/json'
  //     },
  //     body :  JSON.stringify(body)
  //   }
  
  //   let response = await fetch('/deposit' , config);
  //   response = await response.json();
  //   if(response['status'] == 1){
  //     popup_tip.innerText = 'Done! your payment is in processing.'
  //     popup_cancel_btn.disabled = false
  //   }else if(response['status'] == 2){
      
  //     popup_tip.innerText = 'Something went wrong try again after some time.'
  //     popup_cancel_btn.disabled = false
  //   }else if(response['status'] == 3){
  //     popup_tip.innerText = 'Wrong transaction id try again.'
  //     popup_cancel_btn.disabled = false
  //   }else if(response['status'] == 0){
  //     window.location.href = window.location.origin + '/login';
  //   }
  
  // })
  
  select("#deposit_procede").addEventListener('click', ()=>{
    popup_page.style.left = '0px';
    popup_cancel_btn.disabled = true;
    let amount = select('#deposit_inpt').value;
    if(!amount || parseFloat(amount) < 1000 ){
       popup_tip.innerText = 'Failure! minimum deposit amount is 1000';
       popup_cancel_btn.disabled = false;
        
      }else{
      popup_tip.innerText = 'Success! now you can pay using yy pay.';
      popup_cancel_btn.disabled = false;
      
      select('#yy_amount').innerText = amount;
      select('#yy_pay').style.left = '0';
    }
  })
  
  // bank details
  select('#sv_bank_details_btn').addEventListener('click' , async()=>{
  
    let values = selectAll('.bank_details_inpt');
    let name = values[1].value;
    let ac_number = values[2].value;
    let ifsc = values[3].value;
    popup_page.style.left = '0px';
  
    if(!name || !ac_number || !ifsc){
      popup_tip.innerText = 'Enter valid data';
      popup_cancel_btn.disabled = false;
      
      return;
    }
    let data = {
      name,
      ac_number,
      ifsc
    };
  
    const config = {
      method : 'POST',
      headers : {
        'content-type' : 'application/json'
      },
      body : await JSON.stringify(data)
    };
  
    let response = await fetch('/bank_details' , config);
    response = await response.json();
  
    if(response['status'] == 3){
      popup_tip.innerText = 'Enter all the data';
      popup_cancel_btn.disabled = false;
      
    }else if(response['status'] == 0){
        popup_tip.innerText = 'something went wrong try again after some time.'
        popup_cancel_btn.disabled = false
    }else if (response['status'] == 2){
      popup_tip.innerText = 'you already have an account.';
      popup_cancel_btn.disabled = false;
       
    }else if(response['status'] == 1){
        popup_tip.innerText = 'Success! Bank details added';
        popup_cancel_btn.disabled = false;
        
    }else{
      popup_tip.innerText = 'something went wrong try after refreshing';
      popup_cancel_btn.disabled = false;
      
    }
  
  })
  
  // withdrawal code
  select('#sv_withdrawal_code').addEventListener('click' , async()=>{
    let details = selectAll('.withdrawal_change_inpt');
    popup_page.style.left = '0px';
  
    if(details[0].value !== '' && details[1].value !== ''){
  
      if( parseInt(details[0].value) === parseInt(details[1].value) ){
  
        let previous_code = 0;
  
        let new_code = parseInt(details[1].value)
        let data = {
          previous_code , new_code
        }
        const config = {
          method : 'POST',
          headers : {
            'content-type' : 'application/json'
          },
          body : JSON.stringify(data)
        };
  
        let response = await fetch('/withdrawal_code' , config);
        response = await response.json();
  
        if(response['status'] == 1){
          
          popup_tip.innerText = 'Success! code generated.';
          popup_cancel_btn.disabled = false;
          
        }else if (response['status'] == 0) {
          popup_tip.innerText = 'Something went wrong';
          popup_cancel_btn.disabled = false;
          
        }else{
          popup_tip.innerText = response['status'];
          popup_cancel_btn.disabled = false;
        }
  
      }else{
        popup_tip.innerText = 'Code not matched';
        popup_cancel_btn.disabled = false;
  
      }
  
    } else {
      popup_tip.innerText = 'Enter all the required details!';
      popup_cancel_btn.disabled = false;
   
    }
  
  })
  
  // change password
  select('#chang_pass_btns').addEventListener('click' , async()=>{
    let details = selectAll('.change_pass_input');
    popup_page.style.left = '0px';
    if(details[1].value !== '' && details[2].value !== '' && details[0].vlaue !== ''){
  
      if(details[1].value !== details[2].value){
        popup_tip.innerText = 'Password not matched!.';
        popup_cancel_btn.disabled = false;
        
        return;
        }
  
        let previous_code = details[0].vlaue;
        let new_code = details[1].value;
  
        let data = {
          previous_code , new_code
        }
        const config = {
          method : 'POST',
          headers : {
            'content-type' : 'application/json'
          },
          body : await JSON.stringify(data)
        };
  
        let response = await fetch('/password' , config);
        response = await response.json();
  
        if(response['status'] == 1){
          popup_tip.innerText = 'Success! password changed.';
          popup_cancel_btn.disabled = false;
          
        }else{
          popup_tip.innerText = response['status'];
          popup_cancel_btn.disabled = false;
          
          return;
        }
  
      }else{
        popup_tip.innerText = 'Enter all the details.';
        popup_cancel_btn.disabled = false;
        
        return;
      }
  
  
  })
  
  
      // profile page connection ends here
  
  // linking the bets section
  
  selectAll('.del_trade_cancel').forEach((item, i) => {
    item.addEventListener('click' , ()=>{
      item.parentElement.parentElement.style.display = 'none';
    })
  });
  
  
  function listen_to_cancel_bet() {
    selectAll('.trade_cancel_btn').forEach((item, i) => {
      item.addEventListener('click' , ()=>{
        select('#del_leagueid').innerText = item.parentElement.querySelector('.trade_league_id').innerText;
        
        select('.trade_del_box').style.display = 'block';
      })
      });
  
      select('#del_trade').addEventListener('click' , async ()=>{
        
        popup_page.style.left = '0px';
        let value = select('#del_leagueid').innerText;
        
        let data = JSON.stringify({value : value});
        const config = {
            method : 'POST',
            headers:{
                'content-type' : 'application/json'
              },
              body : data
            }
  
  
            let res = await fetch('/delbet' , config);
            let parsed_response = await res.json();
  
            if(parsed_response['status'] == 1){
              popup_tip.innerText = 'Success! Bet deleted. refresh';
              popup_cancel_btn.disabled = false;
              
            }else if(parsed_response['status'] == 2){
              popup_tip.innerText = 'Bet cannot be deleted now.';
              popup_cancel_btn.disabled = false;
              
              return;
            }else if(parsed_response['status'] == 0){
              window.location.href = window.location.origin + '/login';
            }
  
      })
  
  }
  
  // --------------------------QR CODE GENERATION ---------------------
  
  let qr_code_element = document.querySelector("#qrcode");
  
  function generate(value) {
    qr_code_element.style = "";
  
    var qrcode = new QRCode(qr_code_element, {
  
      text: `${value}`,
      width: 180, //128
      height: 180,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  
  }
  
  
  // ---------------yy pay copy btns ----------------
  
  async function copyPageUrl(text) {
    popup_page.style.left = '0px';
    popup_cancel_btn.disabled = true;
  
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      popup_tip.innerText = 'Failure! something went wrong.'
      popup_cancel_btn.disabled = false;
  
    }finally{
      popup_tip.innerText = 'Success! upi id copied.'
      popup_cancel_btn.disabled = false;
    }
  }
  
  async function recharge(data){
    
    console.log('am i being called');
  
    popup_page.style.left = '0px';
    popup_cancel_btn.disabled = true;
  
    const config = {
      method : 'POST',
      headers : {
        'content-type' : 'application/json'
      },
      body :  JSON.stringify(data)
    }
    let res = await fetch('/deposit' , config);
    res = await res.json();
  
    if(res['status'] === 1){
      popup_tip.innerText = 'Success! your payment is in processing .';
      popup_cancel_btn.disabled = false;
      
      reload();
    }else{
      popup_tip.innerText = 'Failure! something went wrong try again after refreshing.'
      popup_cancel_btn.disabled = false;
      
      reload();
    }
  
  }
  
  select('#yy_submit').addEventListener('click' , ()=>{
    let transaction_id = select('#yy_transaction').value;
    let amount = select('#yy_amount').innerText;
  
    if(!transaction_id || transaction_id == undefined ||
    !amount || amount == undefined){
      alert('something went wrong ');
      window.location.reload();
      return;
    }
    amount = parseFloat(amount);
    let data = {'amount' : amount , "transactioin_id" : transaction_id};
    recharge(data);
  })
  
  select('#yy_upi_cpy').addEventListener('click' , ()=>{
    let text = select('#yy_upi_id');
    copyPageUrl(text.innerText);
  })
  
  // -----------yy pay ends ----------------
  
  
  //---------- calling the generate function with a value having our inv code;
  
  async function get_inv(inv_code){
    let inv = {INV : inv_code};
    if(inv['INV'] !== 0){
      document.querySelector('.inv_code > h1').innerText = inv['INV'];
      select('#invitation_link').innerText = `${window.location.origin + '/signup' + '?id=' + inv['INV'] }`;
      generate(`${window.location.origin + '/signup' + '?id=' + inv['INV'] }`);
    }else{
      window.location.href = window.location.origin + "/sign.html";
      return;
    }
  
  }
  
  
  //------------------------------------------------ bets linking done -------------------------------------------------------------//
  
  get_user_data();
//   get_bet_history();
  get_all_members();
//   get_live_bets();
  get_payment();
  
  
  // setters
  
  function create_match(data){
  
    let parent_box = document.querySelector('#matches_box');
    let match_card = document.createElement('div');
    match_card.classList.add('match-card');
    match_card.classList.add('bet_card');
  
    // match_card.classList.add('bet_card');
  
    let body = `<p  class="league_id" id="league_id">${data['fixture_id']}</p>
    <h3 id = "final_league_name">${data['league']}</h3>
      <div class="div2">
          <span><h3 id='initial_team_a'>${data['team_a']}</h3><h3 id='initial_team_b'>${data['team_b']}</h3></span>
          <span class="vs_logo"></span>
          <span><h4>Today</h4> <h4 id='initial_time'>${data['date'].getHours()}:${data['date'].getMinutes()}</h4></span>
      </div>`
  
    match_card.innerHTML = body;
    parent_box.append(match_card);
  }
  
  function set_user_data(info){
  
    selectAll('.s_invitation').forEach((item, i) => {
  
      item.value = `${window.location.origin + '/signup' + '?id=' + info['inv']}`;
  
    });
    
    get_inv(parseInt(info['inv']));
  
    selectAll('.s_name').forEach((item, i) => {
      item.innerText = info['name']
    });
    selectAll('.s_inv_code').forEach((item, i) => {
      item.innerText = info['inv'];
    });
    selectAll('.s_balance').forEach((item, i) => {
      item.innerText = info['balance'].toFixed(2);
    });
    selectAll('.s_vip').forEach((item, i) => {
      item.innerText = `VIP ${info['vipLevel']}`;
    });
    selectAll('.s_members').forEach((item, i) => {
      item.innerText = info['members'];
    });
    selectAll('.s_rebade').forEach((item, i) => {
      item.innerText = parseFloat(info['RebadeBonus'].toFixed(3))
    });
  
    selectAll('.s_promotion').forEach((item, i) => {
      item.innerText = info['promotion_bonus'];
    });
  
    selectAll('.profile_avatar').forEach((item, i) => {
      item.style.backgroundImage =  `url(../photos/${info['avatar']}.jpg)`;
    });
  
    if(parseInt(info['vipLevel']) !== 5){
      select('.s_vip_calc').innerText = `VIP ${parseInt(info['vipLevel'])+1}`
    }else{
      select('.s_vip_calc').innerText = `VIP ${parseInt(info['vipLevel'])}`
    }
  
    let next_dep_plot = 1;
  
    switch (info['vipLevel']) {
      case 0:
        next_dep_plot = 3200;
        break;
      case 1:
        next_dep_plot = 8500;
        break;
      case 2 :
      next_dep_plot = 19000;
        break;
      case 3:
      next_dep_plot = 60000;
        break;
      case 4:
        next_dep_plot = 115000;
        break;
    }
  
    let width = Math.min(100 , ( ((info['max_deposit']/next_dep_plot)*100 ).toFixed(2)) ) + "%";
  
    select('#vip_meter').style.width = width;
  
    if(info['BankDetails'] !== 'undefined' && info['BankDetails'].length && info['BankDetails'][0]['Name']){
     selectAll('.bank_name').forEach((item, i) => {
       item.innerText = info['BankDetails'][0]['Name'];
     });
    }
    if(info['BankDetails'] !== 'undefined' && info['BankDetails'].length && info['BankDetails'][0]['Name']){
      selectAll('.s_acc_number').forEach((item, i) => {
  
        let num = ('' + info['BankDetails'][0]['AcNumber'] ).slice(-4);
  
        item.innerText = num;
      });
    }
  
  }
  
  function create_settled_bets(data){
    console.log(data);
    let parent = select('#record_data_box');
    let child = document.createElement('div');
    child.classList.add('match-card');
  
  let body = `<h3>${data['league']}</h3>
    <div class="div2">
        <span><h3>${data['team_a']}</h3><h3>${data['team_b']}</h3></span>
        <span class="vs_logo"></span>
        <span><h4>${data['date']}</h4> <h4>${data['time']}</h4></span>
    </div>
    <div class="second-match-card">
      <span>
  
        <h5 class="lime">FULL TIME</h5>
        <h6>RESULT</h6>
      </span>
      <span>
        <h4>score</h4>
        <h5 class="lime">${data['scoreDetails'][0]['first']} - ${data['scoreDetails'][0]['second']} </h5>
        <h5>${data['final_score'][0]['first']}-${data['final_score'][0]['second']}</h5>
      </span>
      <span>
        <h4>PROFIT</h4>
        <h5 class="lime">${data['profit']}</h5>
        <h6>AVAILABLE</h6>
      </span>
      <span>
        <h4>AMOUNT</h4>
        <h5>${data['bAmmount']}</h5>
        <h6 class="lime">${ ((parseFloat(data['bAmmount'])/100) * parseFloat(data['profit'])).toFixed(2) }</h6>
      </span>
    </div>`;
  
    child.innerHTML = body;
  
    parent.append(child);
  }
  
  function check_date(date , time ){
  
    const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
    });
    let today = new Date(nDate);
  
    let match_date = date.split(/\//);
    let m_time = time.split(/\:/);
    let m_date = parseInt(match_date[0]);
    let m_month = parseInt(match_date[1]);
    let m_hours = parseInt(m_time[0]);
    let m_minutes = parseInt(m_time[1]);
  
    let minutes_now = parseInt(today.getMinutes());
    let hours_now = parseInt(today.getHours());
    minutes_now += 5;
    if(minutes_now > 60 ){
      minutes_now = minutes_now - 60;
      hours_now += 1;
    }
  
    let valid_date = (parseInt(today.getDate()) == m_date);
    let valid_hour = (hours_now < m_hours);
    let valid_minutes = (minutes_now < m_minutes );
    let equal_hours = (hours_now === m_hours);
    // console.log(hours_now , m_hours , minutes_now , m_minutes);
    let to_return = '';
  
    if(valid_date && valid_hour || equal_hours && valid_minutes){
      to_return = `<div class="trade_cancel_btn">
        <i class="fa-solid fa-angles-up"></i>
        <h3>CANCEL</h3>
        </div>`;
      return to_return;
    }
  
    return to_return;
  
  }
  
  function create_unsettled_bets(data){
  console.log(data);
    let parent = select('#trade_data_box');
    let child = document.createElement('div');
  
    child.classList.add('match-card');
  
    let cut_box = check_date(data['date'] , data['time']);
  
    let body = `  <h3>${data['league']}</h3>
    <p style="display : none;" class="trade_league_id">${data['leagueId']}</p>
      <div class="div2">
          <span><h3>${data['team_a']}</h3><h3>${data['team_b']}</h3></span>
          <span class="vs_logo"></span>
          <span><h4>${data['date']}</h4> <h4>${data['time']}</h4></span>
      </div>
      <div class="second-match-card">
        <span>
  
          <h5 class="lime">FULL TIME</h5>
  
        </span>
        <span>
          <h4>score</h4>
          <h5 class="lime">${data['scoreDetails'][0]['first']} - ${data['scoreDetails'][0]['second']} </h5>
        </span>
        <span>
          <h4>PROFIT</h4>
          <h5 class="lime">${data['profit']}</h5>
          <h6>AVAILABLE</h6>
        </span>
        <span>
          <h4>AMOUNT</h4>
          <h5>${data['bAmmount']}</h5>
          <h6 class="lime">${ ((parseFloat(data['bAmmount'])/100) * parseFloat(data['profit'])).toFixed(2) }</h6>
        </span>
      </div>
      ${cut_box}
      `;
  
    child.innerHTML = body;
  
    parent.append(child);
  }
  
  function create_members(data){
    // selecting all the parent boxes to append the child
    let new_register_content_box = select('#new_register_content_box');
    let new_deposit_content_box = select('#new_deposit_content_box');
    let new_bets_content_box = select('#new_bets_content_box');
    let new_withdrawal_content_box = select('#new_withdrawal_content_box');
  
  
  
    let user_profit = 0;
    let user_amount = 0;
    let total_bets_played = 0;
    let level2_user_length = 0;
    let level3_user_length = 0;
    let level4_user_length = 0;
    let level5_user_length = 0;
    let level6_user_length = 0;
  
  
    if(data['level2_user']!== 'undefined'){
  
      data['level2_user'].forEach((item, i) => {
        level2_user_length += item.length;
      });
    }
    if( data['level3_user'] !== 'undefined') {
        data['level3_user'].forEach((item, i) => {
          level3_user_length += item.length;
        });
    }
    
    if( data['level4_user'] !== 'undefined') {
        data['level4_user'].forEach((item, i) => {
          level4_user_length += item.length;
        });
    }
    
    if( data['level5_user'] !== 'undefined') {
        data['level5_user'].forEach((item, i) => {
          level5_user_length += item.length;
        });
    }
    
    if( data['level6_user'] !== 'undefined') {
        data['level6_user'].forEach((item, i) => {
          level6_user_length += item.length;
        });
    }
  
    let total_members = parseInt(data['direct_members'].length) + parseInt(level3_user_length) + parseInt(level2_user_length) + parseInt(level4_user_length) + parseInt(level5_user_length) + parseInt(level6_user_length);
   
  
    let total_withdrawal = 0;
    let sub_members_count = total_members - parseInt(data['direct_members'].length);
  
  
    for(let item of data['direct_members']){
  
      user_profit = (parseFloat(user_profit) + parseFloat(item['profit'])  );
      user_amount = (parseFloat(user_amount) + parseFloat(item['deposit']) );
      total_bets_played = parseInt(total_bets_played) + parseInt(item['betPlayed']);
      total_withdrawal = parseInt(total_withdrawal) +  parseInt(item['withdrawalAmmount']);
  
    // creating the childs to append inside the boxes;
  
    let new_register_child = document.createElement('div');
    new_register_child.classList.add('aff_data_containers');
  
    let new_deposit_child = document.createElement('div');
    new_deposit_child.classList.add('aff_data_containers');
  
    let new_bets_child = document.createElement('div');
    new_bets_child.classList.add('aff_data_containers');
  
    let new_withdrawal_child = document.createElement('div');
    new_withdrawal_child.classList.add('aff_data_containers');
  
    let new_register_body = `<h4>${item['user']}</h4>
                             <h4>LEVEL 1</h4>
                             <h4>${item['members']}</h4>`
    let new_deposit_body = `<h4>${item['user']}</h4>
                             <h4>LEVEL 1</h4>
                             <h4>${item['deposit']}</h4>`
    let new_bets_body = `<h4>${item['user']}</h4>
                            <h4>LEVEL 1</h4>
                            <h4>${item['betPlayed']}</h4>`
    let new_withdrawal_body = `<h4>${item['user']}</h4>
                             <h4>LEVEL 1</h4>
                             <h4>${item['Withdrawals']}</h4>`
  
  // setting every data to the child;
    new_register_child.innerHTML = new_register_body;
    new_deposit_child.innerHTML = new_deposit_body;
    new_bets_child.innerHTML = new_bets_body;
    new_withdrawal_child.innerHTML = new_withdrawal_body;
  
    // now inserting the data's to the parent box
    new_register_content_box.append(new_register_child);
    new_deposit_content_box.append(new_deposit_child);
    new_bets_content_box.appendChild(new_bets_child)
    new_withdrawal_content_box.appendChild(new_withdrawal_child)
  
  
  }
  
    if(data['level2_user'] !== 'undefined'){
  
      for(let i = 0 ; i < data['level2_user'].length; i++){
        for(let j = 0 ; j <data['level2_user'][i].length ; j++){
  
          user_profit = (parseFloat(user_profit) + parseFloat(data['level2_user'][i][j]['profit']));
          user_amount = (parseFloat(user_amount) + parseFloat(data['level2_user'][i][j]['deposit']));
          total_bets_played = parseInt(total_bets_played) + parseInt(data['level2_user'][i][j]['betPlayed']);
          total_withdrawal = parseInt(total_withdrawal) +  parseInt(data['level2_user'][i][j]['withdrawalAmmount']);
  
          // creating the child outer box
          let new_register_child = document.createElement('div');
          new_register_child.classList.add('aff_data_containers');
  
          let new_deposit_child = document.createElement('div');
          new_deposit_child.classList.add('aff_data_containers');
  
          let new_bets_child = document.createElement('div');
          new_bets_child.classList.add('aff_data_containers');
  
          let new_withdrawal_child = document.createElement('div');
          new_withdrawal_child.classList.add('aff_data_containers');
  
          let new_register_body = `<h4>${data['level2_user'][i][j]['user']}</h4>
                                   <h4>LEVEL 2</h4>
                                   <h4>${data['level2_user'][i][j]['members']}</h4>`
          let new_deposit_body = `<h4>${data['level2_user'][i][j]['user']}</h4>
                                   <h4>LEVEL 2</h4>
                                   <h4>${data['level2_user'][i][j]['deposit']}</h4>`
          let new_bets_body = `<h4>${data['level2_user'][i][j]['user']}</h4>
                                  <h4>LEVEL 2</h4>
                                  <h4>${data['level2_user'][i][j]['betPlayed']}</h4>`
          let new_withdrawal_body = `<h4>${data['level2_user'][i][j]['user']}</h4>
                                   <h4>LEVEL 2</h4>
                                   <h4>${data['level2_user'][i][j]['Withdrawals']}</h4>`
  
        // setting every data to the child;
          new_register_child.innerHTML = new_register_body;
          new_deposit_child.innerHTML = new_deposit_body;
          new_bets_child.innerHTML = new_bets_body;
          new_withdrawal_child.innerHTML = new_withdrawal_body;
  
          // now inserting the data's to the parent box
          new_register_content_box.append(new_register_child);
          new_deposit_content_box.append(new_deposit_child);
          new_bets_content_box.appendChild(new_bets_child)
          new_withdrawal_content_box.appendChild(new_withdrawal_child);
  
        }
      }
  
    }
  
    if(data['level3_user'] !== 'undefined'){
  
      for(let i = 0 ; i < data['level3_user'].length; i++){
        for(let j = 0 ; j < data['level3_user'][i].length ; j++){
  
           user_profit = (parseFloat(user_profit) + parseFloat(data['level3_user'][i][j]['profit']));
           user_amount = (parseFloat(user_amount) + parseFloat(data['level3_user'][i][j]['deposit']));
           total_bets_played = parseInt(total_bets_played) + parseInt(data['level3_user'][i][j]['betPlayed']);
           total_withdrawal = parseInt(total_withdrawal) +  parseInt(data['level3_user'][i][j]['withdrawalAmmount']);
  
           // creating the child outer box
           let new_register_child = document.createElement('div');
           new_register_child.classList.add('aff_data_containers');
  
           let new_deposit_child = document.createElement('div');
           new_deposit_child.classList.add('aff_data_containers');
  
           let new_bets_child = document.createElement('div');
           new_bets_child.classList.add('aff_data_containers');
  
           let new_withdrawal_child = document.createElement('div');
           new_withdrawal_child.classList.add('aff_data_containers');
  
           let new_register_body = `<h4>${data['level3_user'][i][j]['user']}</h4>
           <h4>LEVEL 3</h4>
           <h4>${data['level3_user'][i][j]['members']}</h4>`
  
           let new_deposit_body = `<h4>${data['level3_user'][i][j]['user']}</h4>
           <h4>LEVEL 3</h4>
           <h4>${data['level3_user'][i][j]['deposit']}</h4>`
  
           let new_bets_body = `<h4>${data['level3_user'][i][j]['user']}</h4>
           <h4>LEVEL 3</h4>
           <h4>${data['level3_user'][i][j]['betPlayed']}</h4>`
  
           let new_withdrawal_body = `<h4>${data['level3_user'][i][j]['user']}</h4>
           <h4>LEVEL 3</h4>
           <h4>${data['level3_user'][i][j]['Withdrawals']}</h4>`
  
           // setting every data to the child;
           new_register_child.innerHTML = new_register_body;
           new_deposit_child.innerHTML = new_deposit_body;
           new_bets_child.innerHTML = new_bets_body;
           new_withdrawal_child.innerHTML = new_withdrawal_body;
  
           // now inserting the data's to the parent box
           new_register_content_box.append(new_register_child);
           new_deposit_content_box.append(new_deposit_child);
           new_bets_content_box.appendChild(new_bets_child)
           new_withdrawal_content_box.appendChild(new_withdrawal_child);
  
  
        }
      }
  
    }
  
    if(data['level4_user'] !== 'undefined'){
  
      for(let i = 0 ; i < data['level4_user'].length; i++){
        for(let j = 0 ; j < data['level4_user'][i].length ; j++){
  
           user_profit = (parseFloat(user_profit) + parseFloat(data['level4_user'][i][j]['profit']));
           user_amount = (parseFloat(user_amount) + parseFloat(data['level4_user'][i][j]['deposit']));
           total_bets_played = parseInt(total_bets_played) + parseInt(data['level4_user'][i][j]['betPlayed']);
           total_withdrawal = parseInt(total_withdrawal) +  parseInt(data['level4_user'][i][j]['withdrawalAmmount']);
  
           // creating the child outer box
           let new_register_child = document.createElement('div');
           new_register_child.classList.add('aff_data_containers');
  
           let new_deposit_child = document.createElement('div');
           new_deposit_child.classList.add('aff_data_containers');
  
           let new_bets_child = document.createElement('div');
           new_bets_child.classList.add('aff_data_containers');
  
           let new_withdrawal_child = document.createElement('div');
           new_withdrawal_child.classList.add('aff_data_containers');
  
           let new_register_body = `<h4>${data['level4_user'][i][j]['user']}</h4>
           <h4>LEVEL 4</h4>
           <h4>${data['level4_user'][i][j]['members']}</h4>`
  
           let new_deposit_body = `<h4>${data['level4_user'][i][j]['user']}</h4>
           <h4>LEVEL 4</h4>
           <h4>${data['level4_user'][i][j]['deposit']}</h4>`
  
           let new_bets_body = `<h4>${data['level4_user'][i][j]['user']}</h4>
           <h4>LEVEL 4</h4>
           <h4>${data['level4_user'][i][j]['betPlayed']}</h4>`
  
           let new_withdrawal_body = `<h4>${data['level4_user'][i][j]['user']}</h4>
           <h4>LEVEL 4</h4>
           <h4>${data['level4_user'][i][j]['Withdrawals']}</h4>`
  
           // setting every data to the child;
           new_register_child.innerHTML = new_register_body;
           new_deposit_child.innerHTML = new_deposit_body;
           new_bets_child.innerHTML = new_bets_body;
           new_withdrawal_child.innerHTML = new_withdrawal_body;
  
           // now inserting the data's to the parent box
           new_register_content_box.append(new_register_child);
           new_deposit_content_box.append(new_deposit_child);
           new_bets_content_box.appendChild(new_bets_child)
           new_withdrawal_content_box.appendChild(new_withdrawal_child);
  
  
        }
      }
  
    }
  
    if(data['level5_user'] !== 'undefined'){
  
      for(let i = 0 ; i < data['level5_user'].length; i++){
        for(let j = 0 ; j < data['level5_user'][i].length ; j++){
  
           user_profit = (parseFloat(user_profit) + parseFloat(data['level5_user'][i][j]['profit']));
           user_amount = (parseFloat(user_amount) + parseFloat(data['level5_user'][i][j]['deposit']));
           total_bets_played = parseInt(total_bets_played) + parseInt(data['level5_user'][i][j]['betPlayed']);
           total_withdrawal = parseInt(total_withdrawal) +  parseInt(data['level5_user'][i][j]['withdrawalAmmount']);
  
           // creating the child outer box
           let new_register_child = document.createElement('div');
           new_register_child.classList.add('aff_data_containers');
  
           let new_deposit_child = document.createElement('div');
           new_deposit_child.classList.add('aff_data_containers');
  
           let new_bets_child = document.createElement('div');
           new_bets_child.classList.add('aff_data_containers');
  
           let new_withdrawal_child = document.createElement('div');
           new_withdrawal_child.classList.add('aff_data_containers');
  
           let new_register_body = `<h4>${data['level5_user'][i][j]['user']}</h4>
           <h4>LEVEL 5</h4>
           <h4>${data['level5_user'][i][j]['members']}</h4>`
  
           let new_deposit_body = `<h4>${data['level5_user'][i][j]['user']}</h4>
           <h4>LEVEL 5</h4>
           <h4>${data['level5_user'][i][j]['deposit']}</h4>`
  
           let new_bets_body = `<h4>${data['level5_user'][i][j]['user']}</h4>
           <h4>LEVEL 5</h4>
           <h4>${data['level5_user'][i][j]['betPlayed']}</h4>`
  
           let new_withdrawal_body = `<h4>${data['level5_user'][i][j]['user']}</h4>
           <h4>LEVEL 5</h4>
           <h4>${data['level5_user'][i][j]['Withdrawals']}</h4>`
  
           // setting every data to the child;
           new_register_child.innerHTML = new_register_body;
           new_deposit_child.innerHTML = new_deposit_body;
           new_bets_child.innerHTML = new_bets_body;
           new_withdrawal_child.innerHTML = new_withdrawal_body;
  
           // now inserting the data's to the parent box
           new_register_content_box.append(new_register_child);
           new_deposit_content_box.append(new_deposit_child);
           new_bets_content_box.appendChild(new_bets_child)
           new_withdrawal_content_box.appendChild(new_withdrawal_child);
  
  
        }
      }
  
    }
  
    if(data['level6_user'] !== 'undefined'){
  
      for(let i = 0 ; i < data['level6_user'].length; i++){
        for(let j = 0 ; j < data['level6_user'][i].length ; j++){
  
           user_profit = (parseFloat(user_profit) + parseFloat(data['level6_user'][i][j]['profit']));
           user_amount = (parseFloat(user_amount) + parseFloat(data['level6_user'][i][j]['deposit']));
           total_bets_played = parseInt(total_bets_played) + parseInt(data['level6_user'][i][j]['betPlayed']);
           total_withdrawal = parseInt(total_withdrawal) +  parseInt(data['level6_user'][i][j]['withdrawalAmmount']);
  
           // creating the child outer box
           let new_register_child = document.createElement('div');
           new_register_child.classList.add('aff_data_containers');
  
           let new_deposit_child = document.createElement('div');
           new_deposit_child.classList.add('aff_data_containers');
  
           let new_bets_child = document.createElement('div');
           new_bets_child.classList.add('aff_data_containers');
  
           let new_withdrawal_child = document.createElement('div');
           new_withdrawal_child.classList.add('aff_data_containers');
  
           let new_register_body = `<h4>${data['level6_user'][i][j]['user']}</h4>
           <h4>LEVEL 6</h4>
           <h4>${data['level6_user'][i][j]['members']}</h4>`
  
           let new_deposit_body = `<h4>${data['level6_user'][i][j]['user']}</h4>
           <h4>LEVEL 6</h4>
           <h4>${data['level6_user'][i][j]['deposit']}</h4>`
  
           let new_bets_body = `<h4>${data['level6_user'][i][j]['user']}</h4>
           <h4>LEVEL 6</h4>
           <h4>${data['level6_user'][i][j]['betPlayed']}</h4>`
  
           let new_withdrawal_body = `<h4>${data['level6_user'][i][j]['user']}</h4>
           <h4>LEVEL 6</h4>
           <h4>${data['level6_user'][i][j]['Withdrawals']}</h4>`
  
           // setting every data to the child;
           new_register_child.innerHTML = new_register_body;
           new_deposit_child.innerHTML = new_deposit_body;
           new_bets_child.innerHTML = new_bets_body;
           new_withdrawal_child.innerHTML = new_withdrawal_body;
  
           // now inserting the data's to the parent box
           new_register_content_box.append(new_register_child);
           new_deposit_content_box.append(new_deposit_child);
           new_bets_content_box.appendChild(new_bets_child)
           new_withdrawal_content_box.appendChild(new_withdrawal_child);
  
  
        }
      }
  
    }
  
    selectAll('.s_members').forEach((item, i) => {
      item.innerText = total_members;
    });
  
    select('#s_tot_profit').innerText = parseFloat(user_profit.toFixed(2));
    select('#s_tot_bets').innerText = total_bets_played;
    select('#s_tot_deposit').innerText = parseFloat(user_amount.toFixed(2));
    select('#s_tot_withdrawal').innerText = total_withdrawal;
  
    return;
  }
  
  function create_deposit(data){
  
    let deposit_parent_box = select("#deposit_data_box");
    if(data && data.length){
      data.forEach((item, i) => {
  
      let child = document.createElement('div');
      child.classList.add("pay_card");
      let status = '';
      let status_type = '';
  
      if(item['status'] == 0){
        status = 'yellow';
        status_type = 'pending'
      }else if(item['status'] == 1){
        status = 'lime';
        status_type = 'successfull';
      }else if(item['status'] == 2){
        status = 'red';
        status_type = 'cancelled';
      }
  
      let body = `<div class="pay_card_title">
        <h4>DEPOSIT</h4>
        <span>
          <i style='color : ${status}' class="fa-sharp fa-solid fa-circle"></i>  <h5>${status_type}</h5>
        </span>
      </div>
      <div class="pay_data">
        <h3>${item.Ammount}</h3>
        <h4>${item.transactioin_id}</h4>
        <h3>${item.date}</h3>
      </div>`;
  
      child.innerHTML = body;
  
      deposit_parent_box.append(child);
  
    });
    }
  
  }
  
  function create_withdrawal(data){
  
    let withdrawal_parent_box = select("#withdrawal_data_box");
  
    if (data && data.length) {
  
      data.forEach((item, i) => {
       let child = document.createElement('div');
       child.classList.add("pay_card");
       let status = '';
       let status_type = '';
  
        if(item['status'] == 0){
         status = 'yellow';
         status_type = 'pending'
        }else if(item['status'] == 1){
          status = 'lime';
          status_type = 'successfull';
        }else if(item['status'] == 2){
          status = 'red';
          status_type = 'cancelled';
       }
  
      let body = `<div class="pay_card_title">
        <h4>WITHDRAWAL</h4>
        <span>
          <i style='color : ${status};'class="fa-sharp fa-solid fa-circle"></i>  <h5>${status_type}</h5>
        </span>
      </div>
      <div class="pay_data">
        <h3>${item.Ammount}</h3>
        <h4>${item.transactioin_id}</h4>
        <h3>${item.date}</h3>
      </div>`
  
      child.innerHTML = body;
  
      withdrawal_parent_box.append(child);
  
    });
    }
  }

  function create_other_data(data){
  
    let deposit_parent_box = select("#deposit_data_box");
    if(data && data.length){
      data.forEach((item, i) => {
  
      let child = document.createElement('div');
      child.classList.add("pay_card");
      let status = '';
      let status_type = '';
  
      status = 'lime';
      status_type = 'successfull';
      
  
      let body = `<div class="pay_card_title">
        <h4>OTHER</h4>
        <span>
          <i style='color : ${status}' class="fa-sharp fa-solid fa-circle"></i>  <h5>${status_type}</h5>
        </span>
      </div>
      <div class="pay_data">
        <h3>+${item.Ammount}</h3>
        <h4></h4>
        <h3>${item.date}</h3>
      </div>`;
  
      child.innerHTML = body;
  
      deposit_parent_box.append(child);
  
    });
    }
  
  }
  // getters
  
  
  async function get_user_data(){
  
   let config = {
      method : 'GET',
      headers : {
        'content-type' : 'application/json'
      }
    }
  
    let res =  await fetch('/user_data' , config);
    let user_information = await res.json();
  
    if(user_information['status'] === 1){
      set_user_data(user_information);
    }else if(user_information['status'] === 2){
      window.location.href = window.location.origin + '/login';
    }
  
  }
  
  async function get_live_bets(){
  
    let today = new Date();
    let date = (today.getDate() < 10)? '0'+today.getDate() : today.getDate();
    let month = (today.getMonth() < 9)? '0'+(today.getMonth()+1) : today.getMonth()+1;
  
     let url = `https://v3.football.api-sports.io/fixtures/?date=${today.getFullYear()}-${month}-${date}&status=NS`;
     // let url = `https://v3.football.api-sports.io/fixtures/?date=2022-10-12&status=NS`;
  
     let res =
     await fetch(url, {
      "method": "GET",
      "headers": {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "021ae6685ec46e47ec83f8848ac1d168"
            // "x-rapidapi-key": "823296afa77a4989062591abc46178ee"
        }
    })
    // console.log(res);
    let matches = await res.json();
    let count = 1;
  
    for(let item of matches['response']){
  
      if(count > 400){
        count++;
        break;
      }
  
      let date = new Date(item['fixture']['date']);
  
      let match_data = {
        date : date,
        fixture_id : item['fixture']['id'],
        team_a : item['teams']['home']['name'],
        team_b : item['teams']['away']['name'],
        league : item['league']['name']
      };
  
      if(today.getDate() == date.getDate() && date.getHours() > today.getHours() ||
         today.getDate() == date.getDate() && date.getHours() == today.getHours() && date.getMinutes() > (today.getMinutes() + 20)){
           // console.log(today.getDate() , today.getHours() , today.getMinutes());
           // console.log(date.getDate() , date.getHours() , date.getMinutes());
        count++;
        create_match(match_data);
      }
  
    }
  
  load_bet_box();
  
  }
  
  async function get_all_members(){
  
    let config = {
      method : 'GET',
      headers : {
        'content-type' : 'application/json'
      }
    };
  
    let response = await fetch('/get_all_members' , config);
    response = await response.json();
  
    if(response['status'] == 1){
      create_members(response);
    }else if(response['status'] == 0){
      window.location.href = window.location.origin + '/login';
    }
  
  }
  
  async function get_bet_history(){
  
    let config = {
      method : 'GET',
      headers : {
        'content-type' : 'application/json'
      }
    }
    let res = await fetch('/get_bet_history' , config);
  
    res = await res.json();
  
    if(res['status'] === 0){
      window.location.href = window.location.origin + '/login';
    }else if(res['status'] === 1){
  
      // console.log(res['unsetteled_bets'] , res['settled_bets']);
  
      if(res['unsetteled_bets']){
        res['unsetteled_bets'].forEach((item, i) => {
          create_unsettled_bets(item);
        });
        listen_to_cancel_bet();
      }
      // console.log(res);
      if(res['setteled_bets']){
        res['setteled_bets'].forEach((item, i) => {
          create_settled_bets(item);
        });
      }
  
    }
  
  }
  
  async function get_payment() {
  
  
    let config = {
      method : 'GET',
      headers : {
        'content-type' : 'application/json'
      }
    }
  
    let res_data = await fetch('/get_payment_data' , config);
    res_data = await res_data.json();
    create_deposit(res_data['deposit']);
    create_withdrawal(res_data['withdrawal']);
    create_other_data(res_data['other']);
    // create_deposit(res_data['deposit']);
  }
  
  function checkBalance(bet_ammount){
    let balance = parseInt(select('.s_balance').innerText);
    return (bet_ammount <= balance)?  true :  false;
  }
  