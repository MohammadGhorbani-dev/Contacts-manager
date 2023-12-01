import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchContact from "./Contacts/SearchContact";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  return (
    <AppBar className="bg-[#282a36] fixed z-20">
      <Toolbar className="text-white">
        <div className=" absolute flex items-center gap-x-2">
          <PermContactCalendarIcon />
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="max-md:hidden"
          >
            وب اپلیکیشن مدیریت <span className="text-[#bd93f9]">مخاطبین</span>
          </Typography>
        </div>
        {location.pathname === "/contacts" ? (
          <div className="m-auto relative w-1/4 max-md:w-2/3">
            <SearchContact />
          </div>
        ) : null}
      </Toolbar>
    </AppBar>
  );
}
