const express = require("express");
const path = require("path");
const port = 8000;

const db = require("./config/mongoose");
const Contact = require("./model/contact");
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
  Contact.find({}, function (err, contacts) {
    if (err) {
      console.log("Error in fetching contacts from db");
      return;
    }
    return res.render("home", {
      title: "MY Contacts-List",
      contact_list: contacts,
    });
  });
});
app.get("/practice", function (req, res) {
  return res.render("practice", { title: "Let us play with ejs" });
});
app.post("/create-contact", function (req, res) {
  // contactList.push({ name: req.body.name, phone: req.body.phone });
  // contactList.push(req.body);
  Contact.create(
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    function (err, newContact) {
      if (err) {
        console.log("Error in creating a contact!");
        return;
      }
      console.log("**********", newContact);
      return res.redirect("back");
    }
  );
  // return res.redirect("back");
});
app.get("/delete-contact/", function (req, res) {
  console.log(req.query);
  let id = req.query.id;
  Contact.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log("Error in deleting from database");
      return;
    }
  });
  return res.redirect("back");
});

app.listen(port, function (err) {
  if (err) {
    console.log("ERROR IN RUMMING:", err);
    return;
  }
  console.log("EXPRESS SERVER IS RUNNING ON PORT:", port);
});
