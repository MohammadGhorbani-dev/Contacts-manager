import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { Link, useParams, useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import { useEffect, useState } from "react";

import {
  getContact,
  getAllGroups,
  updateContact,
} from "../../services/contactService";

export default function EditContact() {
  const { contactId } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    loading: false,
    contact: {
      fullname: "",
      photo: "",
      mobile: "",
      email: "",
      job: "",
      group: "",
    },
    groups: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        const { data: contactData } = await getContact(contactId);
        const { data: groupsData } = await getAllGroups();
        setState({
          ...state,
          loading: false,
          contact: contactData,
          groups: groupsData,
        });
      } catch (err) {
        console.log(err.message);
        setState({ ...state, loading: false });
      }
    };
    fetchData();
  }, []);

  const contactUpdate = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      setState({ ...state, loading: true });
      const { data } = await updateContact(state.contact, contactId);
      setState({ ...state, loading: false });
      if (data) {
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
      setState({ ...state, loading: false });
    }
  };

  const { loading, contact, groups } = state;
  return (
    <>
      <h3 className="text-center mt-5 text-xl font-bold ">ویرایش مخاطب</h3>
      <div className="border-[1px] mx-9 my-5" />
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={submitForm}>
          <Card
            sx={{
              width: 320,
              maxWidth: "100%",
            }}
            className="overflow-hidden rounded-xl shadow-2xl w-11/12 p-11 m-auto"
          >
            <CardContent className="flex flex-row max-md:flex-col items-center">
              <div>
                <img
                  src={contact.photo}
                  alt={contact.fullname}
                  className="w-64 h-64 rounded-lg  border-[2px] border-[#bd93f9] max-md:-mt-5 max-md:mb-5"
                />
              </div>
              <div className="flex flex-col gap-5 justify-between py-1 px-10 w-1/2 max-md:w-full ">
                <TextField
                  required
                  onChange={contactUpdate}
                  name="fullname"
                  value={contact.fullname}
                  color="secondary"
                  size="small"
                  type="text"
                  label="نام و نام خانوادگی"
                  variant="outlined"
                />
                <TextField
                  onChange={contactUpdate}
                  name="photo"
                  value={contact.photo}
                  color="secondary"
                  size="small"
                  type="text"
                  label="آدرس تصویر"
                  variant="outlined"
                />
                <TextField
                 
                  required
                  onChange={contactUpdate}
                  name="mobile"
                  value={contact.mobile}
                  color="secondary"
                  size="small"
                  type="tel"
                  label="شماره موبایل"
                  variant="outlined"
                />
                <TextField
                  required
                  onChange={contactUpdate}
                  name="email"
                  value={contact.email}
                  color="secondary"
                  size="small"
                  type="text"
                  label="آدرس ایمیل"
                  variant="outlined"
                />
                <TextField
                  required
                  onChange={contactUpdate}
                  name="job"
                  value={contact.job}
                  color="secondary"
                  size="small"
                  type="text"
                  label="شغل"
                  variant="outlined"
                />
                <FormControl required>
                  <InputLabel color="secondary">انتخاب گروه</InputLabel>
                  <Select
                    name="group"
                    onChange={contactUpdate}
                    value={contact.group}
                    color="secondary"
                    size="small"
                    label="انتخاب گروه"
                  >
                    {groups.length > 0 &&
                      groups.map((group) => (
                        <MenuItem key={group.id} value={group.id}>
                          {group.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
            </CardContent>
            <div className="flex  justify-center">
              <Button
                type="submit"
                variant="contained"
                color="success"
                className="mt-10 -mb-7 max-md:mt-4 w-36 text-xl mx-4 text-green-700  hover:text-white rounded-md"
              >
                ویرایش مخاطب
              </Button>
              <Link to={"/contacts"}>
                <Button
                  variant="contained"
                  color="error"
                  className="mt-10 -mb-7 max-md:mt-4 w-24 text-xl mx-4 text-red-700  hover:text-white rounded-md"
                >
                  انصراف
                </Button>
              </Link>
            </div>
          </Card>
        </form>
      )}
    </>
  );
}
