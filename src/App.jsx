import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

import { ContactContext } from "./context/contactContext";

import {
  getAllContacts,
  getAllGroups,
  createContact,
  deleteContact,
} from "./services/contactService";
import {
  Navbar,
  Contact,
  Contacts,
  AddContact,
  EditContact,
  ViewContact,
} from "./components";

import { Button } from "@mui/material";

function App() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [contact, setContact] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();

        setContacts(contactsData);
        setGroups(groupsData);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const createContactForm = async (values) => {
    try {
      setLoading((prevLoading) => !prevLoading);
      const { status, data } = await createContact(values);
      if (status === 201) {
        const allContacts = [...contacts, data];
        setContacts(allContacts);
        setLoading((prevLoading) => !prevLoading);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
      console.log(err);
      setLoading((prevLoading) => !prevLoading);
    }
  };

  const onContactChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: "#282a36",
              border: "1px solid #bd93f9",
              borderRadius: "0.7rem",
              padding: "1rem",
              width: "24rem",
            }}
          >
            <h1
              style={{
                color: "white",
                lineHeight: "2rem",
                fontSize: " 1.5rem",
                paddingTop: "0.01rem",
                paddingBottom: "1rem",
              }}
            >
              پاک کردن مخاطب
            </h1>
            <p
              style={{
                color: "white",
                lineHeight: "2rem",
                paddingTop: "0.01rem",
                paddingBottom: "1rem",
              }}
            >
              مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
            </p>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              style={{ marginLeft: "0.75rem" }}
            >
              مطمئن هستم
            </Button>
            <Button
              style={{ marginRight: "0.75rem" }}
              variant="contained"
              color="error"
              onClick={onClose}
            >
              انصراف
            </Button>
          </div>
        );
      },
    });
  };

  const removeContact = async (contactId) => {
    try {
      setLoading(true);
      const { status } = await deleteContact(contactId);
      if (status === 200) {
        setLoading(false);
        const allContacts = contacts.filter((e) => e.id !== contactId);
        setContacts(allContacts);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const filteredContacts = contacts?.filter(
    (contact) =>
      contact.fullname?.toLowerCase().includes(search.toLowerCase()) ||
      contact.mobile?.includes(search)
  );

  return (
    <ContactContext.Provider
      value={{
        loading,
        setLoading,
        contact,
        setContact,
        contacts,
        setContacts,
        filteredContacts,
        groups,
        onContactChange,
        search,
        contactSearch: setSearch,
        deleteContact: confirmDelete,
        createContact: createContactForm,
      }}
    >
      <Navbar />
      <div className="pt-16 pb-10">
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/add" element={<AddContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
          <Route path="/contacts/edit/:contactId" element={<Contact />} />
        </Routes>
      </div>
    </ContactContext.Provider>
  );
}

export default App;
