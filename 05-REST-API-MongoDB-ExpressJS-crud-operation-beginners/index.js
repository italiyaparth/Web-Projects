const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");

const Chat = require("./models/chat.js");     // our custom model


app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded( { extended: true } ));

app.use(methodOverride("_method"));





////////////////////////////// Start - MongoDB Connection

main()
.then(() => console.log("MongoDB connection successful"))
.catch((err) => console.log("MongoDB connection error"));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

////////////////////////////// End - MongoDB Connection





////////////////////////////// Start - Server listening check

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});

////////////////////////////// End - Server listening check





////////////////////////////// Start - Index Route - Show all Chats

app.get("/chats", async (req, res) => {

  let chats = await Chat.find();

  res.render("index.ejs", { chats });

});

////////////////////////////// End - Index Route - Show all Chats





////////////////////////////// Start - New Route - Create new Chat

app.get("/chats/new", (req, res) => {

  res.render("new.ejs");
});

////////////////////////////// End - New Route - Create new Chat





////////////////////////////// Start - New Route - add new chat in DB

app.post("/chats", (req, res) => {

  let { from, to, msg } = req.body;

  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date()
  });

  newChat.save()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

  res.redirect("/chats");
});

////////////////////////////// End - New Route - add new chat in DB





////////////////////////////// Start - Edit Route - Edit Chat

app.get("/chats/:id/edit", async (req, res) => {

  let { id } = req.params;

  let chat = await Chat.findById(id);

  res.render("edit.ejs", { chat });
});

////////////////////////////// End - Edit Route - Edit Chat





////////////////////////////// Start - Edit Route - Update chat in DB

app.patch("/chats/:id", async (req, res) => {

  let { id } = req.params;
  let { msg: newMsg } = req.body;

  await Chat.findByIdAndUpdate(id, { msg: newMsg }, { runValidators: true, new: true });

  res.redirect("/chats");
});

////////////////////////////// End - Edit Route - Update chat in DB





////////////////////////////// Start - Destroy Route - Delete chat in DB

app.delete("/chats/:id", async (req, res) => {

  let { id } = req.params;

  await Chat.findByIdAndDelete(id);

  res.redirect("/chats");
});

////////////////////////////// End - Destroy Route - Delete chat in DB
