import mongoose from "mongoose";
import { message } from "../services";

let Schema = mongoose.Schema;

let ChatGroupSchema = new Schema({
  name: String,
  userAmount: {type: Number, min: 3, max: 30},
  messageAmount: {type: Number, default: 0},
  userId: String,
  members:[
    {userId: String}
  ],
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: Date.now},
  deletedAt: {type: Number, default: null}
});

ChatGroupSchema.statics = {
  getChatGroup(userId, limit) {
    return this.find({
      "members": {$elemMatch: {"userId": userId}}
    }).sort({"createdAt": -1}).limit(limit).exec();
  },

  getChatGroupById(id) {
    return this.findById(id).exec();
  },

  updateWhenHaveNewMessage(id, messageAmount) {
    return this.findByIdAndUpdate(id, {
      messageAmount: messageAmount,
      updatedAt: Date.now()
    }).exec();
  }
}

module.exports = mongoose.model("chat-group", ChatGroupSchema);