let getHomePage = (req, res) => {
  res.render("main/home/home",{
    errors: req.flash("errors"),
    successes: req.flash("successes")
  });
};

module.exports = getHomePage;