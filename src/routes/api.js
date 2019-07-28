import express from "express";
import {home, auth} from "../controllers";
import {authValid} from "../validation";

let router = express.Router();

/**
 * @param app from exactly express module
 */

 let initRoutes = (app) => {
  router.get('/', home);
  
  router.get('/login-register', auth.getLoginRegister);

  router.post('/register',authValid.register, auth.postRegister);

  return app.use("/", router);
 }

 module.exports = initRoutes;