import axios from "axios";

const SERVER_URL = "http://localhost:9000";

// @desc GET ALL Contacts
// @route GET http://localhost:9000/contacts
export const getAllContacts = () => {
  const url = `${SERVER_URL}/contacts`;
  return axios.get(url);
};

// @desc GET ALL groups
// @route GET http://localhost:9000/groups
export const getAllGroups = () => {
  const url = `${SERVER_URL}/groups`;
  return axios.get(url);
};

// @desc GET group with group ID
// @route GET http://localhost:9000/groups/:id
export const getGroup = (groupId) => {
  const url = `${SERVER_URL}/groups/${groupId}`;
  return axios.get(url);
};

// @desc GET Contact with Contact ID
// @route GET http://localhost:9000/contacts/:id
export const getContact = (contactId) => {
  const url = `${SERVER_URL}/contacts/${contactId}`;
  return axios.get(url);
};

// @desc POST contact
// @route POST http://localhost:9000/contacts
export const createContact = (contact) => {
  const url = `${SERVER_URL}/contacts`;
  return axios.post(url, contact);
};

// @desc PUT contact with contact ID
// @route PUT http://localhost:9000/contacts/:id
export const updateContact = (contact, contactId) => {
  const url = `${SERVER_URL}/contacts/${contactId}`;
  return axios.put(url, contact);
};

// @desc DELETE contact with contact ID
// @route DELETE http://localhost:9000/contacts/:id
export const deleteContact = (contactId) => {
  const url = `${SERVER_URL}/contacts/${contactId}`;
  return axios.delete(url);
};
