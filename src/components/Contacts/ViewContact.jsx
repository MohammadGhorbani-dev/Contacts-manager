import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";

export default function ViewContact() {
  return (
    <>
      <h3 className="text-center mt-5 text-xl font-bold ">اطلاعات مخاطب</h3>
      <div className="border-[1px] mx-16 my-5" />
      <Card
        sx={{
          width: 320,
          maxWidth: "100%",
        }}
        className="overflow-hidden rounded-xl shadow-2xl w-11/12 p-11 m-auto"
      >
        <CardContent className="flex flex-row">
          <div>
            <img
              src={"contact.photo"}
              alt={"contact.fullname"}
              className="w-64 h-64 rounded-lg  border-[3px] border-[#282a36]"
            />
          </div>
          <div className="flex flex-col gap-5 justify-between py-1 px-10">
            <Typography>نام و نام خانوادگی : {"علیرضا حسینی"}</Typography>
            <Typography>شماره موبایل : {"0930531323"}</Typography>
            <Typography>ایمیل : {"alirezaH@gmail.com"}</Typography>
            <Typography>گروه : {"آشنا"}</Typography>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
