const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");

const port = 8080;

let posts = [
    {
        id: uuidv4(),
        username: "parth",
        content: "I love coding"
    },
    {
        id: uuidv4(),
        username: "om",
        content: "I love coding2"
    },
    {
        id: uuidv4(),
        username: "hardik",
        content: "I love coding3"
    }
];

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    posts.push({id: uuidv4(), username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id );
    res.render("show.ejs", { post });
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id );
    res.render("edit.ejs",{ post });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;

    res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);

    res.redirect("/posts");
});