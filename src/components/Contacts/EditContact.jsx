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
import { useContext, useEffect, useState } from "react";

import {
  getContact,
  getAllGroups,
  updateContact,
} from "../../services/contactService";
import { ContactContext } from "../../context/contactContext";

import { Formik } from "formik";
import { contactSchema } from "../../validations/contactValidation";
import { toast } from "react-toastify";

export default function EditContact() {
  const { contactId } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    // loading: false,
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
  const { loading, setLoading, setContacts, contacts } =
    useContext(ContactContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);
        const { data: groupsData } = await getAllGroups();
        setLoading(false);
        setState({
          ...state,
          contact: contactData,
          groups: groupsData,
        });
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const submitForm = async (values) => {
    try {
      setLoading(true);
      const { data, status } = await updateContact(values, contactId);
      if (data && status === 200) {
        toast.info("مخاطب با موفقیت ویرایش شد");

        setLoading(false);
        const allContacts = [...contacts];
        const contactIndex = allContacts.findIndex(
          (c) => c.id === parseInt(contactId)
        );
        allContacts[contactIndex] = { ...data };
        setContacts(allContacts);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const { contact, groups } = state;
  return (
    <>
      <h3 className="text-center mt-5 text-xl font-bold max-md:mt-2">
        ویرایش مخاطب
      </h3>
      <div className="border-[1px] mx-9 my-5 max-md:my-4" />
      {loading ? (
        <Spinner />
      ) : (
        <Formik
          initialValues={{
            fullname: contact.fullname,
            photo: contact.photo,
            mobile: contact.mobile,
            email: contact.email,
            job: contact.job,
            group: contact.group,
          }}
          validationSchema={contactSchema}
          onSubmit={(values) => {
            submitForm(values);
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <Card
                sx={{
                  width: 320,
                  maxWidth: "100%",
                }}
                className="overflow-hidden rounded-xl shadow-2xl w-11/12 p-11 m-auto"
              >
                <CardContent className="flex flex-row max-md:flex-col items-center">
                  <div className="-mt-2">
                    <img
                      src={contact.photo}
                      alt={contact.fullname}
                      className="w-52 h-52 rounded-lg  border-[2px] border-[#bd93f9] max-md:w-40 max-md:h-40  max-md:-mt-5 max-md:mb-5"
                    />
                  </div>
                  <div className="flex flex-col gap-5 justify-between py-1 px-10 w-1/2 max-md:w-full ">
                    <TextField
                      id="fullname"
                      {...formik.getFieldProps("fullname")}
                      name="fullname"
                      type="text"
                      label="نام و نام خانوادگی"
                      variant="outlined"
                      size="small"
                      color="secondary"
                    />
                    {formik.touched.fullname && formik.errors.fullname ? (
                      <span className="text-red-600">
                        {formik.errors.fullname}
                      </span>
                    ) : null}
                    <TextField
                      id="photo"
                      {...formik.getFieldProps("photo")}
                      name="photo"
                      type="text"
                      label="آدرس تصویر"
                      variant="outlined"
                      size="small"
                      color="secondary"
                    />
                    {formik.touched.photo && formik.errors.photo ? (
                      <span className="text-red-600">
                        {formik.errors.photo}
                      </span>
                    ) : null}
                    <TextField
                      id="mobile"
                      {...formik.getFieldProps("mobile")}
                      name="mobile"
                      type="tel"
                      label="شماره موبایل"
                      variant="outlined"
                      size="small"
                      color="secondary"
                    />
                    {formik.touched.mobile && formik.errors.mobile ? (
                      <span className="text-red-600">
                        {formik.errors.mobile}
                      </span>
                    ) : null}
                    <TextField
                      id="email"
                      {...formik.getFieldProps("email")}
                      name="email"
                      type="text"
                      label="آدرس ایمیل"
                      variant="outlined"
                      size="small"
                      color="secondary"
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <span className="text-red-600 ">
                        {formik.errors.email}
                      </span>
                    ) : null}
                    <TextField
                      id="job"
                      {...formik.getFieldProps("job")}
                      name="job"
                      type="text"
                      label="شغل"
                      variant="outlined"
                      size="small"
                      color="secondary"
                    />
                    <FormControl>
                      <InputLabel color="secondary">انتخاب گروه</InputLabel>
                      <Select
                        name="group"
                        id="group"
                        {...formik.getFieldProps("group")}
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
                      {formik.touched.group && formik.errors.group ? (
                        <span className="text-red-600">
                          {formik.errors.group}
                        </span>
                      ) : null}
                    </FormControl>
                  </div>
                </CardContent>
                <div className="flex justify-center mt-12 -mb-6 max-md:mt-6">
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    size="small"
                    className="  w-36 text-xl mx-4 max-md:mx-1  text-green-700  hover:text-white rounded-md"
                  >
                    ویرایش مخاطب
                  </Button>
                  <div>
                    <Link to={"/contacts"}>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        className="  w-24 text-xl mx-4 max-md:mx-2 text-red-700  hover:text-white rounded-md"
                      >
                        انصراف
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </form>
          )}
        </Formik>
      )}
    </>
  );
}
