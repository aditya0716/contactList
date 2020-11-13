const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});
const contacts = mongoose.model("contacts", contactSchema);
module.exports = contacts;
