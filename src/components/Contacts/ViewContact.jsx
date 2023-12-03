import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { Button } from "@mui/material";

import Spinner from "../Spinner";
import { getContact, getGroup } from "../../services/contactService";

import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactContext } from "../../context/contactContext";

export default function ViewContact() {
  const { contactId } = useParams();

  const [state, setState] = useState({
    contact: {},
    group: {},
  });

  const { loading, setLoading } = useContext(ContactContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);
        const { data: groupData } = await getGroup(contactData.group);
        setLoading(false);
        setState({
          ...state,
          contact: contactData,
          group: groupData,
        });
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const { contact, group } = state;

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
                    <Typography>شغل : {contact.job}</Typography>
                    <Typography>گروه : {group.name}</Typography>
                  </div>
                </CardContent>
                <div className="flex justify-center">
                  <Link to={"/contacts"}>
                    <Button
                      variant="contained"
                      color="secondary"
                      className=" -mb-7 w-32 text-xl  text-purple-800  hover:text-white rounded-md"
                    >
                      بازگشت
                    </Button>
                  </Link>
                </div>
              </Card>
            </>
          )}
        </>
      )}
    </>
  );
}
