const homeRouter = require("./homeRouter");
const accountRouter = require("./accountRouter");
const api = require("./apiRouter");
const chatRouter = require("./chatRouter")
const supportRouter = require("./supportRouter");

function route(app) {
    app.use("/", homeRouter);
    app.use("/account", accountRouter);
    app.use("/api", api);
    app.use("/chat", chatRouter);
    app.use("/support", supportRouter);
}

module.exports = route;