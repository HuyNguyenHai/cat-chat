import UserModel from "./../models/userModel";
import bcrypt from "bcrypt";
import uuidv4 from "uuid/v4";
import {transErrors, transSuccess, transMail} from "../../lang/vi";
import sendMail from "./../config/mailer";

let saltRounds = 7;

let register = (email, gender, password, protocol, host) => {
  return new Promise(async (resolve, rejects) => {
    let userByEmail = await UserModel.findByEmail(email);
    if(userByEmail){
      if(userByEmail.deletedAt != null){
        rejects(transErrors.account_removed);
      }
      if(!userByEmail.local.isActive){
        rejects(transErrors.account_not_active);
      }
      rejects(transErrors.account_in_use);
    }

    let salt = bcrypt.genSaltSync(saltRounds);

    let userItem = {
      user: email.split("@")[0],
      gender: gender,
      local: {
        email: email,
        password: bcrypt.hashSync(password, salt),
        verify: uuidv4()
      }
    };

    let user = await UserModel.createNew(userItem);
    let linkVerify = `${protocol}://${host}/verify/${user.local.verify}`;

    //Send Email to Active user's account
    sendMail(email, transMail.subject, transMail.template(linkVerify))
      .then(success => {

      })
      .catch(async error => {
        //remove user
        await UserModel.removeById(user._id);
        console.log(error);
        rejects(transMail.send_email_fail);
      });
    resolve(transSuccess.userCreated(user.local.email));
  });
};

let verifyAccount = (token) => {
  return new Promise(async (resolve, reject) => {
    let userByToken = await UserModel.findByToken(token);
    if(!userByToken){
      reject(transErrors.token_undefined);
    }
    await UserModel.verify(token);
    resolve(transSuccess.account_active);
  });
}  

module.exports = {
  register: register,
  verifyAccount: verifyAccount
}