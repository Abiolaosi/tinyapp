const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
// add ejs: new line
app.set("view engine", "ejs");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const users = { 
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
 "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
}


// =============================
// The form should POST to /register.

const urlDatabase = {
  b2xVn2: "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com",
};

      // working on register___: route
// _________________________________

app.post("/register", (req, res) => {
  console.log(req.body); // Log the POST request body to the console
  res.send("Ok"); // Respond with 'Ok' (we will replace this)
});

app.get("/register", (req, res) => {
  res.render("register");
});

// -----------------------------------------------
// working on cookies
// console.log(req.body.username);
// res.send(req.body);

// route for login
app.post("/login", (req, res) => {
  res.cookie("username", req.body.username);
  res.redirect("/urls");
});

//route logout
app.post("/logout", (req, res) => {
  res.clearCookie("username");
  res.redirect("/urls");
});

// app.get("/login", (req, res) => {
//   res.cookie('username', req.cookies["username"]);
//   res.redirect("/urls");
//   });

// this added after installing body-parser
// const bodyParser = require("body-parser");

// making post request

app.post("/urls", (req, res) => {
  console.log(req.body); // Log the POST request body to the console
  res.send("Ok"); // Respond with 'Ok' (we will replace this)
});

// route: url shortening (part 2)
app.get("/u/:shortURL", (req, res) => {
  const longURL = req.params.shortURL;
  res.redirect(longURL);
});

// route for urls_new.ejs
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});
// // route for app.get("/urls/:id", ...)
// app.get("/urls/:id", ...)

app.get("/urls", (req, res) => {
  console.log(req.cookies);
  const templateVars = { urls: urlDatabase, username: req.cookies["username"]};
  res.render("urls_index", templateVars);
});

app.get("/hello", (req, res) => {
  const templateVars = { greeting: "Hello World!" };
  res.render("hello_world", templateVars);
});

// Add a new route in express_server.js which we'll use to render this new template

app.get("/urls/:shortURL", (req, res) => {
  let shortURL = req.params.shortURL;
  const templateVars = { shortURL: shortURL, longURL: urlDatabase[shortURL] };
  res.render("urls_show", templateVars);
});
//route for delete
app.post("/urls/:shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL;
  delete urlDatabase[shortURL];
  res.redirect("/urls");
});

// // route for submit
app.post("/urls/:shortURL/submit", (req, res) => {
  const shortURL = req.params.shortURL;
  const templateVars = { shortURL: shortURL, longURL: urlDatabase[shortURL] };
  console.log("text");
  res.redirect("/urls");
});

//route for input
app.post("/urls/:shortURL/input", (req, res) => {
  const shortURL = req.params.shortURL;
  const templateVars = { shortURL: shortURL, longURL: urlDatabase[shortURL] };
  res.redirect("/urls");
});

app.post("/urls/:shortURL", (req, res) => {
  let longURL = req.body.longURL;
  let shortURL = req.params.shortURL;
  urlDatabase[shortURL] = longURL;

  // console.log(req.body);
  // console.log(req.params);
  // let longURL = req.body.longURL

  // find the shorturl from database that matches the short url varaible
  // replace the longurl form the matching shorturl
  res.redirect("/urls");
});

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/", function (req, res) {
  res.send("hello world");
});

app.listen(3000);

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/set", (req, res) => {
  const a = 1;
  res.send(`a = ${a}`);
});

app.get("/fetch", (req, res) => {
  res.send(`a = ${a}`);
});

function generateRandomString() {}
