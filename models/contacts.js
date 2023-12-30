const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.resolve("models", "contacts.json");

const readFile = async () => {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
};

const writeFile = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
};

const listContacts = async () => {
  const contacts = await readFile();
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await readFile();
  const contact = contacts.find((contact) => contact.id === contactId);

  return contact ?? null;
};

const removeContact = async (contactId) => {
  const contacts = await readFile();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }
  const [deletedContact] = contacts.splice(index, 1);

  await writeFile(contacts);

  return deletedContact;
};

const addContact = async (body) => {
  const contacts = await readFile();
  const newContact = { ...body, id: crypto.randomUUID() };

  contacts.push(newContact);

  await writeFile(contacts);

  return newContact;
};

const updateContact = async (id, body) => {
  const contacts = await readFile();
  const index = contacts.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return undefined;
  }
  const newContact = { ...body, id };
  contacts[index] = newContact;

  await writeFile(contacts);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
