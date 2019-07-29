import mongoose from "mongoose";

let Schema = mongoose.Schema;

let UserSchema = new Schema({
  user: String,
  gender: {type: String, default: "male"},
  phone: {type: Number, default: null},
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
  createAt: {type: Number, default: Date.now},
  updateAt: {type: Number, default: null},
  deleteAt: {type: Number, default: null}
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

  verify(token){
    return this.findOneAndUpdate({
        "local.verify": token
    }, {
        "local.verify": null,
        "local.isActive": true
    }).exec();
  }
}

module.exports = mongoose.model("user", UserSchema);