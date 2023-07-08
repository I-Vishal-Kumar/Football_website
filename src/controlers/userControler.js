const {User , Bet , Deposit , Withdrawal , Other} = require('../db');

class user_data {

  static get_data = async(req , res)=>{

    if(!req.session.user_id || !req.session.inv){
       return res.send({status : 2});
    }else{

      const USER_ID = req.session.user_id;
      let data = {};

      try {

        let db_data = await User.findOne({ _id : USER_ID});

        if( Object.keys(db_data).length === 0 || !db_data){
          return res.send({status : 2});
        }

        data = {
          name : db_data.user,
          inv  : db_data.inv,
          members : db_data.members,
          balance : db_data.Ammount,
          BankDetails : db_data.BankDetails,
          RebadeBonus : db_data.RebadeBonus,
          WithdrawalDetails : db_data.WithdrawalDetails,
          phone : db_data.phone,
          betPlayed : db_data.betPlayed,
          profit : db_data.profit,
          vipLevel : db_data.vipLevel,
          max_deposit : db_data.max_deposit,
          promotion_bonus : db_data.promotion_bonus,
          avatar : db_data.avatar,
          status : 1

        };

         return res.send(data);

      } catch (e) {

        return res.send({status : 2});

      }

    }
  }

  static get_payment_data = async(req , res)=>{
    let data;
    const INVITATION_CODE = req.session.inv;

    let withdrawal = await Withdrawal.find({ inv : INVITATION_CODE});
    let deposit = await Deposit.find({ inv : INVITATION_CODE });
    let other = await Other.find({inv : INVITATION_CODE});
    data = {withdrawal , deposit , other};

    return res.send(data);

  }

  static get_members_data = async(req , res)=>{
    let data = {};
    const INVITATION_CODE = req.session.inv;

      let direct_members = await User.find(
        {parent : INVITATION_CODE},
        {_id : 0 , user : 1 , members : 1 , Ammount : 1 ,  Withdrawals : 1 , withdrawalAmmount : 1   , betPlayed : 1 , inv : 1 , deposit : 1 , profit : 1}
      );
      let level2_user = [];
      let level3_user = [];
      let level4_user = [];
      let level5_user = [];
      let level6_user = [];


      for(let i = 0 ; i< direct_members.length; i++){

       let level2 =   await User.find(
          {parent : direct_members[i].inv},
          {_id : 0 , user : 1 , members : 1 , Ammount : 1 , Withdrawals : 1 , withdrawalAmmount : 1 , betPlayed : 1 ,  inv : 1, deposit : 1 , profit : 1 , }
        );
        level2_user.push(level2);

        for(let j = 0 ; j < level2.length; j++){
          let level3 =  await User.find(
             {parent : level2[j].inv},
             {_id : 0 , user : 1 , members : 1 , Ammount : 1 , Withdrawals : 1 , withdrawalAmmount : 1  , betPlayed : 1 ,  inv : 1, deposit : 1 , profit : 1}
           );
           level3_user.push(level3);
           
           for(let j = 0 ; j < level3.length; j++){
             let level4 =  await User.find(
             {parent : level3[j].inv},
             {_id : 0 , user : 1 , members : 1 , Ammount : 1 , Withdrawals : 1 , withdrawalAmmount : 1  , betPlayed : 1 ,  inv : 1, deposit : 1 , profit : 1}
            );
             level4_user.push(level4);
             
             for(let j = 0 ; j < level4.length; j++){
               let level5 =  await User.find(
                {parent : level4[j].inv},
                {_id : 0 , user : 1 , members : 1 , Ammount : 1 , Withdrawals : 1 , withdrawalAmmount : 1  , betPlayed : 1 ,  inv : 1, deposit : 1 , profit : 1}
              );
              level5_user.push(level5);
              for(let j = 0 ; j < level5.length; j++){
                 let level6 =  await User.find(
                 {parent : level5[j].inv},
                 {_id : 0 , user : 1 , members : 1 , Ammount : 1 , Withdrawals : 1 , withdrawalAmmount : 1  , betPlayed : 1 ,  inv : 1, deposit : 1 , profit : 1}
                 );
                 level6_user.push(level6);
                 }
             }
          }
        }

      }

      data  = {status : 1 ,direct_members ,  level2_user , level3_user , level4_user , level5_user , level6_user};

      return res.send(data);

  }

  static get_bet_data = async(req , res)=>{

    const INVITATION_CODE = req.session.inv;

    let setteled_bets = 
    await Bet.find({inv : INVITATION_CODE , settled : true} , {_id : 0 , team_a : 1 , team_b : 1 , scoreDetails : 1 , final_score : 1 , date : 1 , profit : 1 , time : 1 , league : 1  , bAmmount : 1, leagueId : 1});

    let unsetteled_bets = 
    await Bet.find({inv : INVITATION_CODE , settled : false} , {_id : 0 , team_a : 1 , team_b : 1 , scoreDetails : 1  , date : 1 , profit : 1 , time : 1 , league : 1 , bAmmount : 1 , leagueId : 1});

    let data = {setteled_bets,unsetteled_bets , status : 1};

    return res.send(data);

  }

}

module.exports = user_data;
