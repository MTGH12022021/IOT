// todo module dung de quan ly soucre code
const express = require("express");
const bodyParser = require("body-parser");
const expressHandlebarsSections = require("express-handlebars-sections");
const path = require("path");
const numeral = require("numeral");
const session = require("express-session");
const exphbs = require("express-handlebars");
require("dotenv");

// todo cau hinh router
const router = require("./routes/index");
// //todo cau hinh  config
const db = require("./configs/db");
const passport = require("./configs/passport");
// todo cau hinh server
let PORT = process.env.PORT;

//todo cau hinh hbs
const hbs = exphbs.create({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts",
});


const app = express();
//todo server use
expressHandlebarsSections(hbs);
app.set("views", path.join(__dirname, "views"));
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());


app.use(require('cookie-parser')());
app.use(session({
    secret: 'very secret keyboard cat',
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

//todo database
db.connectMongoose();

//todo cac luong thu thi
router(app);

//todo render error
app.use((req, res) => {
    res.render("errors/404");
});

//todo server listen
if (PORT == null || PORT == "") {
    PORT = 3000;
}
app.listen(PORT, function () {
    console.log("Server has started successfully");
});

