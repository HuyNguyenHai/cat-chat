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
    return this.find({
     $or: [
       {userId: id},
       {contactId: id}
     ]
    }).exec();
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

  removeRequestContactSent(userId, contactId) {
    return this.remove({
      $and: [
        {"userId": userId},
        {"contactId": contactId}
      ]
    }).exec();
  },

  removeRequestContactReceived(userId, contactId) {
    return this.remove({
      $and: [
        {"contactId": userId},
        {"userId": contactId}
      ]
    }).exec();
  },

  removeContact(userId, contactId) {
    return this.remove({
      $or: [
        {"contactId": userId, "userId": contactId},
        {"userId": contactId, "userId": userId}
      ]
    }).exec();
  },

  getContacts(uid, limit) {
    return this.find({
      $and: [
        {status: true},
        {$or: [
          {"userId": uid},
          {"contactId": uid}
        ]}
      ]
    }).limit(limit).exec();
  },

  getContactsSent(uid, limit) {
    return this.find({
      userId: uid,
      status: false
    }).limit(limit).exec();
  },

  getContactsReceived(uid, limit) {
    return this.find({
      contactId: uid,
      status: false
    }).limit(limit).exec();
  },

  acceptRequestContact(uid, contactId) {
    return this.findOneAndUpdate({
      userId: contactId,
      contactId: uid
    }, {
      status: true
    }).exec();
  }
};

module.exports = mongoose.model("contact", ContactSchema);