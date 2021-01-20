const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
// add ejs: new line
app.set("view engine", "ejs");


const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

// this added after installing body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// making post request

app.post("/urls", (req, res) => {
  console.log(req.body);  // Log the POST request body to the console
  res.send("Ok");         // Respond with 'Ok' (we will replace this)
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
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/hello", (req, res) => {
  const templateVars = { greeting: 'Hello World!' };
  res.render("hello_world", templateVars);
});

// Add a new route in express_server.js which we'll use to render this new template

app.get("/urls/:shortURL", (req, res) => {
  let shortURL = req.params.shortURL;
  const templateVars = { shortURL: shortURL, longURL: urlDatabase[shortURL]  };
  res.render("urls_show", templateVars);
});

app.post("/urls/:shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL;
  delete urlDatabase[shortURL];
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

 function generateRandomString() {

}
