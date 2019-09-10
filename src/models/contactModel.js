import mongoose from "mongoose";
import { contact } from "../services";

let Schema = mongoose.Schema;

let ContactSchema = new Schema({
  userId: String,
  contactId: String,
  status: {type: Boolean, Default: false},
  createAt: {type: Number, default: Date.now},
  updateAt: {type: Number, default: null},
  deleteAt: {type: Number, default: null}
});

ContactSchema.statics = {
  createNew(item){
    return this.create(item);
  },

  findUsersContact(id) {
    return this.find({"userId": id}).exec();
  },

  //Check exist contact of 2 users
  checkExist(userId, contactId) {
    return this.findOne(
      {$or: [
        {$and: [
          {"userId": userId},
          {"contactId": contactId}
        ]},
        {$and: [
          {"userId": contactId},
          {"contactId": userId}
        ]}
      ]}
    ).exec();
  },

  removeRequestContact(userId, contactId) {
    return this.remove({
      $and: [
        {"userId": userId},
        {"contactId": contactId}
      ]
    }).exec();
  }
};

module.exports = mongoose.model("contact", ContactSchema);