import mongoose from "mongoose";

let Schema = mongoose.Schema;

let MessageSchema = new Schema({
  senderId: String,
  receiverId: String,
  conversationType: String,
  messageType: String,
  sender: {
    id: String,
    username: String,
    avatar: String
  },
  receiver:{
    id: String,
    username: String,
    avatar: String
  }, 
  text: String,
  file: {data: Buffer, contentType: String, fileName: String},
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: null},
  deletedAt: {type: Number, default: null}
});

MessageSchema.statics = {
  /**
   * get message by senderId and receiverId with limit
   * @param {String} senderId current user's id
   * @param {String} receiverId 
   * @param {String} limit 
   */
  getMessages(senderId, receiverId, limit) {
    return this.find({
      $or: [
        {$and: [
          {senderId: senderId},
          {receiverId: receiverId}
        ]},
        {$and: [
          {senderId: receiverId},
          {receiverId: senderId}
        ]}
      ]
    }).sort({createdAt: 1}).limit(limit).exec();
  }
};

const CONVERSATION_TYPES = {
  GROUP: "group",
  PERSONAL: "personal"
}

const MESSAGE_TYPES = {
  TEXT: "text",
  FILE: "file",
  IMAGE: "image"
}

module.exports = {
  model: mongoose.model("message", MessageSchema),
  conversationTypes: CONVERSATION_TYPES,
  messageTypes: MESSAGE_TYPES
}