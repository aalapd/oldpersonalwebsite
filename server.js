const express = require("express");
const app = express();
const path = require("path");
const projectList = require("./modules/projects");
const getImages = require("./modules/getImages");
const favicon = require("serve-favicon");
const port = process.env.PORT || 9000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/public/views/"));
app.use(express.static("public"));
app.use(
    favicon(path.join(__dirname, "public", "assets", "favicon", "favicon.ico"))
);

app.get("/", function (req, res) {
    res.render("pages/index");
});
app.get("/projects", function (req, res) {
    let projects = projectList;
    res.render("pages/projects", { projects });
});
app.get("/projects/:folder", function (req, res) {
    let { folder } = req.params;
    let images = getImages.getImageFiles(folder);
    res.render("pages/gallery", { folder, images });
});
app.get(["/writings", "/writings/:post"], function (req, res) {
    let { post } = req.params;
    res.render("pages/writings", { post });
});
app.get("/contact", function (req, res) {
    res.render("pages/contact");
});

app.get("/robots.txt", function (req, res) {
    res.sendFile("robots.txt");
});
app.get("/sitemap.xml", function (req, res) {
    res.sendFile("sitemap.xml");
});
app.get("/dublin.rdf", function (req, res) {
    res.sendFile("dublin.rdf");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
