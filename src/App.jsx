import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

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
  const [spinnerLoading, setSpinnerLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [search, setSearch] = useState("");
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

  const confirm = (contactId, contactFullname) => {
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
      setSpinnerLoading(true);
      const response = await deleteContact(contactId);
      if (response) {
        setSpinnerLoading(false);
        setUpdate(!update);
      }
    } catch (err) {
      console.log(err.message);
      setSpinnerLoading(false);
    }
  };

  const filteredContacts = getContacts.filter(
    (contact) =>
      contact.fullname.toLowerCase().includes(search.toLowerCase()) ||
      contact.mobile.includes(search)
  );

  return (
    <>
      <Navbar setSearch={setSearch} />
      <div className="pt-16 pb-10">
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route
            path="/contacts"
            element={
              <Contacts
                filteredContacts={filteredContacts}
                spinnerLoading={spinnerLoading}
                confirmContact={confirm}
              />
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
          <Route
            path="/contacts/edit/:contactId"
            element={<EditContact update={update} setUpdate={setUpdate} />}
          />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
          <Route path="/contacts/edit/:contactId" element={<Contact />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
