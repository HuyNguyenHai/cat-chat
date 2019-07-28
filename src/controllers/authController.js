let getLoginRegister = (req, res) => {
  res.render("auth/loginRegister");
};

let getLogout = () => {
  res.render("auth/loginRegister")
}

module.exports = {
  getLoginRegister: getLoginRegister,
  getLoout: getLogout
};