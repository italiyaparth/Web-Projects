const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/views"));

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.listen("8080", () => {
  console.log("Server is listening on port 8080");
});

// create connection to SQL database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql@12345",
  database: "delta_app"
});


// create random fake data
let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// use only first time then comment out 
let data = [];
for (let index = 1; index <= 100; index++) {
  data.push(getRandomUser());
}

// add data in SQL database server, use only first time then comment out 
let q = "INSERT INTO user (id, username, email, password) VALUES ?";
try {
  connection.query(q, [data], (err, result) => {
    if (err) throw err;
    console.log(result);
  });

} catch (err) {
  console.log(err);
}


// HOME Route
app.get("/", (req, res) => {

  let q = `SELECT count(*) FROM user`;
 
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;

      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    });
  
  } catch (err) {
    console.log(err);
  }

});

//SHOW Route
app.get("/user", (req, res) => {

  let q = `SELECT * FROM user`;
 
  try {
    connection.query(q, (err, users) => {
      if (err) throw err;

      res.render("users.ejs", { users });
    });
  
  } catch (err) {
    console.log(err);
  }

});

//EDIT Route
app.get("/user/:id/edit", (req, res) => {

  let { id } = req.params;

  let q = `SELECT * FROM user WHERE id="${id}"`;
 
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;

      let user = result[0];
      res.render("edit.ejs", { user });
    });
  
  } catch (err) {
    console.log(err);
  }

});

//PATCH Route
app.patch("/user/:id", (req, res) => {

  let { id } = req.params;
  let { password: formPass, username: newUsername } = req.body;
  
  let q = `SELECT * FROM user WHERE id="${id}"`;
 
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;

      let user = result[0];

      if (formPass != user.password) {
        
        res.send("WRONG Password");

      } else {
        
        let q2 = `UPDATE user SET username="${newUsername}" WHERE id="${id}"`;

        connection.query(q2, (err, result) => {
          if(err) throw err;

          res.redirect("/user");
        });
      }

    });
  
  } catch (err) {
    console.log(err);
  }

});

//DELETE Route - DELETE Page
app.get("/user/:id/delete", (req, res) => {

  let { id } = req.params;

  let q = `SELECT * FROM user WHERE id="${id}"`;
 
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;

      let user = result[0];
      res.render("delete.ejs", { user });
    });
  
  } catch (err) {
    console.log(err);
  }

});

// DELETE Route
app.delete("/user/:id", (req, res) => {

  let { id } = req.params;
  let { password: formPass } = req.body;
  
  let q = `SELECT * FROM user WHERE id="${id}"`;
 
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;

      let user = result[0];

      if (formPass != user.password) {
        
        res.send("WRONG Password");

      } else {
        
        let q2 = `DELETE FROM user WHERE id="${id}"`;

        connection.query(q2, (err, result) => {
          if(err) throw err;

          res.redirect("/user");
        });
      }

    });
  
  } catch (err) {
    console.log(err);
  }

});

// add new record - new page
app.get("/user/new", (req, res) => {
  res.render("new.ejs");
});


// ADD NEW Route
app.post("/user", (req, res) => {
  let { username, email, password } = req.body;
  let id = uuidv4();

  //Query to Insert New User
  let q = `INSERT INTO user (id, username, email, password) VALUES ('${id}','${username}','${email}','${password}') `;

  try {
    connection.query(q, (err, result) => {

      if (err) throw err;

      res.redirect("/user");
    });
  } catch (err) {
    res.send("some error occurred");
  }
});