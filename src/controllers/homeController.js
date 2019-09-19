import {contact, notification, message} from "../services";

let getHome = async(req, res) => {
  let notifications = await notification.getNotifications(req.user._id);

  let contacts = await contact.getContacts(req.user._id);
  let contactsSent = await contact.getContactsSent(req.user._id);
  let contactsReceived = await contact.getContactsReceived(req.user._id);
  let allConversations = await message.getAllConversations(req.user._id);

  res.render("main/home/home", {
    errors: req.flash("errors"),
    successes: req.flash("successes"),
    user: req.user,
    notifications: notifications,
    contacts: contacts,
    contactsSent: contactsSent,
    contactsReceived: contactsReceived,
    userConversations: allConversations.userConversations,
    groupConversations: allConversations.groupConversations,
    allConversations: allConversations.allConversations
  });
};

module.exports = {
  getHome: getHome
}
