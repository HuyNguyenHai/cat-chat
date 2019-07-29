import express from "express";
import {home, auth} from "../controllers";
import {authValid} from "../validation";
import passport from "passport";
import initPassportLocal from "./../controllers/passportController/local";

let router = express.Router();

initPassportLocal();

/**
 * @param app from exactly express module
 */

 let initRoutes = (app) => {
  router.get('/', home);
  
  router.get('/login-register', auth.getLoginRegister);

  router.post('/register',authValid.register, auth.postRegister);

  router.get('/verify/:token',auth.verifyAccount);

  router.post('/login',passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login-register",
    successFlash: true,
    failureFlash: true
  }));

  return app.use("/", router);
 }

 module.exports = initRoutes;