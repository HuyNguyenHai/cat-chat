import {validationResult} from "express-validator/check";
import { json } from "body-parser";

let getLoginRegister = (req, res) => {
  res.render("auth/master");
};

let postRegister = (req, res) => {
  let errorArray = [];

  let validationErrors = validationResult(req);

  if(!validationErrors.isEmpty()){
    let errors = Object.values(validationErrors.mapped());
    errors.forEach(element => {
      errorArray.push(element);
    });
    
    console.log(errorArray);
  }
}

module.exports = {
  getLoginRegister: getLoginRegister,
  postRegister: postRegister
};
