import passport from "passport";
import passportLocal from "passport-local";
import {transErrors, transSuccess} from "./../../../lang/vi";
import UserModel from "./../../models/userModel";

let LocalStrategy = passportLocal.Strategy;

/**
 * Valid user account type: local
 */

let initPassportLocal = () => {
  passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, async (req, email, password, done) => {
    try {
        let user = await UserModel.findByEmail(email);
        if(!user){
          return done(null, false, req.flash("errors", transErrors.login_fail));
        }
        if(!user.local.isActive){
          return done(null, false, req.flash("errors", transErrors.account_not_active));
        }

        let checkPassword = await user.comparePassword(password);

        if(!checkPassword){
          return done(null, false, req.flash("errors", transErrors.login_fail));
        }

        return done(null, user, req.flash("successes", transSuccess.loginSuccess(user.username)));
    } catch (error) {
      console.log(error);
      return done(null, false, req.flash("errors", transErrors.server_error));
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    UserModel.findUserById(id)
      .then(user => {
        return done(null, user);
      })
      .catch(err => {
        return done(err, user)
      })
  });
}

module.exports = initPassportLocal;