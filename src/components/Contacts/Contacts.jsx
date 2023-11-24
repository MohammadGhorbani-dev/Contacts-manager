import myColors from "../../helpers/colors";
import Fab from "@mui/material/Fab";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Contact from "./Contact";
import NotFound from "../../assets/no-found.gif";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";

export default function Contacts() {
  const { loading, deleteContact, filteredContacts } =
    useContext(ContactContext);
  return (
    <>
      <section>
        <Link to={"/contacts/add"}>
          <Fab
            variant="extended"
            size="medium"
            className={`bg-[${myColors.COMMENT}] text-white text-base gap-1 fixed bottom-5 right-5 z-10`}
          >
            افزودن مخاطب جدید
            <AddCircleIcon />
          </Fab>
        </Link>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <section className="flex flex-wrap justify-center w-full h-full">
          {filteredContacts?.length !== 0 ? (
            filteredContacts?.map((c) => (
              <Contact
                deleteContact={() => deleteContact(c.id, c.fullname)}
                contact={c}
                key={c.id}
              />
            ))
          ) : (
            <div>
              <p
                className={` text-[${myColors.ORANGE}] text-center text-xl py-10 font-bold`}
              >
                مخاطب یافت نشد...
              </p>
              <img src={NotFound} className="w-96 m-auto" alt="یافت نشد" />
            </div>
          )}
        </section>
      )}
    </>
  );
}
