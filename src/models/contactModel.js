import mongoose from "mongoose";
import { contact } from "../services";

let Schema = mongoose.Schema;

let ContactSchema = new Schema({
  userId: String,
  contactId: String,
  status: {type: Boolean, Default: false},
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: null},
  deletedAt: {type: Number, default: null}
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
        {"contactId": userId, "userId": contactId, "status": true},
        {"userId": contactId, "userId": userId, "status": true}
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
    }).sort({updatedAt: -1}).limit(limit).exec();
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
      status: true,
      updatedAt: Date.now()
    }).exec();
  }
};

module.exports = mongoose.model("contact", ContactSchema);