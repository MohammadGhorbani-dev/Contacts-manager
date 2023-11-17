import SearchIcon from "@mui/icons-material/Search";
// import { COMMENT } from "../../helpers/colors";

export default function SearchContact({ setSearch }) {
  return (
    <>
      <SearchIcon className="w-8 text-gray-200 absolute top-2" />
      <input
        type="text"
        className={`w-full pl-10 py-2 pr-7 rounded-lg leading-5 bg-[#6272a4] text-white placeholder-gray-200 focus:outline-none focus:placeholder-white sm:text-sm`}
        placeholder="جستجوی مخاطب"
        onChange={(e) => setSearch(e.target.value)}
      />
    </>
  );
}
