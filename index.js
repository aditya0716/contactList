const express = require("express");
const path = require("path");
const port = 8000;
const app = express();
app.use(express.urlencoded());
app.use(express.static("assets"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

var contactList = [
  {
    name: "Tony",
    phone: "5674390876",
  },
  {
    name: "Cap",
    phone: "1234567890",
  },
  {
    name: "Thor",
    phone: "8756465518",
  },
];

app.get("/", function (req, res) {
  return res.render("home", {
    title: "MY Contacts-List",
    contact_list: contactList,
  });
});
app.get("/practice", function (req, res) {
  return res.render("practice", { title: "Let us play with ejs" });
});
app.post("/create-contact", function (req, res) {
  // contactList.push({ name: req.body.name, phone: req.body.phone });
  contactList.push(req.body);
  return res.redirect("back");
});
app.get("/delete-contact/", function (req, res) {
  console.log(req.query);
  let phone = req.query.phone;
  let contactIndex = contactList.findIndex((contact) => contact.phone == phone);
  if (contactIndex != -1) {
    contactList.splice(contactIndex, 1);
  }
  return res.redirect("back");
});

app.listen(port, function (err) {
  if (err) {
    console.log("ERROR IN RUMMING:", err);
    return;
  }
  console.log("EXPRESS SERVER IS RUNNING ON PORT:", port);
});
