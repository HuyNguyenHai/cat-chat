import {contact, notification} from "../services";

let getHome = async(req, res) => {
  let notifications = await notification.getNotifications(req.user._id);

  let contacts = await contact.getContacts(req.user._id);
  let contactsSent = await contact.getContactsSent(req.user._id);
  let contactsReceived = await contact.getContactsReceived(req.user._id);

  console.log("contacts:", contacts);
  console.log("contacts Sent:", contactsSent);
  console.log("contacts Received:", contactsReceived);
  console.log("-------------------------");
  
  res.render("main/home/home", {
    errors: req.flash("errors"),
    successes: req.flash("successes"),
    user: req.user,
    notifications: notifications,
    contacts: contacts,
    contactsSent: contactsSent,
    contactsReceived: contactsReceived
  });
};

module.exports = {
  getHome: getHome
}
