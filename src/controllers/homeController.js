import {contact, notification, message} from "../services";
import {bufferToBase64, convertTimestampToHumanTime} from "../helpers/clientsHelper";

let getHome = async(req, res) => {
  let notifications = await notification.getNotifications(req.user._id);

  let contacts = await contact.getContacts(req.user._id);
  let contactsSent = await contact.getContactsSent(req.user._id);
  let contactsReceived = await contact.getContactsReceived(req.user._id);
  let conversations = await message.getAllConversations(req.user._id);
  let allConversationsWithMessages = conversations.allConversationsWithMessages;
  
  res.render("main/home/home", {
    errors: req.flash("errors"),
    successes: req.flash("successes"),
    user: req.user,
    notifications: notifications,
    contacts: contacts,
    contactsSent: contactsSent,
    contactsReceived: contactsReceived,
    allConversationsWithMessages : allConversationsWithMessages,
    bufferToBase64: bufferToBase64,
    convertTimestampToHumanTime: convertTimestampToHumanTime
  });
};

module.exports = {
  getHome: getHome
}
