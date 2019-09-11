import multer from "multer";
import {app} from "./../config/app";
import {transErrors, transSuccess} from "./../../lang/vi";
import uidv4 from "uuid/v4";
import {user} from "./../services"
import fs from "fs-extra";
import {validationResult} from "express-validator/check";
import UserModel from "./../models/userModel";

let storageAvatar = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, app.avatar_directory);  
  },
  filename: (req, file, callback) => {
    let math = app.avatar_type;
    if(math.indexOf(file.mimetype) === -1){
      return callback(transErrors.invalid_file,null);
    }

    let avatarName = `${Date.now()}-${uidv4()}-${file.originalname}`;

    callback(null, avatarName);
  }
});

let avatarUploadFile = multer({
  storage: storageAvatar,
  limits: {fileSize: app.avatar_limit_size},
}).single("avatar");

let updateAvatar = (req, res) => {
  avatarUploadFile(req, res, async(error) => {
    if (error) {
      if (error.message) {
        return res.status(500).send(transErrors.avatar_size);
      }
      return res.status(500).send(error);
    }
    //
    try {
      let updateUserItem = {
        avatar: req.file.filename
      };
      
      let userUpdate = await user.updateUser(req.user._id, updateUserItem);

      //Remove the old user avatar
      await fs.remove(`${app.avatar_directory}/${userUpdate.avatar}`);

      let result = {
        message: transSuccess.avatar_updated,
        imgSrc: `/images/users/${req.file.filename}`
      }
      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
      return res.status(500).send(transErrors.server_error);
    }
  });
}

let updateUserInfo = async (req, res) => {
  let errorArray = [];

  let validationErrors = validationResult(req);

  if(!validationErrors.isEmpty()){
    let errors = Object.values(validationErrors.mapped());
    errors.forEach(element => {
      errorArray.push(element.msg);
    });
    return res.status(500).send(errorArray);
  }

  try {
    let updateUserItem = req.body;
    
    await user.updateUser(req.user._id, updateUserItem); 

    let result = {
      message: transSuccess.userInfo_updated
    }
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(transErrors.server_error);
  }
}

let updatePassword = async(req, res) => {
  let errorArray = [];
  
  let validationErrors = validationResult(req);

  if(!validationErrors.isEmpty()){
    let errors = Object.values(validationErrors.mapped());
    errors.forEach(element => {
      errorArray.push(element.msg);
    });
    console.log(errorArray);
    return res.status(500).send(errorArray);
  }

  let currentUser = await UserModel.createNew(req.user);

  let passwordCorrect = await currentUser.comparePassword(req.body.currentPassword);

  if(!passwordCorrect){
    errorArray.push(transErrors.update_password_incorrect)
    console.log(errorArray);
    return res.status(500).send(errorArray);
  }

  try {
    let newUserPassword = req.body.newPass;
    await user.updatePassword(req.user._id, newUserPassword); 

    let result = {
      message: transSuccess.userPassword_changed
    }
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(transErrors.server_error);
  }
}

module.exports = {
  updateAvatar: updateAvatar,
  updateUserInfo: updateUserInfo,
  updatePassword: updatePassword
}