import express from "express";
import { home, auth, user, contact, message } from "../controllers";
import { authValid, userValid, messageValid } from "../validation";
import passport from "passport";
import initPassportLocal from "./../controllers/passportController/local";

let router = express.Router();

initPassportLocal();

/**
 * @param app from exactly express module
 */

let initRoutes = app => {
  router.get("/", auth.checkLoggedIn, home.getHome);

  router.get("/login-register", auth.checkLoggedOut, auth.getLoginRegister);

  router.post("/register", auth.checkLoggedOut, authValid.register, auth.postRegister);

  router.get("/verify/:token", auth.checkLoggedOut, auth.verifyAccount);

  router.post("/login", auth.checkLoggedOut, passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login-register",
        successFlash: true,
        failureFlash: true
      }
    )
  );

  router.get("/logout", auth.checkLoggedIn, auth.getLogout);

  router.put("/user/update-avatar", auth.checkLoggedIn, user.updateAvatar);
  router.put("/user/update-info", auth.checkLoggedIn, userValid.updateInfo, user.updateUserInfo);
  router.put("/user/update-password", auth.checkLoggedIn, userValid.updatePassword, user.updatePassword);

  router.get("/contact/find-users/:keyword", auth.checkLoggedIn, contact.findUsersContact);
  router.post("/contact/add-new", auth.checkLoggedIn, contact.addNew);
  router.delete("/contact/remove-request-contact-sent", auth.checkLoggedIn, contact.removeRequestContactSent);
  router.delete("/contact/remove-request-contact-received", auth.checkLoggedIn, contact.removeRequestContactReceived);
  router.delete("/contact/remove-contact", auth.checkLoggedIn, contact.removeContact);
  router.put("/contact/accept-request-contact", auth.checkLoggedIn, contact.acceptRequestContact);
  //router.delete("/contact/accept-request-contact", auth.checkLoggedIn, contact.acceptRequestContact);

  router.post("/message/add-new-message", auth.checkLoggedIn, messageValid.checkMessageLength, message.addNewMessage);
  
  return app.use("/", router);
};

module.exports = initRoutes;
