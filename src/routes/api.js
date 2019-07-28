import express from "express";
import {home, auth} from "../controllers";

let router = express.Router();

/**
 * @param app from exactly express module
 */

 let initRoutes = (app) => {
  router.get('/', home);
  
  router.get('/login', auth.getLoginRegister);

  return app.use("/", router);
 }

 module.exports = initRoutes;