const { Schema, model } = require("mongoose")

const Joi = require('joi');

const { handleSaveErrors } = require("../helpers")

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    }
  }, { versionKey: false, timestatmps: true }
);
// required: true,
contactSchema.post("save", handleSaveErrors)


const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const contactFavoriteShema = Joi.object({
  favorite: Joi.boolean().required(),

})


const schemas = {
  contactsSchema,
  contactFavoriteShema
}

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };