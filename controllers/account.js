const User = require("../models/User");
const passport = require("passport");

function getLogin(req, res) {
    if (req.user) {
        res.redirect("/");
    }
    res.render("account/login", {
        layout: false,
    });
}

function postLogin(req, res, next) {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log("ngu")
            return res.render('account/login.hbs', {
                layout: false,
                error: "Tài khoản hoặc mật khẩu không đúng"
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });
    })(req, res, next);
}

function getRegister(req, res) {
    res.render("account/register.hbs", {
        layout: false,
    });
}

function postRegister(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    console.log(email);

    User.register({ email: email, name: name }, password, function (err, user) {
        if (err) {
            console.log(err);
            res.render("account/register.hbs", {
                error: "Tài khoản đã được tạo",
                layout: false
            });
        }
        else {
            res.redirect("/account/login");
        }
    });
}

function getlogout(req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}

module.exports = {
    getLogin,
    postLogin,
    getRegister,
    postRegister,
    getlogout
}