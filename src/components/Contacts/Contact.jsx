import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/joy/Avatar";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import CardActions from "@mui/joy/CardActions";
import Typography from "@mui/joy/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

export default function Contact({ contact, confirmContact }) {
  return (
    <Card
      sx={{
        width: 320,
        maxWidth: "100%",
      }}
      className="overflow-hidden m-4 rounded-2xl shadow-xl"
    >
      <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
        <Avatar
          src={contact.photo}
          alt={contact.fullname}
          sx={{ "--Avatar-size": "7rem" }}
        />
        <Typography level="title-lg">{contact.fullname}</Typography>
        <Typography level="body-sm" sx={{ maxWidth: "24ch" }}>
          {contact.mobile}
        </Typography>
        <Typography
          className="flex justify-center "
          level="body-sm"
          sx={{ maxWidth: "24ch" }}
        >
          {contact.email}
        </Typography>
      </CardContent>
      <CardOverflow sx={{ bgcolor: "background.level1" }}>
        <CardActions className="m-auto gap-9">
          <Link to={`/contacts/${contact.id}`} title="اطلاعات مخاطب">
            <IconButton>
              <VisibilityIcon color="primary" className="w-8 h-8" />
            </IconButton>
          </Link>
          <Link to={`/contacts/edit/${contact.id}`} title="ویرایش مخاطب">
            <IconButton color="warning">
              <EditIcon className="w-8 h-8" />
            </IconButton>
          </Link>
          <IconButton color="error" onClick={confirmContact}>
            <DeleteIcon className="w-8 h-8" />
          </IconButton>
        </CardActions>
      </CardOverflow>
    </Card>
  );
}
