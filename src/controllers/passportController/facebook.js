import passport from "passport";
import passportFacebook from "passport-facebook";
import {transErrors, transSuccess} from "./../../../lang/vi";
import UserModel from "./../../models/userModel";

let FacebookStrategy = passportFacebook.Strategy;

let fbAppId = process.env.FB_APP_ID;
let fbAppSecret = process.env.FB_APP_SECRET;
let fbCallbackUrl = process.env.FB_CALLBACK_URL;

/**
 * Valid user account type: facebook
 */

let initPassportFacebook = () => {
  passport.use(new FacebookStrategy({
    clientID: fbAppId,
    clientSecret: fbAppSecret,
    callbackURL: fbCallbackUrl,
    passReqToCallback: true,
    profileFields: ["email", "gender", "displayName"]
  }, async (req, accessToken, refreshToken, profile, done) => {
    try {
        let user = await UserModel.findByFacebookUid(profile.uid);
        if(user){
          return done(null, user, req.flash("successes", transSuccess.loginSuccess(user.username))); 
        }
        
        //Create a new user if can't find 
        let newUserItem = {
          user: profile.displayName,
          gender: profile.gender,
          local: {isActive: true},
          facebook: {
            uid: profile.uid,
            token: accessToken,
            email: profile.emails[0].value
          }
        };

        let newUser = UserModel.createNew(newUserItem);
        return done(null, newUser, req.flash("successes", transSuccess.loginSuccess(newUser.username))); 

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

module.exports = initPassportFacebook;