const express = require('express')
const createError = require('../../helpers/createError')

const contacts = require('../../models/contacts')
const Joi = require('joi');
const router = express.Router()

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts()
    res.json(result)
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    })
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw createError(404, 'Not found')
    }
    res.status(200).json(result);
  }
  catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw createError(400, 'missing required name field')
    }
    const result = await contacts.addContact(req.body)
    res.status(201).json(result)
  } catch (error) {
    next(error);

  }
})



router.put('/:id', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw createError(400, 'missing fields')
    }
    const { id } = req.params;
    const result = await contacts.updateContactById(id, req.body)
    if (!result) {
      throw createError(404, 'Not found')
    }

    res.status(200).json(result)
  } catch (error) {
    next(error);

  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id)
    if (!result) {
      throw createError(404, 'Not found')

    }
    res.status(200).json({
      message: "Contact delete"
    })
  }
  catch (error) {
    next(error);

  }
})

module.exports = router
