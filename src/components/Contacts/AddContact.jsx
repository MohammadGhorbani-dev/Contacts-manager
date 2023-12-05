import Spinner from "../Spinner";
import IMAGE from "../../assets/man-taking-note.png";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { contactSchema } from "../../validations/contactValidation";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";

export default function AddContact() {
  const { loading, groups, createContact } = useContext(ContactContext);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="">
          <h3 className="text-center mt-5 text-xl font-bold ">
            ساخت مخاطب جدید
          </h3>
          <div className="border-[1px] mx-9 my-5" />
          <div className="flex">
            <Formik
              initialValues={{
                fullname: "",
                photo: "",
                mobile: "",
                email: "",
                job: "",
                group: "",
              }}
              validationSchema={contactSchema}
              onSubmit={(values) => {
                createContact(values);
              }}
            >
              {(formik) => (
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col gap-4 mx-9 max-lg:full w-96"
                >
                  <TextField
                    id="fullname"
                    {...formik.getFieldProps("fullname")}
                    name="fullname"
                    type="text"
                    label="نام و نام خانوادگی"
                    variant="outlined"
                  />
                  {formik.touched.fullname && formik.errors.fullname ? (
                    <span className="text-red-500">
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
                  />
                  {formik.touched.photo && formik.errors.photo ? (
                    <span className="text-red-500">{formik.errors.photo}</span>
                  ) : null}
                  <TextField
                    id="mobile"
                    {...formik.getFieldProps("mobile")}
                    name="mobile"
                    type="tel"
                    label="شماره موبایل"
                    variant="outlined"
                  />
                  {formik.touched.mobile && formik.errors.mobile ? (
                    <span className="text-red-500">{formik.errors.mobile}</span>
                  ) : null}
                  <TextField
                    id="email"
                    {...formik.getFieldProps("email")}
                    name="email"
                    type="text"
                    label="آدرس ایمیل"
                    variant="outlined"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <span className="text-red-500">{formik.errors.email}</span>
                  ) : null}
                  <TextField
                    id="job"
                    {...formik.getFieldProps("job")}
                    name="job"
                    type="text"
                    label="شغل"
                    variant="outlined"
                  />
                  <FormControl>
                    <InputLabel>انتخاب گروه</InputLabel>
                    <Select
                      id="group"
                      {...formik.getFieldProps("group")}
                      label="انتخاب گروه"
                      name="group"
                    >
                      {groups.length > 0 &&
                        groups.map((group) => (
                          <MenuItem key={group.id} value={group.id}>
                            {group.name}
                          </MenuItem>
                        ))}
                    </Select>
                    {formik.touched.group && formik.errors.group ? (
                      <span className="text-red-500">
                        {formik.errors.group}
                      </span>
                    ) : null}
                  </FormControl>
                  <div className="m-auto mt-10">
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      size="large"
                      className="mx-2 text-base font-bold rounded-lg text-green-700 hover:text-white"
                    >
                      ساخت مخاطب
                    </Button>
                    <Link to={"/contacts"}>
                      <Button
                        variant="contained"
                        color="error"
                        size="large"
                        className="mx-2  text-base font-bold rounded-lg text-red-700 hover:text-white"
                      >
                        انصراف
                      </Button>
                    </Link>
                  </div>
                </form>
              )}
            </Formik>

            <img
              src={IMAGE}
              alt="IMAGE"
              className="w-3/6 h-fit  m-auto max-md:hidden"
            />
          </div>
        </section>
      )}
    </>
  );
}
