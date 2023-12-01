import React from "react";
import { Button } from "@mui/material";
import { deleteContact } from "../../services/contactService";
import { confirmAlert } from "react-confirm-alert";

const ConfirmDelete = (
  contactId,
  contactFullname,
  contacts,
  setContacts,
  setLoading
) => {
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
              removeContact(contactId, contacts, setContacts, setLoading);
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
const removeContact = async (contactId, contacts, setContacts, setLoading) => {
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

export default ConfirmDelete;
