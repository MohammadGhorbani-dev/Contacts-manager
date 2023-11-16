import { useState, useEffect } from "react";
import {
  getAllContacts,
  getAllGroups,
  createContact,
} from "./services/contactService";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import {
  Navbar,
  Contact,
  Contacts,
  AddContact,
  EditContact,
  ViewContact,
} from "./components";

function App() {
  const [spinnerLoading, setSpinnerLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [getContacts, setContacts] = useState([]);
  const [getGroups, setGroups] = useState([]);
  const [getContact, setContact] = useState({
    fullname: "",
    photo: "",
    mobile: "",
    email: "",
    job: "",
    group: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSpinnerLoading(true);

        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();

        setContacts(contactsData);
        setGroups(groupsData);

        setSpinnerLoading(false);
      } catch (err) {
        console.log(err.message);
        setSpinnerLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSpinnerLoading(true);

        const { data: contactsData } = await getAllContacts();
        setContacts(contactsData);

        setSpinnerLoading(false);
      } catch (err) {
        console.log(err.message);
        setSpinnerLoading(false);
      }
    };
    fetchData();
  }, [update]);

  const createContactForm = async (event) => {
    event.preventDefault();
    console.log("object");
    try {
      const { status } = await createContact(getContact);
      if (status === 201) {
        setContact({
          fullname: "",
          photo: "",
          mobile: "",
          email: "",
          job: "",
          group: "",
        });
        setUpdate(!update);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const setContactInfo = (event) => {
    setContact({ ...getContact, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Navbar />
   <div className="pt-16">
   <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route
          path="/contacts"
          element={
            <Contacts contacts={getContacts} spinnerLoading={spinnerLoading} />
          }
        />
        <Route
          path="/contacts/add"
          element={
            <AddContact
              spinnerLoading={spinnerLoading}
              setContactInfo={setContactInfo}
              contact={getContact}
              groups={getGroups}
              createContactForm={createContactForm}
            />
          }
        />
        <Route path="/contacts/edit/:contactId" element={<EditContact />} />
        <Route path="/contacts/:contactId" element={<ViewContact />} />
        <Route path="/contacts/edit/:contactId" element={<Contact />} />
      </Routes>
   </div>
    </div>
  );
}

export default App;
