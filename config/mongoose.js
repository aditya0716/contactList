const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://admin:flatno203@contactlist-cluster.h3pcy.mongodb.net/contact-db?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("Successfully connected to the database");
});
