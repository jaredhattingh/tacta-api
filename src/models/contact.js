const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: false,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "Invalid Email address" });
      }
    }
  },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
  phone: {
    type: String,
    required: false,
    lowercase: true,
    validate: value => {
      const contraints = {
        format: {
          pattern: "/^d{10}$/",
          flags: "i",
          message: "Can only be a 10 digit number"
        }
      };
      if (!validator.validate(value, contraints)) {
        throw new Error({ error: "Invalid Phone Number" });
      }
    }
  }
});

contactSchema.pre("save", async function(next) {
  const contact = this;
  contact.updatedAt(Date.now());
  next();
});

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
