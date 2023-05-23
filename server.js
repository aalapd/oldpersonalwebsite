const compression = require('compression');
const express = require("express");
const app = express();
const tumblr = require("tumblr.js");
const client = tumblr.createClient({
    consumer_key: "nzMGJ6VwTCmMzuVrhokjtffC22jvPyRPNATwJhXafU10PEn3QI",
    consumer_secret: "gSKDqBig3M1KKDRSCEgTppg3VQA3vxM7MENo5x6fb9om1YY1zm",
    token: "DVAUIVEgJG8Vd3O35ymAhglZuYFnvQXCCrCWhJ7OuM2hdq5VDs",
    token_secret: "Vk3zIxnL9lpLKLNG2qVGo24RfDWsOosZou4hbrKWol67FcXd4Y",
});
const path = require("path");
const projectList = require("./modules/projects");
const getImages = require("./modules/getImages");
const favicon = require("serve-favicon");
const port = process.env.PORT || 8002;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/public/views/"));
app.use(express.static("public"));
app.use(
    favicon(path.join(__dirname, "public", "assets", "favicon", "favicon.ico"))
);
app.use(compression());

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
app.get(["/writings", "/writings/:id"], function (req, res) {
    client.blogPosts("aalapdavjekar", function (err, resp) {
        let { id } = req.params;
        let post;
        let posts = resp.posts;
        let postArr = [];
    
        if (id !== undefined) {
            for (i in posts) {
                if (posts[i].id === id) {
                    post = posts[i];
                    break;
                }
            }
        } else {
            for (i in posts) {
                let item = JSON.parse(JSON.stringify(posts[i]));
                postArr.push(item);
            }
        }
        res.render("pages/writings", { post, postArr });
    });
    
});
app.get("/contact", function (req, res) {
    res.render("pages/contact");
});
// 404 page redirecting to homepage
app.use(function (req, res, next) {
    res.status(404);
    res.render("pages/index");
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
