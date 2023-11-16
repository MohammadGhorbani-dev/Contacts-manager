import Spinner from "../Spinner";
import IMAGE from "../../assets/man-taking-note.png";
import { Link } from "react-router-dom";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export default function AddContact({
  spinnerLoading,
  setContactInfo,
  contact,
  groups,
  createContactForm,
}) {
  return (
    <>
      {spinnerLoading ? (
        <Spinner />
      ) : (
        <section className="">
          <h3 className="text-center mt-5 text-xl font-bold ">
            ساخت مخاطب جدید
          </h3>
          <div className="border-[1px] mx-9 my-5" />
          <div className="flex">
            <form
              onSubmit={createContactForm}
              className="flex flex-col gap-4 mx-9 max-lg:full w-96"
            >
              <TextField
                required
                value={contact.fullname}
                onChange={setContactInfo}
                name="fullname"
                type="text"
                label="نام و نام خانوادگی"
                variant="outlined"
              />
              <TextField
                required
                value={contact.photo}
                onChange={setContactInfo}
                name="photo"
                type="text"
                label="آدرس تصویر"
                variant="outlined"
              />
              <TextField
                required
                value={contact.mobile}
                onChange={setContactInfo}
                name="mobile"
                type="tel"
                label="شماره موبایل"
                variant="outlined"
              />
              <TextField
                required
                value={contact.email}
                onChange={setContactInfo}
                name="email"
                type="text"
                label="آدرس ایمیل"
                variant="outlined"
              />
              <TextField
                required
                value={contact.job}
                onChange={setContactInfo}
                name="job"
                type="text"
                label="شغل"
                variant="outlined"
              />
              <FormControl required>
                <InputLabel>انتخاب گروه</InputLabel>
                <Select
                  value={contact.group}
                  onChange={setContactInfo}
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
              </FormControl>
              <div className="m-auto">
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  className="mx-2 text-base font-bold rounded-lg text-green-700 hover:text-white"
                >
                  ساخت مخاطب
                </Button>
                <Link to={"/contacts"}>
                  <Button
                     variant="contained"
                     color="error"
                    className="mx-2  text-base font-bold rounded-lg text-red-700 hover:text-white"
                  >
                    انصراف
                  </Button>
                </Link>
              </div>
            </form>
            <img src={IMAGE} alt="IMAGE" className="w-3/6 h-fit  m-auto max-md:hidden" />
          </div>
        </section>
      )}
    </>
  );
}
