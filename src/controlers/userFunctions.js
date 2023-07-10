const {User , Bet , Deposit , Withdrawal , Other , RandomPercentage} = require('../db');
const nodemailer = require("nodemailer");
const fast2sms = require('fast-two-sms');
const fetch = require('node-fetch');
const crypto = require('crypto');

// enter transaction id > return user details and deposit details > click submit > change the user details and then change parent details > return the details of updated user and parent ;

class user_functions {

  // league type 0 = virtual || league type 1 = league
  static get_otp = async (req ,res)=>{
    let  number = getrandom();
    let body = req.body;
    let user_phone ,stat;

    if(!body['contact'] || body['contact'] == undefined){
      return res.send({status : 'something went wrong'});
    }else{
      if(body['contact'].length === 10){
        user_phone = body['contact'];
      }else{
        return res.send({status : 'invalid number'});
      }
    }

      let message = `Your OTP for chesla fb verification is ${number}`
      let options = {
        authorization:
          "X82I7elMQ6if9yR03EcJpqOU1BzGnbdxuVvTLAmoN4tahgHYZsQVzAOpHZa6GvR7EXuBjThL1bfnD9dM",
        message:message,
        numbers: [user_phone],
      };

        stat = await fast2sms.sendMessage(options);
        
        if(stat['return'] === true){
          req.session.otp = number ;
          return res.send({status : 1})
        }else{
          return res.send({status : 0});
        }

  }

  static place_bet = async (req , res)=>{

    const USER_ID = req.session.user_id;
    const INVITATION_CODE = req.session.inv;

    let bet_exist = await Bet.findOne(
      {
        inv : INVITATION_CODE,
        leagueId : req.body.league_id,
      }
    );

    let time_left = await check_date( req.body.date , req.body.time);

    if(time_left && !bet_exist || bet_exist == 'undefined'){

      let user_found = await User.findOne({inv : INVITATION_CODE});
      let user_balance = parseFloat(user_found['Ammount']);

      let data = {
        phone : user_found['phone'],
        inv : INVITATION_CODE,
        parent : user_found['parent'],
        bAmmount : parseFloat(req.body.ammount),
        leagueId : parseInt(req.body.league_id),
        league : req.body.league,
        team_a :  req.body.team_a,
        team_b : req.body.team_b,
        scoreDetails : [
          {
            first : req.body.first,
            second: req.body.second
          }
        ],
        final_score : [
          {
            first : -1,
            second : -1
          }
        ],
        date : req.body.date,
        time : req.body.time,
        profit : req.body.profit,
        league_type : req.body.l_type
      }

      let bet_amount = parseFloat(req.body.ammount);
      let deduct_amount = bet_amount - (bet_amount*2);


      if(user_balance >= data['bAmmount']){

        if(parseFloat(data['bAmmount']) >= 1000){

          if(await newBet(data)){

            await User.findOneAndUpdate( {_id : USER_ID} , {$inc : {betPlayed : 1 , Ammount : deduct_amount} });

            let body = `
            inv    : ${INVITATION_CODE} \n
            amount : ${bet_amount} \n
            leagueID : ${data['leagueId']}
            score  : ${data['scoreDetails'][0]['first']}-${data['scoreDetails'][0]['second']} \n
            `
            if(data['league'])
            SENDMAIL(data['league'] , body);

            return  res.send({'status' : 1});
          }else{
            return res.send({'status' : 0});
          }

        }else{
          return res.send({status : 5})
        }

      }else{
        return res.send({status : 4})
      }

    }else{

      if(bet_exist){
        return res.send({status : 2});
      }else if(!time_left){
        return res.send({status : 3});
      }else{
        return res.send({status : 0});
      }

    }

  }

  static sign_new_user = async (req , res)=>{

    res.clearCookie('id');
    let nDate = new Date().toLocaleString('en-US' , {
      timeZone : 'Asia/Calcutta'
    });
    let today = new Date(nDate);
    let parsed_date = today.getDate() +'/'+ (today.getMonth()+1) +'/'+ today.getFullYear();

    let body = req.body;

    let inv = await generate_inv_code();

    let user_found = await User.findOne({user : body.name});
    let phone_found = await User.findOne({phone : body.contact});
    let avatar = Math.floor(Math.random()*10);
    avatar = (avatar === 0)? 1 : avatar;
    let saved_otp = req.session.otp;
    
    if(saved_otp && saved_otp !== undefined){
       if(parseInt(saved_otp) !== parseInt(body.otp)){
          return res.send({status : "invalid OTP"});
       }
    }

    let data = {
      user : body.name,
      password : body.password,
      inv : inv,
      parent : body.invitation_code,
      phone : body.contact,
      avatar : avatar
    }

    let newUser = new User(data);

    if(body.invitation_code !== 0 && !user_found && !phone_found){

      let parent = await User.findOne({inv : body.invitation_code});

      if(parent){

        let is_created = await createUser(newUser);

        if(is_created){

          await increment_parent_mem(body.invitation_code);

          req.session.user_id = is_created['_id'].valueOf();
          req.session.inv = is_created['inv'];
          
          Other.create({
             date : parsed_date,
             Ammount : 30,
             inv : is_created['inv']
          });

          return res.send({status : 1});

        }else{
          return res.send({status : 0})
        }

      }else{
        return res.send({status : 0})
      }


    }else if(body.invitation_code == 0 && !user_found && !phone_found){

      let new_user_created = await createUser(newUser);

      if(new_user_created){

        req.session.user_id = new_user_created['_id'].valueOf();
        req.session.inv = new_user_created['inv'];
        
        Other.create({
          date : parsed_date,
          Ammount : 30,
          inv : new_user_created['inv']
       });

        return res.send({status : 1});

      }else{
        return res.send({status : 0});
      }

    }else{
      if(user_found){
        return res.send({status : 404});
      }else if(phone_found){
        return res.send({status : 101})
      }else{
        return res.send({status : 0})
      }
    }

  }

  static login_user = async (req , res)=>{
   
    let data = req.body;
    let db_user = await User.findOne({user : data.name});

    if(!data.pass || data.pass == 'undefined'){
      return res.send({status : 0});
    }

    if(
      db_user !== null &&
      db_user.password.localeCompare(data.pass) == 0
    ){

      req.session.user_id = db_user['_id'].valueOf();
      req.session.inv = db_user['inv'];
      return res.send({status : 1});

    }else{
      return res.send({status : 0});
    }

  }

  static delete_bet = async (req , res)=>{

     let INVITATION_CODE = req.session.inv;
     let id = parseInt(req.body.value);

     let bet = await Bet.findOne({leagueId : id , inv : INVITATION_CODE});

     if(bet){

       let valid_date = await check_date(bet['date'] , bet['time']);
      
       if(valid_date === true){
         let is_deleted  = await Bet.findOneAndDelete({leagueId : id , inv : INVITATION_CODE});
          
         if(is_deleted){

          let body = `
              INVITATION_CODE : ${INVITATION_CODE} \n
              BET AMOUNT      : ${bet.bAmmount} \n
              LEAGUE ID       : ${id} \n
              SCORE           : ${is_deleted['scoreDetails'][0]['first']}-${is_deleted['scoreDetails'][0]['second']} \n
             `
          SENDMAIL('BET DELETE' , body);

          await User.findOneAndUpdate({inv : INVITATION_CODE} , {$inc : {
            Ammount : parseFloat(bet.bAmmount),
            betPlayed : -1
             }
          })

          // return res.send({status : 1});
          return res.send({status : 1});

         }else{
          return res.send({status : 0});
         }

       }else{
         // if the time limit exeeded;
        return res.send({status : 2})
       }

     }else{
       res.send({status : 0})
     }



  }

  static deposited = async (req,res)=>{

    let {amount , transactioin_id} = req.body;
    let INVITATION_CODE = parseInt(req.session.inv);
    let trans_id_exist = await Deposit.findOne({transactioin_id : transactioin_id});

    if(!trans_id_exist){
      if(amount && transactioin_id){

      amount = parseFloat(amount);
      const nDate = new Date().toLocaleString('en-US', {
          timeZone: 'Asia/Calcutta'
      });
      let today = new Date(nDate);

      let date = `${today.getDate()}/${(today.getMonth()+1)}/${today.getFullYear()}`;


      let data = {
        date : date,
        Ammount : amount,
        inv : INVITATION_CODE,
        transactioin_id : transactioin_id,
        status : 0
      }

      if(await newDeposit(data)){

        let body = `
          DATE : ${date} \n
          INVITATION_CODE : ${data.inv} \n
          AMOUNT :  ${data.Ammount} \n
          TRANSACTION_ID : ${data.transactioin_id}
          `
        SENDMAIL('DEPOSIT' , body);

        res.send({status : 1});
      
      }else{
        res.send({status : 0});
      }

      }else{
      return res.send({status : 2}) // something went wrong with amount or the transaction id;
    }
    }else{
      return res.send({status : 3});
    }

  }

  static withdrawal = async (req,res)=>{

    let INVITATION_CODE = parseInt(req.session.inv);
    let USER_ID = req.session.user_id;
    let {withdrawal_code , amount} = req.body;
    const nDate = new Date().toLocaleString('en-US', {
             timeZone: 'Asia/Calcutta'
          });
    let today = new Date(nDate);
    let transactioin_id = crypto.randomBytes(16).toString("hex");
    transactioin_id = transactioin_id.slice(0 , 6);

    let U_details = await User.findOne({inv : INVITATION_CODE} , {withdrawalC : 1 , day_withdrawal : 1 , BankDetails : 1 , betPlayed : 1 , Ammount : 1 , vipLevel : 1});
    
    let unsettled_withdraws = await Withdrawal.findOne({inv : INVITATION_CODE , status : 0}).count() ;

    let w_details = parseInt(U_details['withdrawalC']);
    let last_withdrawal = parseInt(U_details['day_withdrawal']);
    let bets_played = parseInt(U_details['betPlayed']);
    
    if(U_details){
      if(U_details['vipLevel'] !== undefined){
        let vip_level = parseInt(U_details['vipLevel']);
      
        if(vip_level === 0 && amount < 200 || vip_level === 0 && amount > 500){
          return res.send({status : "Your vip level is 0 your withdrawal limit is 200 - 500"});
        }else if(vip_level === 1 && amount < 200 || vip_level === 1 && amount > 1000){
          return res.send({status : "Your vip level is 1 your withdrawal limit is 200 - 1000"});
        }else if(vip_level === 2 && amount < 200 || vip_level === 2 && amount > 3000){
          return res.send({status : "Your vip level is 2 your withdrawal limit is 200 - 3000"});
        }
        else if(vip_level === 3 && amount < 200 || vip_level === 3 && amount > 8000){
          return res.send({status : "Your vip level is 3 your withdrawal limit is 200 - 8000"});
        }
        else if(vip_level === 4 && amount < 200 || vip_level === 4 && amount > 27000){
          return res.send({status : "Your vip level is 4 your withdrawal limit is 200 - 27000"});
        }else if(vip_level === 5 && amount < 200 || vip_level === 5 && amount > 51000){
          return res.send({status : "Your vip level is 5 your withdrawal limit is 200 - 51000"});
        }

      }

    }else{
      return res.send({status : "something went wrong"});
    }


    if(unsettled_withdraws > 0){
      return res.send({status : "You already have unsettled withdrawal's"});
    }

    if(w_details == 0 || withdrawal_code !== w_details){
      return res.send({status : 'enter a VALID withdrawal code first'});//enter withdrawal code first
    }

    if( U_details['BankDetails'] == 'undefined' || !U_details['BankDetails'].length || !U_details['BankDetails'][0] || !U_details['BankDetails'][0]['Name']){
      return res.send({status : 'You dont have a bank account . '});
    }

    amount = parseFloat(amount);
    // check wethere user has the required balance or not
    if(amount > parseFloat(U_details['Ammount'])){
      return res.send({status : 'YOU DONT HAVE ENOUGH BALANCE'});
    }

    if(bets_played >= 6){
       if(last_withdrawal !== today.getDate() || last_withdrawal == 0){

      if(amount && transactioin_id && withdrawal_code){


      let date = `${today.getDate()}/${(today.getMonth()+1)}/${today.getFullYear()}`;


      let data = {
        date : date,
        Ammount : amount,
        inv : INVITATION_CODE,
        transactioin_id : transactioin_id,
        status : 0
      }

      if(await newWithdrawal(data)){

        let deduct_amount = parseFloat(data['Ammount'] - (2*data['Ammount']))
        // deduct the amount from the user and increment the withdrawal amount and withdrawal count;
        await User.findOneAndUpdate({_id : USER_ID} , {
          $inc : {Ammount : deduct_amount ,
                  withdrawalAmmount : parseFloat(data['Ammount']),
                  Withdrawals : 1
                 } ,
          day_withdrawal : today.getDate()
        });

        let body = `
          INVITATION_CODE  : ${INVITATION_CODE} \n
          BANK ACCOUNT NO. : ${U_details['BankDetails'][0]['AcNumber']} \n
          USER NAME        : ${U_details['BankDetails'][0]['Name']} \n
          IFSC             : ${U_details['BankDetails'][0]['Ifsc']} \n
          AMOUNT           : ${amount}\n
          AMOUNT - 10% : ${amount - parseFloat((amount/10).toFixed(3)) } \n
          TRANSACTION ID : ${data['transactioin_id']}
          DATE : ${date} \n
        `

        SENDMAIL('WITHDRAWAL' , body);

        res.send({status : 1});

      }else{
        res.send({status : 0});
      }

      }else{
      return res.send({status : 'something went wrong with amount.'}) // something went wrong with amount or the transaction id;
    }
       }else{
      return res.send({status : 'you have reached you daily withdrawal limit.'}); //transaction id already exists;
    }
    }else{
      return res.send({status : 'PLAY MINIMUM OF 6 BETS !! '});
    }

  }

  static add_bank_details = async (req, res)=>{

    let USER_ID = req.session.user_id;

    let the_user = await User.findOne({_id : USER_ID})

    if(the_user['bankDetailsAdded'] === false){

      let {name , ac_number , ifsc} = req.body;

      if(!name || !ac_number || !ifsc){
        return res.send({status : 3});
      }else{
        ac_number = ac_number
        let updated = await User.findOneAndUpdate( {_id : USER_ID} , {
          BankDetails : {
            Name : name,
            AcNumber : ac_number,
            Ifsc : ifsc
          } , bankDetailsAdded : true
        } );

        if(updated){
          return res.send({status : 1});
        }else{
          return res.send({status : 0})
        }
      }

    }else{

      return res.send({status : 2})//details already exist;

    }

  }

  static withdrawal_code = async (req,res)=>{
    let USER_ID =  req.session.user_id;
     let {previous_code , new_code} = req.body;

     if(previous_code == 'undefined' || !new_code){
       return res.send({status : 'try again with new withdrawal code'})//enter a valid data;
     }else{

        let user_data = await User.findOne({_id : USER_ID});

        if(previous_code == 0 && user_data['withdrawalC'] == 0){
          //update new code
          await User.findOneAndUpdate({_id : USER_ID} , {withdrawalC : parseInt(new_code)});
          return res.send({status : 1});

        }else if(previous_code == 0 && user_data['withdrawalC'] !== 0){
          // send you already have a code enter it first;
          return res.send({status : 'you already have a withdrawal code'});
        }else if(previous_code !== 0 && user_data['withdrawalC'] == 0){
          //you dont have data in db;
          return res.send({status : 'you dont have a stored withdrawal code'})//you dont have some data in db
        }else if(previous_code !== 0 && user_data['withdrawalC'] !== 0){
          // check validation
          if(parseInt(previous_code) == parseInt(user_data['withdrawalC'])){
              await User.findOneAndUpdate({_id : USER_ID} , {withdrawalC : parseInt(new_code)})
              res.send({status : 1});
          }else{
            return res.send({status : 'wrong previous code'})//wrong previous code
          }

        }else{
          return res.send({status : 'something went wrong'})//something went wrong
        }

     }
  }

  static change_password = async (req,res)=>{

     let USER_ID =  req.session.user_id;
     let {previous_code , new_code} = req.body;

     if(!previous_code || !new_code){
       return res.send({status : 3})//enter a valid data;
     }else{

        let user_data = await User.findOne({_id : USER_ID});

        if( previous_code === user_data['password']){
          await User.findOneAndUpdate({_id : USER_ID} , {password : new_code});
          return res.send({status : 1});
        }else{
          return res.send({status : "previous password not matched contact CS . "});
        }

     }
  }

  static usdt = async (req,res)=>{

    let {amount} = req.body;

    let INVITATION_CODE = parseInt(req.session.inv);
    if(amount){

      amount = parseFloat(amount);
      const nDate = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Calcutta'
  });
  let today = new Date(nDate);

      let date = `${today.getDate()}/${(today.getMonth()+1)}/${today.getFullYear()}`;

      let body = `
      USDT DEPOSIT \n
      DATE : ${date} \n
      INVITATION_CODE : ${INVITATION_CODE} \n
      AMOUNT :  ${amount} \n
      `
      SENDMAIL('DEPOSIT' , body);
      return res.send({status : 1});
    }else{
      return res.send({status : 0})
    }
  }

  //-------------------------new code----------------------------
  
  static get_live_bets = async (req,res)=>{
    
    let count = 0;
    // getting live bets 
    const nDate = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Calcutta'
      });
    let today = new Date(nDate);
  
    let date = (today.getDate() < 10)? '0'+today.getDate() : today.getDate();
    let month = (today.getMonth() < 9)? '0'+((today.getMonth()+1)) : (today.getMonth()+1);
    let parsed_date = date+'/'+month+'/'+today.getFullYear();

     let url = `https://v3.football.api-sports.io/fixtures/?date=${today.getFullYear()}-${month}-${date}&status=NS`;
     // let url = `https://v3.football.api-sports.io/fixtures/?date=2022-10-12&status=NS`;
  
     let response =
     await fetch(url, {
      "method": "GET",
      "headers": {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "021ae6685ec46e47ec83f8848ac1d168"
            // "x-rapidapi-key": "823296afa77a4989062591abc46178ee"
        }
     })
  
    let matches = await response.json();

    //getting previous percentages 
    
    let previous_percentages = await RandomPercentage.find({date : parsed_date});
    
    if(previous_percentages == undefined || !previous_percentages){
      //  iterate live bets and call make new percentages and save it in db

      for(let item of matches['response']){
        
        if(count > 100 ){
           break;
        } 

        
      let match_date = new Date(item['fixture']['date']).toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
        });
      match_date = new Date(match_date);
      
        let parsed_match_date = match_date.getDate()+'/'+match_date.getMonth()+1+'/'+match_date.getFullYear();
        
        let match_data = {
          date : parsed_match_date,
          fixture_id : item['fixture']['id'],
          team_a : item['teams']['home']['name'],
          team_b : item['teams']['away']['name'],
          league : item['league']['name']
        };
    
        if(today.getDate() == match_date.getDate() && match_date.getHours() > today.getHours() ||
           today.getDate() == match_date.getDate() && match_date.getHours() == today.getHours() && match_date.getMinutes() > (today.getMinutes() + 20)){
    
          count++;

          create_random_percents(match_data);
        
        }

      }

    }

    // if some previous percentages exist or new were created then recheck them ;
    let new_previous_percentages = await RandomPercentage.find({date : parsed_date});

    // creating key value pairs of these percentage;
    let percent_pairs = {};

    for(let percentages of new_previous_percentages){
      percent_pairs[percentages['league']] = percentages['percentage'];
    }

    // iterating live bets and rechecking them
    let fault_found = false;
    count = 0;

    for(let item of matches['response']){
    
      if(count > 100){
        count++;
        break;
      }
  
      
      let match_date = new Date(item['fixture']['date']).toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
        });
      match_date = new Date(match_date);
  
      let match_data = {
        date : parsed_date,
        fixture_id : item['fixture']['id'],
        team_a : item['teams']['home']['name'],
        team_b : item['teams']['away']['name'],
        league : item['league']['name']
      };
  
      if(today.getDate() == match_date.getDate() && match_date.getHours() > today.getHours() ||
         today.getDate() == match_date.getDate() && match_date.getHours() == today.getHours() && match_date.getMinutes() > (today.getMinutes() + 20)){
  
        count++;
        
        if(match_data['fixture_id'] in percent_pairs !== true){
          fault_found = true;
          create_random_percents(match_data);
        }

      }
  
    } 
    
    if(fault_found){
      let final_percentages = await RandomPercentage.find({date : date});
      for(let percentages of new_previous_percentages){
        percent_pairs[percentages['league']] = percentages['percentage'];
      } 
    }
     
    let response_to_send = [];
    count = 0;
    for(let item of matches['response']){
    
      if(count > 100){
        count++;
        break;
      }
  
      let match_date = new Date(item['fixture']['date']).toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
        });
      match_date = new Date(match_date);
      
      let match_data = {
        date : parsed_date,
        raw_date : match_date,
        fixture_id : item['fixture']['id'],
        team_a : item['teams']['home']['name'],
        team_b : item['teams']['away']['name'],
        league : item['league']['name'],
        percentage : percent_pairs[item['fixture']['id']]
      };
  
      if(today.getDate() == match_date.getDate() && match_date.getHours() > today.getHours() ||
         today.getDate() == match_date.getDate() && match_date.getHours() == today.getHours() && match_date.getMinutes() > (today.getMinutes() + 20)){
  
        count++;
        response_to_send.push(match_data);      
      }
  
    }

    return res.status(200).send(response_to_send);

  }

}

module.exports = user_functions;

// -------------------------------------------new code ----------------------------
// generating random values 

function randomPercent(){
  let percents = [];
  for(let i = 0 ; i < 17; i++ ){

    let random = (Math.random()*5).toFixed(2);
    percents.push(random);
  
  }
  return percents;
}

// create random percentage data in database;

async function create_random_percents(match_data){
   
  let response = await RandomPercentage.create({
    league : match_data.fixture_id,
    percentage : randomPercent(),
    date : match_data['date']
  })
  
  return response;

}
// ------------------------------------new code ends --------------------------------------

// this function saves the new bet user has placed;
async function newBet(data){

  let res = await Bet.create(data);
  let what_happened = (!res)? false : true;
  return what_happened;

}

// this will create a new deposit form at the database;
async function newDeposit(data){

  let res = await Deposit.create(data);
  let what_happened = (!res)? false : true;
  return what_happened;
}

// when a user initiates a new withdrawal this will save teh data to the database
async function newWithdrawal(data){

  let res = await Withdrawal.create(data);
  let what_happened = (!res)? false : true;
  return what_happened;
}

// it will increment the member of the user who has invited this new user while sign_in;
async function increment_parent_mem(inv , prev_members){
  let x = await User.updateOne({inv : inv} , {$inc : {
    members : 1
  }})
  return;
}

 // it will check the date wethere its valid to place bet and match has not been started;
async function check_date(date , time ){


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

  // console.log(minutes_now , 'without');
  minutes_now += 5;
  if(minutes_now >= 60 ){
    minutes_now = minutes_now - 60;
    hours_now += 1;
  }

  let valid_date = (parseInt(today.getDate()) === m_date);
  let valid_hour = (hours_now < m_hours);
  let valid_minutes = ( minutes_now < m_minutes );
  let equal_hours = (hours_now === m_hours);
  // console.log(m_date , today.getDate(), m_hours , hours_now , minutes_now , m_minutes);
  // console.log(today);

  if(valid_date && valid_hour || valid_date && equal_hours && valid_minutes){
    return true;
  }

  return false;

}

// after signup it will create a new user at the database;
async function createUser(data){

  let res = await User.create(data);

  return res;

};

// this function will create the new invitation code for new users when signed in ;
async function generate_inv_code(){

  let code_exist = false;
  let inv_code = parseInt(Math.floor(Math.random()*10000));

  let res = await User.findOne({inv : inv_code});

  // if found then code_exist = true;

  code_exist = (res)? true : false;

  if(inv_code < 1000 || code_exist){
    return generate_inv_code();
  }

  return inv_code;

}

// mail sender
async function SENDMAIL(subject , body){

  let to = '';

  switch (subject) {

    case 'WITHDRAWAL':
      to = 'rockyraj0969@gmail.com';
      break;
    case 'DEPOSIT':
      to = 'jyotikumari63421@gmail.com';
      break;
    case 'BET DELETE':
      to = 'simrankumari6343@gmail.com';
      break;
    case 'VIRTUAL':
      to = 'manojkumar757320@gmail.com';
      break;
    default:
     to = 'amitram070651@gmail.com';
  }
   // console.log(to , subject);
  let transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
      user : 'vkv9162871357@gmail.com',
      pass : 'kahsizmojovvmsio'
    }
  })

  let mailOptions = {
    from : 'vkv9162871357@gmail.com',
    to : to,
    subject : subject,
    text : body
  }

  transporter.sendMail(mailOptions , async(err , info)=>{
    if(err){
      console.log(err);
    }
  })
}

// getting randome otp
function getrandom(){
  let x = Math.ceil(Math.random()*10000);
  if(x < 1000){
    getrandom();
  }else{
    return x;
  }
}
