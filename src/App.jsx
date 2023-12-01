import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { ContactContext } from "./context/contactContext";
import { ToastContainer, toast } from "react-toastify";

import {
  getAllContacts,
  getAllGroups,
  createContact,
} from "./services/contactService";

import {
  Navbar,
  Contact,
  Contacts,
  AddContact,
  EditContact,
  ViewContact,
  ConfirmDelete,
} from "./components";

function App() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);

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
        toast.success("مخاطب با موفقیت ایجاد شد");
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
        contacts,
        setContacts,
        filteredContacts,
        groups,
        search,
        contactSearch: setSearch,
        deleteContact: (id, fullname, contacts, setContacts, setLoading) =>
          ConfirmDelete(id, fullname, contacts, setContacts, setLoading),
        createContact: createContactForm,
      }}
    >
      <ToastContainer rtl={true} theme="colored" pauseOnHover={false} />
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
