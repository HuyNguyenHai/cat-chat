import express from "express";
import { home, auth, user } from "../controllers";
import { authValid, userValid } from "../validation";
import passport from "passport";
import initPassportLocal from "./../controllers/passportController/local";
import initPassportFacebook from "./../controllers/passportController/facebook";

let router = express.Router();

initPassportLocal();
initPassportFacebook();

/**
 * @param app from exactly express module
 */

let initRoutes = app => {
  router.get("/", auth.checkLoggedIn, home);

  router.get("/login-register", auth.checkLoggedOut, auth.getLoginRegister);

  router.post(
    "/register",
    auth.checkLoggedOut,
    authValid.register,
    auth.postRegister
  );

  router.get("/verify/:token", auth.checkLoggedOut, auth.verifyAccount);

  router.post(
    "/login",
    auth.checkLoggedOut,
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login-register",
      successFlash: true,
      failureFlash: true
    })
  );

  router.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["email"]
    })
  );

  router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/",
      failureRedirect: "/login-register"
    })
  );

  router.get("/logout", auth.checkLoggedIn, auth.getLogout);

  router.put("/user/update-avatar", auth.checkLoggedIn, user.updateAvatar);

  router.put("/user/update-info", auth.checkLoggedIn, userValid.update, user.updateUserInfo);

  return app.use("/", router);
};

module.exports = initRoutes;
