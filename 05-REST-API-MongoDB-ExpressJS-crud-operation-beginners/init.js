const mongoose = require("mongoose");

const Chat = require("./models/chat.js"); // our custom model



////////////////////////////// Start - MongoDB Connection

main()
.then(() => console.log("MongoDB connection successfull"))
.catch((err) => console.log("MongoDB connection error"));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

////////////////////////////// End - MongoDB Connection





////////////////////////////// Start - insert first single data in MongoDB

let chat1 = new Chat({
  from: "Parth",
  to: "Om",
  msg: "This is first message",
  created_at: new Date(), //  random date generator
});

chat1
  .save()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

////////////////////////////// End - insert first data in MongoDB





////////////////////////////// Start - Creating Sample data

let allChats = [
  {
    from: "a",
    to: "b",
    msg: "This is message 1",
    created_at: new Date(),
  },
  {
    from: "c",
    to: "d",
    msg: "This is message 2",
    created_at: new Date(),
  },
  {
    from: "e",
    to: "f",
    msg: "This is message 3",
    created_at: new Date(),
  },
  {
    from: "g",
    to: "h",
    msg: "This is message 4",
    created_at: new Date(),
  },
  {
    from: "i",
    to: "j",
    msg: "This is message 5",
    created_at: new Date(),
  },
];

////////////////////////////// End - Creating Sample data





////////////////////////////// Start - insert many data in MongoDB

Chat.insertMany(allChats)
.then((res) => console.log(res))
.catch((err) => console.log(err));

////////////////////////////// End - insert many data in MongoDB
