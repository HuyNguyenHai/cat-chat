import {validationResult} from "express-validator/check";
import {auth} from "./../services";

let getLoginRegister = (req, res) => {
  res.render("auth/master", {
    errors: req.flash("errors"),
    successes: req.flash("successes")
  });
};

let postRegister = async (req, res) => {
  let errorArray = [];
  let successArray = [];

  let validationErrors = validationResult(req);

  if(!validationErrors.isEmpty()){
    let errors = Object.values(validationErrors.mapped());
    errors.forEach(element => {
      errorArray.push(element.msg);
    });
    
    req.flash("errors", errorArray);
    return res.redirect('/login-register');
  }
  try {
    let createUserSuccess = await auth.register(req.body.email, req.body.gender,req.body.password, req.protocol, req.get("host"));

    successArray.push(createUserSuccess);
    req.flash("successes", successArray);
    return res.redirect('/login-register');
  } catch (err) {
      errorArray.push(err);
      req.flash("errors", errorArray); 
      return res.redirect('/login-register');
  }
}

let verifyAccount = async (req, res) => {
  let errorArray = [];
  let successArray = [];

  try {
    let verifySuccess = await auth.verifyAccount(req.params.token);
    successArray.push(verifySuccess);
    req.flash("successes", successArray);
    return res.redirect('/login-register');
  } catch (error) {
      errorArray.push(error);
      req.flash("errors", errorArray); 
      return res.redirect('/login-register');
  }
}

module.exports = {
  getLoginRegister: getLoginRegister,
  postRegister: postRegister,
  verifyAccount: verifyAccount
};
