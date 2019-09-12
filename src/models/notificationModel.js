import mongoose from "mongoose";

let Schema = mongoose.Schema;

let NotificationSchema = new Schema({
  senderId: String,
  receiverId: String,
  type: String,
  isRead: {type: Boolean, default: false},
  createAt: {type: Number, default: Date.now}
});

NotificationSchema.statics = {
  createNew(item){
    return this.create(item);
  },

  removeRequestContactNotif(senderId, receiverId, type) {
    return this.find({
      senderId: senderId,
      receiverId: receiverId,
      type: type
    }).remove().exec();
  },

  /**
   * 
   * @param {String} userId 
   * @param {Number} limit 
   */
  getNotifsByUserIdAndLimit(userId, limit) {
    return this.find({receiverId: userId}).sort({createAT: -1}).limit(limit).exec();
  }
};

const NOTIFICATION_TYPE = {
  ADD_CONTACT: 'add_contact'
};

const NOTIFICATION_CONTENT = {
  getContent: ( notificationType, isRead, userId, userAvatar, username) => {
    if(notificationType === NOTIFICATION_TYPE.ADD_CONTACT){
      return `<span data-uid="${ userId }">
    <img class="avatar-small" src="images/users/${ userAvatar }" alt=""> 
    <strong>${username}</strong> đã gửi cho bạn một lời mời kết bạn!
    </span><br><br><br>`;
    }
  } 
}

module.exports = {
  model: mongoose.model("notification", NotificationSchema),
  types: NOTIFICATION_TYPE,
  contents: NOTIFICATION_CONTENT
}