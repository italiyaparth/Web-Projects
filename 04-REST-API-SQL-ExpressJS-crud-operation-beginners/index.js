const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { ifError } = require("assert");

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

let data = [];
for (let index = 1; index <= 100; index++) {
  data.push(getRandomUser());
}

// add data in SQL database server
let q = "INSERT INTO user (id, username, email, password) VALUES ?";
try {
  connection.query(q, [data], (err, result) => {
    if (err) throw err;
    console.log(result);
  });

} catch (error) {
  console.log(error);
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
  
  } catch (error) {
    console.log(error);
  }

});

//SHOW Route
app.get("/user", (req, res) => {

  let q = `SELECT * FROM user`;
 
  try {
    connection.query(q, (err, users) => {
      if (err) throw err;

      let count = result[0]["count(*)"];
      res.render("users.ejs", { users });
    });
  
  } catch (error) {
    console.log(error);
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
      res.render("users.ejs", { user });
    });
  
  } catch (error) {
    console.log(error);
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
  
  } catch (error) {
    console.log(error);
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
  
  } catch (error) {
    console.log(error);
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
  
  } catch (error) {
    console.log(error);
  }

});