const fs = require("fs/promises");

const path = require("path");
const crypto = require('crypto');

const updateContact = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}
const contactsPath = path.join(__dirname, "./contacts.json");

// TODO: задокументувати кожну функцію
const listContacts = async () => {
  const result = await fs.readFile(contactsPath)
  return JSON.parse(result)
}

const getContactById = async (id) => {
  const contacts = await listContacts()
  const result = await contacts.find(contact => contact.id === id)
  if (!result) {
    return null;
  }
  return result;
}
const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts()
  const newContact = {
    id: crypto.randomInt(999).toString(),
    name,
    email,
    phone,
  }
  contacts.push(newContact);
  updateContact(contacts);
  return newContact
}

const updateContactById = async (id, data) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === id);

  if (idx === -1) {
    return null;
  }
  contacts[idx] = {
    ...data, id
  }
  await updateContact(contacts)
  return contacts[idx];
}



const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === id);

  if (idx === -1) {
    return null;
  }

  const [result] = contacts.splice(idx, 1);
  updateContact(contacts);

  return result;
}



module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactById
}