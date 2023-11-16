import myColors from "../../helpers/colors";
import Fab from "@mui/material/Fab";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Contact from "./Contact";
import NotFound from "../../assets/no-found.gif";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";

export default function Contacts({ contacts, spinnerLoading, confirmContact }) {
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
      {spinnerLoading ? (
        <Spinner />
      ) : (
        <section className="flex flex-wrap justify-center w-full h-full">
          {contacts.length > 0 ? (
            contacts.map((c) => (
              <Contact
                confirmContact={() => confirmContact(c.id, c.fullname)}
                contact={c}
                key={c.id}
              />
            ))
          ) : (
            <div>
              <p
                className={` text-[${myColors.ORANGE}] text-center text-lg py-5 font-bold`}
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
