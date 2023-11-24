import { createContext } from "react";

export const ContactContext = createContext({
  loading: false,
  setLoading: () => {},
  contact: {},
  setContact: () => {},
  setContacts: () => {},
  contacts: [],
  filteredContacts: [],
  contactSearch: () => {},
  groups: [],
  onContactChange: () => {},
  deleteContact: () => {},
  updateContact: () => {},
  createContact: () => {},
});
