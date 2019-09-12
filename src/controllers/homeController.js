import {notification} from "../services";

let getHome = async(req, res) => {
  let notifications = await notification.getNotifications(req.user._id);
  
  res.render("main/home/home", {
    errors: req.flash("errors"),
    successes: req.flash("successes"),
    user: req.user,
    notifications: notifications
  });
};

module.exports = {
  getHome: getHome
}
