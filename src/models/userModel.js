import mongoose from "mongoose";
import bcrypt from "bcrypt";

let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: String,
  gender: {type: String, default: "male"},
  phone: {type: String, default: null},
  address: {type: String, default: null},
  avatar: {type: String, default: "avatar-default.jpg"},
  role: {type: String, default: "user"},
  local:{
    email: {type: String, trim: true},
    password: {type: String},
    isActive: {type: Boolean, default: false},
    verify: String
  },
  facebook: {
    uid: String,
    token: String,
    email: {type:String, trim: true}
  },
  google: {
    uid: String,
    token: String,
    email: {type:String, trim: true}
  },
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: null},
  deletedAt: {type: Number, default: null}
});

UserSchema.statics = {
  createNew(item){
    return this.create(item);
  },

  findByEmail(email){
    return this.findOne({"local.email": email}).exec();
  },

  removeById(id){
    return this.findByIdAndRemove(id).exec();
  },

  findByToken(token){
    return this.findOne({"local.verify": token}).exec();
  },

  findUserByIdToUpdatePassword(id){
    return this.findById(id).exec();
  },

  findUserByIdForSessionToUse(id){
    return this.findById(id, {"local.password": 0}).exec();
  },

  getNormalUserDataById(uid) {
    return this.findById(uid, {_id: 1, username: 1, address: 1, avatar: 1}).sort({createdAt: -1}).exec();
  },

  findByFacebookUid(uid){
    return this.findOne({"facebook.uid":uid}).exec();
  },

  updateUser(id, item){
    return this.findByIdAndUpdate(id, item).exec();
  },

  updatePassword(id, password){
    return this.findByIdAndUpdate(id, {"local.password": password}).exec();
  },

  verify(token){
    return this.findOneAndUpdate({
        "local.verify": token
    }, {
        "local.verify": null,
        "local.isActive": true
    }).exec();
  },
  
  findAllForAddContact(id, keyword) {
    return this.find({
      $and: [
          {"_id": {$nin: id}},
          {"local.isActive": true},
          {$or: [
              {"username": {"$regex": new RegExp(keyword, "i")}},
              // {"local.email": {"$regex": keyword}},
              // // {"facebook.email": {"$regex": keyword}},
              // // {"google.email": {"$regex": keyword}}
          ]}
      ]
    }, {_id: 1, username: 1, address: 1, avatar: 1}).exec();
  }
};

UserSchema.methods = {
  comparePassword(password){
    return bcrypt.compare(password, this.local.password);// return a promise
  }
}

module.exports = mongoose.model("user", UserSchema);