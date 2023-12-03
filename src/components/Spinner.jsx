import loading from "../assets/Spinner-1.3s-300px.gif";
export default function Spinner() {
  return (
    <>
      <img src={loading} className="w-96 m-auto" alt="loading" />
    </>
  );
}
