import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { Button } from "@mui/material";

import Spinner from "../Spinner";
import { getContact, getGroup } from "../../services/contactService";

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewContact() {
  const { contactId } = useParams();

  const [state, setState] = useState({
    loading: false,
    contact: {},
    group: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        const { data: contactData } = await getContact(contactId);
        const { data: groupData } = await getGroup(contactData.group);
        setState({
          ...state,
          loading: false,
          contact: contactData,
          group: groupData,
        });
      } catch (err) {
        console.log(err.message);
        setState({ ...state, loading: false });
      }
    };

    fetchData();
  }, []);

  const { loading, contact, group } = state;

  return (
    <>
      {Object.keys(contact).length > 0 && (
        <>
          <h3 className="text-center mt-5 text-xl font-bold ">اطلاعات مخاطب</h3>
          <div className="border-[1px] mx-9 my-5" />
          {loading ? (
            <Spinner />
          ) : (
            <>
              <Card
                sx={{
                  width: 320,
                  maxWidth: "100%",
                }}
                className="overflow-hidden rounded-xl shadow-2xl w-11/12 p-11 m-auto"
              >
                <CardContent className="flex flex-row max-md:flex-col ">
                  <div>
                    <img
                      src={contact.photo}
                      alt={contact.fullname}
                      className="w-64 h-64 rounded-lg  border-[2px] border-[#bd93f9] "
                    />
                  </div>
                  <div className="flex flex-col gap-y-4 justify-between py-1 ">
                    <Typography>
                      نام و نام خانوادگی : {contact.fullname}
                    </Typography>
                    <Typography>شماره موبایل : {contact.mobile}</Typography>
                    <Typography>ایمیل : {contact.email}</Typography>
                    <Typography>گروه : {group.name}</Typography>
                  </div>
                </CardContent>
                <Link to={"/contacts"} className="flex justify-center">
                  <Button
                    variant="contained"
                    color="secondary"
                    className="mt-10 -mb-7 w-24 text-xl  text-purple-800  hover:text-white rounded-md"
                  >
                    بازگشت
                  </Button>
                </Link>
              </Card>
            </>
          )}
        </>
      )}
    </>
  );
}
