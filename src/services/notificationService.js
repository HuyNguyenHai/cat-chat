import Notification from "../models/notificationModel";
import User from "../models/userModel";
import { get } from "mongoose";

/**
 * 
 * @param {String} currentUserId 
 * @param {Number} limit 
 */
let getNotifications = (currentUserId, limit = 10) => {
    return new Promise(async(resolve, reject) => {
        try {
            let notifications = await Notification.model.getNotifsByUserIdAndLimit(currentUserId, limit);
            //resolve(notifications);
            let getNotifContents = notifications.map(async(notification) => {
                let sender = await User.findUserById(notification.senderId);
                return Notification.contents.getContent(notification.type, notification.isRead, sender._id, sender.avatar, sender.user)
            });
            let notificationContent = await Promise.all(getNotifContents);
            resolve(notificationContent);
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getNotifications: getNotifications
}