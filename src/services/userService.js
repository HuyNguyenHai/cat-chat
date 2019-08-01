import UserModel from "./../models/userModel";
import bcrypt from "bcrypt";

let saltRounds = 7;

let updateUser = (id, item) => {
  return UserModel.updateUser(id, item);
};

let updatePassword = (id, password) => {
  let salt = bcrypt.genSaltSync(saltRounds);
  let newPassword = bcrypt.hashSync(password, salt)
  return UserModel.updatePassword(id, newPassword);
}

module.exports = {
  updateUser: updateUser,
  updatePassword: updatePassword
}