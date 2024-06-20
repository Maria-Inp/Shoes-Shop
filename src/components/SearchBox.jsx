/* eslint-disable react/prop-types */
//helpers
import { createQueryObject } from "../helpers/query";

//icon and style
import { IoSearchSharp } from "react-icons/io5";
import styles from "./SearchBox.module.css";

function SearchBox({ search, setSearch, setQuery }) {

  const searchHandler = () => {
    setQuery((query) => createQueryObject(query, { search: search }));
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="نام محصول مورد نظر خود را تایپ کنید..."
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase().trim())}
      />
      <button onClick={() => searchHandler()}>
        <IoSearchSharp />
      </button>
    </div>
  );
}

export default SearchBox;
