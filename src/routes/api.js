import express from "express";
import { home, auth, user, contact } from "../controllers";
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

  router.get("/auth/facebook", passport.authenticate("facebook", {
      scope: ["email"]
    })
  );

  router.get("/auth/facebook/callback", passport.authenticate("facebook", {
      successRedirect: "/",
      failureRedirect: "/login-register"
    })
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
  
  return app.use("/", router);
};

module.exports = initRoutes;
