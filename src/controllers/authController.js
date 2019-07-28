let getLoginRegister = (req, res) => {
  res.render("auth/master");
};

let getLogout = () => {
  res.render("auth/master")
}

module.exports = {
  getLoginRegister: getLoginRegister,
  getLoout: getLogout
};