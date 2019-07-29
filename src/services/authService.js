import UserModel from "./../models/userModel";
import bcrypt from "bcrypt";
import uuidv4 from "uuid/v4";
import {transErrors, transSuccess} from "./../../lang/vi";

let saltRounds = 7;

let register = (email, gender, password) => {
  return new Promise(async (resolve, rejects) => {
    let userByEmail = await UserModel.findByEmail(email);
    if(userByEmail){
      rejects(transErrors.account_in_use);
    }

    let salt = bcrypt.genSaltSync(saltRounds);

    let userItem = {
      username: email.split("@")[0],
      gender: gender,
      local: {
        email: email,
        password: bcrypt.hashSync(password, salt),
        verifyToken: uuidv4()
      }
    }

    let user = await UserModel.createNew(userItem);

    resolve(transSuccess.userCreated(user.local.email));
  });
};

module.exports = {
  register: register
}