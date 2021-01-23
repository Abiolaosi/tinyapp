const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const uuid = require("uuid/v4");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");


app.set("view engine", "ejs"); // tells express to use ejs as templating
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(morgan('dev'));


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


const emailExists = (userDatabase, email) => {
  console.log("Database", userDatabase);
  if (getUserByEmail(email, userDatabase)) {
    return true
  } else {
    return false
  }
}

const passwordMatching = (userDatabase, email, password) => {
  if (userDatabase[email].password === password) {
    return true
  } else {
    return false
  }

}

const fetchUser = (userDatabase, email) => {
  if (userDatabase[email]) {
    return userDatabase[email]
  } else {
    return {}
  }
}

// =============================
// The form should POST to /register.

const urlDatabase = {
  b2xVn2: "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com",
};

//working on new login page
// route for login------------------
app.get("/login", (req, res) => {
  const user_id = req.cookies["user_id"];
  const templateVars = { urls: urlDatabase, user: users[user_id]};
 // shows a form to login
  res.render("login", templateVars);
});


app.post("/login", (req, res) => {
  res.cookie("username", req.body.username);
  res.redirect("/urls");
  if(passwordMatching(users, req.body.password, req.body.email ))
  {
    let user_obj = fetchUser(users,req.body.email)
    res.cookie("user_id",user_obj.id)
    console.log(user_obj.id)
    res.redirect("/urls");
  }
  else{
    console.log('Bad Password or Email');
    res.redirect("/login")
  }

});

//route logout
app.post("/logout", (req, res) => {
  res.clearCookie("username");
  res.redirect("/urls");
});




// working on register___: route
app.get("/register", (req, res) => {
  const templateVars = { user: null };
  res.render("register", templateVars);
});

// _________________________________

app.post("/register", (req, res) => {
  const userId = generateRandomString();
  const user = {
    id: userId,
    email: req.body.email,
    password: req.body.password,
  };
  const incomingEmail = req.body.email;
  const incomingPassword = req.body.password;
  if (!incomingEmail || !incomingPassword) {
    res.statusCode = 400;
    res.send("incorrect username or password");

    // check if email exit
}else if (emailExists(users, req.body.email)) {
    res.send("email already exit");
  } else {
    users[userId] = user;
    res.cookie("userId", userId);
    res.redirect("/urls");
    console.log(users[userId]); // Log the POST request body to the console
    
  }
});

app.get("/register", (req, res) => {
  const templateVars = {user: null};
  res.render("register", templateVars);
});

//  this added after installing body-parser
// const bodyParser = require("body-parser");

// -----------------------------------------------
// working on cookies
// console.log(req.body.username);
// res.send(req.body);

// route for login
// app.post("/login", (req, res) => {
//   res.cookie("username", req.body.username);
//   res.redirect("/urls");
// });



// app.get("/login", (req, res) => {
//   res.cookie('username', req.cookies["username"]);
//   res.redirect("/urls");
//   });

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

//route for post request to handle user registration error
//------------------------------------------

// route for urls_new.ejs
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});
// // route for app.get("/urls/:id", ...)
// app.get("/urls/:id", ...)

app.get("/urls", (req, res) => {
  console.log(req.cookies);
  const user = getUserById(req.cookies["userId"], users);
  const templateVars = { urls: urlDatabase, user: user };
  console.log("templateVars", templateVars);
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

// generates a random id
function generateRandomString() {
  const userId = uuid().substr(0, 8);
  return userId;
}

function getUserById(Id, users) {
  for (key in users) {
    if (users[key].id === Id) {   
      return users[key];
    }
  }
}

function getUserByEmail(email, users) {
  for (key in users) {
    if (users[key].email === email) {   
      return users[key];
    }
  }
}